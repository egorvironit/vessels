import { Map } from 'mapbox-gl';

import { VesselTrack } from '../vessel-track.model';
import { LayerIds } from '@map/constants';
import { GeoJsonFeature, GeoJsonFeatureCollection } from '@map/models';
import { Dictionary } from '@core/models';
import { TrackViewInfo, Vessel } from '@vessels/models';
import { VesselUtil } from '@vessels/utils';

export class VesselTrackMarkersDrawer {
    vesselIconsSource: any;

    constructor(private mapboxMap: Map) {
    }

    draw(selectedTrack: VesselTrack, tracks: VesselTrack[], vesselTrackViewInfo: Dictionary<TrackViewInfo>, vessels: Dictionary<Vessel>) {
        const tempTracks = selectedTrack ? [selectedTrack, ...tracks] : [...tracks];

        this.vesselIconsSource = this.mapboxMap.getSource(LayerIds.vesselTrackIcons);
        const defaultIconsFeatureCollection = this.convertTracksToFeatureCollection(selectedTrack, tempTracks, vesselTrackViewInfo, vessels);
        this.vesselIconsSource.setData(defaultIconsFeatureCollection);
    }

    private convertTracksToFeatureCollection(
        selectedTrack: VesselTrack,
        tracks: VesselTrack[],
        vesselTrackViewInfo: Dictionary<TrackViewInfo>,
        vessels: Dictionary<Vessel>
    ): GeoJsonFeatureCollection {
        const flatFeatures = tracks.map(track => {
            return track.vesselTrackPoints
                .filter(trackPosition =>
                    VesselUtil.isTrackPointVisible(vessels[track.vesselId], trackPosition, vesselTrackViewInfo[track.vesselId], !!selectedTrack))
                .map(pos => {
                    return new GeoJsonFeature({
                        type: 'Point',
                        coordinates: [pos.position.lon, pos.position.lat]
                    }, {
                        rotate: VesselUtil.getMarkerRotation(pos),
                        coordinates: [pos.position.lon, pos.position.lat],
                        'icon-image': selectedTrack && track.vesselId === selectedTrack.vesselId ? 'vesselSelectedTrackMarker' : 'vesselTrackMarker'
                    });
                });
        });
        return new GeoJsonFeatureCollection([].concat.apply([], flatFeatures));
    }

}
