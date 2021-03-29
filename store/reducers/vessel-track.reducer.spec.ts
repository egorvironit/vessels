import * as fromVesselTrack from './vessel-track.reducer';
import * as fromActions from '../actions/vessel-track.actions';
import { VesselTrack } from '@vessels/models';

describe('Vessel Track Reducer', () => {
    it('should return the default state', () => {
        const { initialState } = fromVesselTrack;
        const action = {};

        const state = fromVesselTrack.reducer(undefined, action as any);

        expect(state).toBe(initialState);
    });

    it('should add track to the storage', () => {
        const { initialState } = fromVesselTrack;
        const previousState = { ...initialState };
        const payload: VesselTrack = {
            vesselId: 1,
            vesselTrackPoints: []
        };
        const action = new fromActions.LoadTrackSuccess(payload);
        const state = fromVesselTrack.reducer(previousState, action);
        expect(state.ids[0]).toEqual(payload.vesselId);
        expect(state.entities[payload.vesselId]).toEqual(payload);
    });
});
