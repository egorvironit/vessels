import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { VesselActions, VesselActionTypes } from './../actions';
import { Vessel } from '../../models';

export interface State extends EntityState<Vessel> {
    staticDataTimestamp: number;
    dynamicDataTimestamp: number;
    lastReponseTimestamp: number;
    isLoaded: boolean;
    isLoading: boolean;
}

export const adapter: EntityAdapter<Vessel> = createEntityAdapter<Vessel>({
    selectId: vessel => vessel.targetId
});

export const initialState: State = adapter.getInitialState({
    staticDataTimestamp: 0,
    dynamicDataTimestamp: 0,
    lastReponseTimestamp: 0,
    isLoaded: false,
    isLoading: false
});

export function reducer(
    state = initialState,
    action: VesselActions
): State {
    switch (action.type) {
        case VesselActionTypes.Load: {
            return {
                ...state,
                isLoading: true
            };
        }
        case VesselActionTypes.LoadFailure: {
            const timestamp = state.lastReponseTimestamp ? state.lastReponseTimestamp + action.payload.responseTimeDiff : 0;
            return {
                ...state,
                lastReponseTimestamp: timestamp,
                isLoading: false
            };
        }
        case VesselActionTypes.LoadSuccess: {
            return {
                ...adapter.upsertMany(action.payload.vessels, state),
                staticDataTimestamp: action.payload.staticDataTimestamp,
                dynamicDataTimestamp: action.payload.dynamicDataTimestamp,
                lastReponseTimestamp: action.payload.dynamicDataTimestamp,
                isLoaded: true,
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}
