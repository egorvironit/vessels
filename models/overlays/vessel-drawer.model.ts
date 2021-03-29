import { Map } from 'mapbox-gl';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

import { Vessel } from '../vessel.model';
import { LayerIds } from '@map/constants';
import { GeoJsonFeature, GeoJsonFeatureCollection } from '@map/models';
import { VesselViewStatuses } from '@vessels/constants';
import { VesselUtil } from '@vessels/utils';
import { Themes } from '@settings/constants';
import { CoreUtil } from '@core/util';
import { VesselDynamicData } from '@vessels/models/vessel-dynamic-data.model';

export class VesselDrawer {

    vesselSource: any;
    selectionSource: any;

    constructor(
        private map: Map,
        private translate: TranslateService
    ) { }

    draw(vessels: Vessel[], selectedVessel: Vessel, theme: Themes) {
        if (!vessels.length) {
            this.clear();
            return;
        }

        this.vesselSource = this.map.getSource(LayerIds.vessel);
        this.selectionSource = this.map.getSource(LayerIds.selection);

        this.vesselSource.setData(this.getVesselFeatrueCollection(vessels, theme));
        this.selectionSource.setData(this.getSelectionFeatrueCollection(selectedVessel));
    }

    private clear() {
        if (this.vesselSource) {
            this.vesselSource.setData(this.getVesselFeatrueCollection([]));
        }
        if (this.selectionSource) {
            this.selectionSource.setData(this.getSelectionFeatrueCollection(null));
        }
    }

    private getVesselFeatrueCollection(vessels: Vessel[], theme?: Themes): GeoJsonFeatureCollection {
        return new GeoJsonFeatureCollection(
            vessels
                .filter(vessel => vessel.dynamic && vessel.dynamic.position)
                .map(vessel => {
                    return new GeoJsonFeature({
                        type: 'Point',
                        coordinates: [vessel.dynamic.position.lon, vessel.dynamic.position.lat]
                    }, {
                        vesselId: vessel.targetId,
                        rotate: VesselUtil.getVesselRotation(vessel.dynamic),
                        coordinates: [vessel.dynamic.position.lon, vessel.dynamic.position.lat],
                        'icon-image': this.getVesselIcon(vessel, theme),
                        'text-field': this.getLabel(vessel),
                        'text-anchor': this.getLabelAnchors(vessel),
                        'text-color': this.getColor(vessel, theme)
                    });
                })
        );
    }

    private getSelectionFeatrueCollection(vessel: Vessel): GeoJsonFeatureCollection {
        return new GeoJsonFeatureCollection([
            new GeoJsonFeature({
                type: 'Point',
                coordinates: vessel && vessel.dynamic && vessel.dynamic.position
                    ? [vessel.dynamic.position.lon, vessel.dynamic.position.lat]
                    : []
            })
        ]);
    }

    private getVesselIcon(vessel: Vessel, theme: Themes): string {
        const iconType = this.getIconType(vessel, theme);

        switch (vessel.status) {
            case VesselViewStatuses.alarmed: {
                return 'vesselWithAlarm' + iconType;
            }
            case VesselViewStatuses.outdated: {
                return 'vesselInactive' + iconType;
            }
            default: {
                return 'vessel' + iconType;
            }
        }
    }

    private getIconType(vessel: Vessel, theme: Themes) {
        const themeState = theme === Themes.day ? 'Day' : 'Night';
        const isAis = VesselUtil.isVesselAis(vessel.dynamic.trackingStatus);

        if (isAis && VesselUtil.isHeadingAvailable(vessel.dynamic)) {
            return 'NoHeading' + themeState;
        } else if (!isAis) {
            return 'NotAis' + themeState;
        } else {
            return themeState;
        }
    }

    private getLabel(vessel: Vessel): string {
        let name = VesselUtil.getVesselName(vessel);
        if (vessel.status === VesselViewStatuses.outdated) {
            name += `\n${this.translate.instant('COMMON.LAST_UPDATE')} ${moment.utc(vessel.dynamic.timestamp * 1000).format('HH:mm:ss UTC')}`;
        }
        return name;
    }

    private getLabelAnchors(vessel: Vessel): string {
        const deg = vessel.dynamic.heading % 360;

        if (deg >= 45 && deg < 135) {
            return 'right';
        }

        if (deg >= 135 && deg < 225) {
            return 'bottom';
        }

        if (deg >= 225 && deg < 315) {
            return 'left';
        }

        return 'top';
    }

    private getColor(vessel: Vessel, theme: Themes): string {
        switch (vessel.status) {
            case VesselViewStatuses.alarmed: {
                return 'rgba(239, 60, 151, 1)';
            }
            case VesselViewStatuses.outdated: {
                return theme === Themes.day ? 'rgba(153, 153, 153, 1)' : 'rgba(81, 81, 81, 1)';
            }
            default: {
                return theme === Themes.day ? 'black' : 'white';
            }
        }
    }

}
