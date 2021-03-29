import { VesselTrack, VesselTrackDrawer } from '@vessels/models';
import { LayerIds } from '@map/constants';
import { generateVessel } from '@testing/factories/vessels/vessel.factory';
import { VesselUtil } from '@vessels/utils';

describe('Vessel Track Markers Drawer Model', () => {
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


    const trackDrawer = new VesselTrackDrawer(<any>map);

    beforeEach(() => {
        spyOn(map, 'getSource').and.callThrough();
        spyOn<any>(trackDrawer, 'getVesselFeatrueCollection').and.callThrough();
        spyOn(source, 'setData');
    });

    it('should display track', () => {
        track.vesselTrackPoints[0] = { cog: 0, sog: 0, heading: 0, position: { lat: 0, lon: 0 }, timestamp: 0 };
        trackDrawer.draw(track, [], {}, { 1: generateVessel(1) });
        const featureCollection = trackDrawer['getVesselFeatrueCollection'](track, [], {}, { 1: generateVessel(1) });
        expect(map.getSource).toHaveBeenCalledWith(LayerIds.vesselTrack);
        expect(trackDrawer.vesselTrackSource.setData).toHaveBeenCalledWith(featureCollection);
    });

    it('should generate new source', () => {
        track.vesselTrackPoints[0] = { cog: 0, sog: 0, heading: 0, position: { lat: 0, lon: 0 }, timestamp: 0 };
        const isTrackPointVisibleSpy = spyOn(VesselUtil, 'isTrackPointVisible').and.returnValue(true);
        const vessel = generateVessel(1);
        trackDrawer.draw(track, [], {}, { 1: vessel });

        expect(map.getSource).toHaveBeenCalledWith(LayerIds.vesselTrack);
        expect(trackDrawer.vesselTrackSource.setData).toHaveBeenCalledWith(
            {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: { 'line-color': '#89bee5' },
                    geometry: {
                        type: 'LineString',
                        coordinates: [[0, 0], [vessel.dynamic.position.lon, vessel.dynamic.position.lat]]
                    }
                }]
            }
        );
    });
});
