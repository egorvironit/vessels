import { Action } from '@ngrx/store';

import { TrackViewInfo, VesselTrack } from '@vessels/models';

export enum VesselTrackActionTypes {
    Load = '[Vessel Track] Load Track',
    LoadTracksSuccess = '[Vessel Track] Load Tracks Success',
    LoadSuccess = '[Vessel Track] Load Track Success',
    LoadFailure = '[Vessel Track] Load Track Failure',

    ChangeTrackViewInfo = '[Vessel Track] Change Track View Info'
}

export class LoadTrack implements Action {
    readonly type = VesselTrackActionTypes.Load;

    constructor(public payload: { vesselId: number, period?: number }) { }
}

export class LoadTracksSuccess implements Action {
    readonly type = VesselTrackActionTypes.LoadTracksSuccess;

    constructor(public payload: VesselTrack[]) { }
}

export class LoadTrackSuccess implements Action {
    readonly type = VesselTrackActionTypes.LoadSuccess;

    constructor(public payload: VesselTrack) { }
}

export class LoadTrackFailure implements Action {
    readonly type = VesselTrackActionTypes.LoadFailure;
}

export class ChangeTrackViewInfo implements Action {
    readonly type = VesselTrackActionTypes.ChangeTrackViewInfo;

    constructor(public payload: TrackViewInfo) {
    }
}

export type VesselTrackActions
    = LoadTrack
    | LoadTrackSuccess
    | LoadTrackFailure
    | ChangeTrackViewInfo
    | LoadTracksSuccess;
