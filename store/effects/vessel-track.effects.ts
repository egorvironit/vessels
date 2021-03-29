import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { VesselTrackActionTypes, LoadTrack } from '../actions';
import { VesselService } from '../../services';

@Injectable()
export class VesselTrackEffects {

    constructor(
        private actions$: Actions,
        private vesselService: VesselService
    ) { }

    @Effect() loadVesselTrack$: Observable<Action> = this.actions$
        .pipe(
            ofType(VesselTrackActionTypes.Load),
            map((action: LoadTrack) => action.payload),
            mergeMap(payload => {
                return this.vesselService.loadVesselTrack(payload.vesselId)
                    .pipe(
                        map(vesselTrack => ({
                            type: VesselTrackActionTypes.LoadSuccess,
                            payload: vesselTrack
                        })),
                        catchError(() => of({ type: VesselTrackActionTypes.LoadFailure }))
                    );
            })
        );

}
