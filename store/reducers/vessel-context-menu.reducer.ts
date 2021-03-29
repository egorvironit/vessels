import { VesselContextMenu } from '../../models';
import { VesselContextMenuActions, VesselContextMenuActionTypes } from '@vessels/store/actions/vessel-context-menu.actions';
import { LoadStatuses } from '@core/constants';

export interface State {
    contextMenuData: VesselContextMenu;
}

export const initialState: State = {
    contextMenuData: null
};

export function reducer(
    state = initialState,
    action: VesselContextMenuActions
): State {
    switch (action.type) {
        case VesselContextMenuActionTypes.SetContextMenu: {
            return {
                ...state,
                contextMenuData: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
