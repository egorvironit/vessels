import { VesselTableActions, VesselTableTypes } from '../actions';
import { VesselTableColumn } from '@vessels/models';
import { vesselTableColumns, VesselPropertyTypes } from '@vessels/constants';

export interface State {
    ids: VesselPropertyTypes[];
}

export const initialState: State = {
    ids: vesselTableColumns.slice(1, 4).map(column => column.id)
};

export function reducer(
    state = initialState,
    action: VesselTableActions
): State {
    switch (action.type) {
        case VesselTableTypes.ChangeColumnsOrder: {
            return {
                ...state,
                ids: action.payload.map(item => item.id)
            };
        }
        default: {
            return state;
        }
    }
}
