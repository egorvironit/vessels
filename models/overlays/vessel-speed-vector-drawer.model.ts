import { Map } from 'mapbox-gl';
import { point } from '@turf/helpers';
import { destination } from '@turf/turf';

import { unitConstants } from '@core/constants';
import { CoreUtil } from '@core/util';
import { GeoJsonFeatureCollection, GeoJsonFeature } from '@map/models';
import { LayerIds } from '@map/constants';
import { Vessel } from '../vessel.model';
import { VesselViewStatuses } from '@vessels/constants';
import { Themes } from '@settings/constants';

export class VesselSpeedVectorDrawer {

    private vesselSpeedSource: any;

    constructor(private map: Map) { }

    draw(vessels: Vessel[], theme: Themes) {
        if (!vessels.length) {
            this.clear();
            return;
        }

        this.vesselSpeedSource = this.map.getSource(LayerIds.speedVector);
        this.vesselSpeedSource.setData(this.getFeatureCollection(vessels, theme));
    }

    private clear() {
        if (this.vesselSpeedSource) {
            this.vesselSpeedSource.setData(this.getFeatureCollection([]));
        }
    }

    private getFeatureCollection(vessels: Vessel[], theme?: Themes) {
        return new GeoJsonFeatureCollection(
            vessels
                .filter(vessel => this.isSpeedVectorValid(vessel))
                .map(vessel => {
                    return new GeoJsonFeature({
                        type: 'LineString',
                        coordinates: this.getCoords(vessel)
                    }, {
                        'line-color': this.getColor(vessel, theme)
                    });
                })
        );
    }

    private getCoords(vessel: Vessel): number[][] {
        const pos = vessel.dynamic.position;
        const startPoint = point([pos.lon, pos.lat]);
        const distance = vessel.dynamic.sog * (1 / unitConstants.KnInMs) * 300;
        const endPoint = destination(
            startPoint,
            distance,
            vessel.dynamic.cog,
            { units: 'meters' }
        );

        return [
            [pos.lon, pos.lat],
            endPoint.geometry.coordinates
        ];
    }

    private getColor(vessel: Vessel, theme: Themes): string {
        return theme === Themes.day ? 'rgba(59, 59, 59, 1)' : 'rgba(198, 198, 198, 1)';
    }

    private isSpeedVectorValid(vessel: Vessel): boolean {
        return vessel.dynamic
            && !CoreUtil.isNil(vessel.dynamic.sog)
            && !CoreUtil.isNil(vessel.dynamic.cog);
    }

}
