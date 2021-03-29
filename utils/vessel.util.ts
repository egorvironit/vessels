import { LngLat, LngLatBounds } from 'mapbox-gl';

import { Dictionary } from '@core/models';
import {
    LoadDynamicDataResponse,
    LoadStaticDataResponse,
    TrackViewInfo,
    Vessel,
    VesselDynamicData,
    VesselTrackPoint
} from '@vessels/models';
import { VesselViewStatuses } from '@vessels/constants';
import { Position } from '@vessels/models/position.model';
import { CoreUtil } from '@core/util';

export class VesselUtil {

    static mergeVesselData(staticData: LoadStaticDataResponse, dynamicData: LoadDynamicDataResponse): Vessel[] {
        const dictionary: Dictionary<Vessel> = {};

        staticData.targets
            .forEach(item => {
                dictionary[item.targetId] = {
                    ...dictionary[item.targetId],
                    targetId: item.targetId,
                    static: item
                };
            });

        dynamicData.targets
            .forEach(item => {
                dictionary[item.targetId] = {
                    ...dictionary[item.targetId],
                    targetId: item.targetId,
                    dynamic: {
                        ...item,
                        timestamp: dynamicData.timestamp
                    }
                };
            });

        return Object.values(dictionary);
    }

    static getVesselStatus(
        prevPackageTimestamp: number,
        outdatedPeriodInMin: number,
        vessel: Vessel,
        vesselWithActiveAlarms: Dictionary<string[]>
    ): VesselViewStatuses {
        if (!vessel.dynamic || (prevPackageTimestamp - vessel.dynamic.timestamp > outdatedPeriodInMin * 60)) {
            return VesselViewStatuses.removed;
        }

        if (vesselWithActiveAlarms[vessel.targetId]) {
            return VesselViewStatuses.alarmed;
        }

        if (prevPackageTimestamp - vessel.dynamic.timestamp >= 60) {
            return VesselViewStatuses.outdated;
        }

        return VesselViewStatuses.normal;
    }

    static getVesselName(vessel: Vessel): string {
        return vessel.static ? vessel.static.name : String(vessel.targetId);
    }

    static getVesselBounds(positions: Position[]): LngLatBounds {
        if (!positions || !positions.length) {
            return null;
        }
        return positions.reduce((bounds, pos) => bounds.extend(new LngLat(pos.lon, pos.lat)), new LngLatBounds());
    }

    static isVesselVisible(vessel: Vessel): boolean {
        return vessel && vessel.status !== VesselViewStatuses.removed;
    }

    static isHeadingAvailable(vesselDynamicData: VesselDynamicData): boolean {
        return CoreUtil.isNil(vesselDynamicData.heading) && vesselDynamicData.sog < 1;
    }

    static isVesselAis(trackingStatus: string): boolean {
        return trackingStatus.toLowerCase().includes('ais');
    }

    static getVesselRotation(vesselDynamicData: VesselDynamicData): number {
        if (VesselUtil.isVesselAis(vesselDynamicData.trackingStatus)) {
            return this.getHeading(vesselDynamicData) || 0;
        }

        return 0;
    }

    static getMarkerRotation(trackPoint: VesselTrackPoint): number {
        if (!CoreUtil.isNil(trackPoint.heading)) {
            return trackPoint.heading >= 1 ? trackPoint.heading : 0;
        }

        return trackPoint.cog;
    }

    static getHeading(data: VesselDynamicData): number {
        if (!CoreUtil.isNil(data.heading)) {
            return data.heading;
        }

        if (data.sog > 1) {
            return data.cog;
        }

        return null;
    }

    static comparator(value1: any, value2: any, v1: Vessel, v2: Vessel): number {
        if (value1 === value2) {
            if (v1.targetId < v2.targetId) {
                return -1;
            }

            if (v1.targetId > v2.targetId) {
                return 1;
            }
        }

        if (value1 === '' || value1 === null) {
            return 1;
        }

        if (value2 === '' || value2 === null) {
            return -1;
        }

        return value1 < value2 ? -1 : 1;
    }

    static nameComparator(value1: any, value2: any, v1: Vessel, v2: Vessel): number {
        const name1 = v1.static && v1.static.name ? v1.static.name : String(v1.targetId);
        const name2 = v2.static && v2.static.name ? v2.static.name : String(v2.targetId);

        if (name1 < name2) {
            return -1;
        }

        if (name1 > name2) {
            return 1;
        }

        return 0;
    }

    static isTrackPointVisible(vessel: Vessel, trackPosition: VesselTrackPoint, vesselTrackViewInfo: TrackViewInfo, isVesselSelected: boolean): boolean {
        const period = vesselTrackViewInfo && !isVesselSelected ? vesselTrackViewInfo.period : 60;
        return vessel.dynamic.timestamp >= trackPosition.timestamp && trackPosition.timestamp >= (vessel.dynamic.timestamp - (period * 60));
    }
}
