import { Action } from '@ngrx/store';

import { VesselContextMenu } from '@vessels/models';

export enum VesselContextMenuActionTypes {
    SetContextMenu = '[Vessel Context Menu] Set Context Menu',
}

export class SetContextMenu implements Action {
    readonly type = VesselContextMenuActionTypes.SetContextMenu;

    constructor(public payload: VesselContextMenu) { }
}

export type VesselContextMenuActions = SetContextMenu;
