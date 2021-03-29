import * as fromVessel from './vessel.reducer';
import * as fromActions from '../actions/vessel.actions';
import { LoadVesselsResponse } from '@vessels/models';
import { generateVessel } from '@testing/index';

describe('Vessel Reducer', () => {
    it('should return the default state', () => {
        const { initialState } = fromVessel;
        const action = {};

        const state = fromVessel.reducer(undefined, action as any);
        expect(state).toBe(initialState);
    });

    it('should add vessel to the storage', () => {
        const { initialState } = fromVessel;
        const payload: LoadVesselsResponse = {
            staticDataTimestamp: 0,
            dynamicDataTimestamp: 0,
            vessels: [
                generateVessel(1, { name: 'Test1' }),
            ]
        };
        const action = new fromActions.LoadVesselsSuccess(payload);
        const state = fromVessel.reducer(initialState, action);

        expect(state.isLoaded).toBeTruthy();
        expect(state.entities[1]).toEqual(payload.vessels[0]);
    });

});
