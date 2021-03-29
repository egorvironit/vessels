import { VesselFilterActions, VesselFilterTypes } from '../actions';

export interface State {
    query: string;
}

export const initialState: State = {
    query: ''
};

export function reducer(
    state = initialState,
    action: VesselFilterActions
): State {
    switch (action.type) {
        case VesselFilterTypes.UpdateFilter: {
            return {
                ...state,
                query: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
