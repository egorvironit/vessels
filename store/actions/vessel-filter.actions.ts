import { Action } from '@ngrx/store';

export enum VesselFilterTypes {
    UpdateFilter = '[Vessel] Update filter',
}

export class UpdateFilter implements Action {
    readonly type = VesselFilterTypes.UpdateFilter;

    constructor(public payload: string) { }
}

export type VesselFilterActions
    = UpdateFilter;

