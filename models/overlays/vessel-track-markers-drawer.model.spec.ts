import { VesselTrack } from '@vessels/models';
import { LayerIds } from '@map/constants';
import { VesselTrackMarkersDrawer } from '@vessels/models/overlays/vessel-track-markers-drawer.model';
import { generateVessel } from '@testing/factories/vessels/vessel.factory';
import { VesselUtil } from '@vessels/utils';

describe('Vessel Track Drawer Model', () => {
    const source = {
        setData: () => {
        }
    };

    const map = {
        getSource: () => source
    };

    const track: VesselTrack = {
        vesselId: 1,
        vesselTrackPoints: []
    };


    const trackMarkerDrawer = new VesselTrackMarkersDrawer(<any>map);

    beforeEach(() => {
        spyOn(map, 'getSource').and.callThrough();
        spyOn<any>(trackMarkerDrawer, 'convertTracksToFeatureCollection').and.callThrough();
        spyOn(source, 'setData');
    });

    it('should display track markers', () => {
        track.vesselTrackPoints[0] = { cog: 0, sog: 0, heading: 0, position: { lat: 0, lon: 0 }, timestamp: 0 };
        trackMarkerDrawer.draw(track, [], { 1: null }, { 1: generateVessel(1) });
        const featureCollection = trackMarkerDrawer['convertTracksToFeatureCollection'](track, [track], {}, { 1: generateVessel(1) });
        expect(map.getSource).toHaveBeenCalledWith(LayerIds.vesselTrackIcons);
        expect(trackMarkerDrawer.vesselIconsSource.setData).toHaveBeenCalledWith(featureCollection);
    });

    it('should return GeoJsonFeatureCollection', () => {
        const positions = [{ cog: 0, sog: 0, heading: 0, position: { lat: 0, lon: 0 }, timestamp: 0 }];
        const isTrackPointVisibleSpy = spyOn(VesselUtil, 'isTrackPointVisible').and.returnValue(true);
        let convertedFeatureCollection = trackMarkerDrawer['convertTracksToFeatureCollection'](track, [track], {}, { 1: generateVessel(1) });
        console.log(JSON.stringify(convertedFeatureCollection))
        expect(VesselUtil.isTrackPointVisible).toHaveBeenCalled();
        expect(convertedFeatureCollection).toEqual(
            {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {
                        rotate: 0,
                        coordinates: [track.vesselTrackPoints[0].position.lon, track.vesselTrackPoints[0].position.lat],
                        'icon-image': 'vesselSelectedTrackMarker'
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [track.vesselTrackPoints[0].position.lon, track.vesselTrackPoints[0].position.lat]
                    }
                }]
            }
        );

        isTrackPointVisibleSpy.and.returnValue(false);
        convertedFeatureCollection = trackMarkerDrawer['convertTracksToFeatureCollection'](track, [track], {}, { 1: generateVessel(1) });

        expect(VesselUtil.isTrackPointVisible).toHaveBeenCalled();
        expect(convertedFeatureCollection).toEqual({ type: 'FeatureCollection', features: [] });
    });
});
