import { Map } from 'mapbox-gl';

import { VesselTrack } from '../vessel-track.model';
import { LayerIds } from '@map/constants';
import { GeoJsonFeature, GeoJsonFeatureCollection } from '@map/models';
import { Dictionary } from '@core/models';
import { TrackViewInfo, Vessel } from '@vessels/models';
import { VesselUtil } from '@vessels/utils';

export class VesselTrackDrawer {
    vesselTrackSource: any;

    constructor(private mapboxMap: Map) {
    }

    draw(selectedTrack: VesselTrack, tracks: VesselTrack[], vesselTrackViewInfo: Dictionary<TrackViewInfo>, vessels: Dictionary<Vessel>) {
        this.vesselTrackSource = this.mapboxMap.getSource(LayerIds.vesselTrack);
        this.vesselTrackSource.setData(
            this.getVesselFeatrueCollection(selectedTrack, tracks, vesselTrackViewInfo, vessels)
        );
    }

    private getVesselFeatrueCollection(
        selectedTrack: VesselTrack,
        tracks: VesselTrack[],
        vesselTrackViewInfo: Dictionary<TrackViewInfo>,
        vessels: Dictionary<Vessel>
    ): GeoJsonFeatureCollection {
        const tempTracks = selectedTrack ? [...tracks, selectedTrack] : [...tracks];

        return new GeoJsonFeatureCollection(
            tempTracks
                .map((track: VesselTrack) => {
                    const vessel = vessels[track.vesselId];
                    const positions = track.vesselTrackPoints
                        .filter(trackPosition => VesselUtil.isTrackPointVisible(vessel, trackPosition, vesselTrackViewInfo[track.vesselId], !!selectedTrack))
                        .map(trackPosition => [trackPosition.position.lon, trackPosition.position.lat]);

                    positions.push([vessel.dynamic.position.lon, vessel.dynamic.position.lat]);
                    return new GeoJsonFeature({
                        type: 'LineString',
                        coordinates: positions
                    }, {
                        'line-color': selectedTrack && track.vesselId === selectedTrack.vesselId ? '#89bee5' : '#c5cad0'
                    });
                })
        );
    }

}
