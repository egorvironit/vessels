import { Action } from '@ngrx/store';

import { VesselTableColumn } from '@vessels/models';

export enum VesselTableTypes {
    ChangeColumnsOrder = '[Vessel Table] Change Columns Order'
}

export class ChangeColumnsOrder implements Action {
    readonly type = VesselTableTypes.ChangeColumnsOrder;

    constructor(public payload: VesselTableColumn[]) { }
}

export type VesselTableActions = ChangeColumnsOrder;
