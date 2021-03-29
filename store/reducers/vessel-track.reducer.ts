import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { VesselTrack } from '../../models';
import { VesselTrackActions, VesselTrackActionTypes } from '../actions';
import { TrackViewInfo } from '@vessels/models';
import { Dictionary } from '@core/models';

export interface State extends EntityState<VesselTrack> {
    vesselTrackViewInfo: Dictionary<TrackViewInfo>;
}

export const adapter: EntityAdapter<VesselTrack> = createEntityAdapter<VesselTrack>({
    selectId: (track: VesselTrack) => track.vesselId
});

export const initialState: State = adapter.getInitialState({
    vesselTrackViewInfo: {}
});

export function reducer(
    state = initialState,
    action: VesselTrackActions
): State {
    switch (action.type) {
        case VesselTrackActionTypes.LoadSuccess: {
            if (!action.payload) {
                return state;
            }

            return adapter.upsertOne(action.payload, state);
        }
        case VesselTrackActionTypes.LoadTracksSuccess: {
            return adapter.upsertMany(action.payload, state);
        }
        case VesselTrackActionTypes.LoadFailure: {
            return state;
        }
        case VesselTrackActionTypes.ChangeTrackViewInfo: {
            const vesselTrackViewInfo = { ...state.vesselTrackViewInfo };

            if (action.payload.period) {
                vesselTrackViewInfo[action.payload.targetId] = {
                    period: action.payload.period,
                    targetId: action.payload.targetId
                };
            } else {
                delete vesselTrackViewInfo[action.payload.targetId];
            }

            return {
                ...state,
                vesselTrackViewInfo
            };
        }
        default: {
            return state;
        }
    }
}
