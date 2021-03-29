import { Action } from '@ngrx/store';

import { LoadVesselsResponse } from '../../models';

export enum VesselActionTypes {
    Load = '[Vessel] Load Vessel List',
    LoadSuccess = '[Vessel] Load Vessel List Success',
    LoadFailure = '[Vessel] Load Vessel List Failure'
}

export class LoadVessels implements Action {
    readonly type = VesselActionTypes.Load;
}

export class LoadVesselsSuccess implements Action {
    readonly type = VesselActionTypes.LoadSuccess;

    constructor(public payload: LoadVesselsResponse) { }
}

export class LoadVesselsFailure implements Action {
    readonly type = VesselActionTypes.LoadFailure;

    constructor(public payload: { error: any, responseTimeDiff: number}) { }
}

export type VesselActions
    = LoadVessels
    | LoadVesselsSuccess
    | LoadVesselsFailure;

