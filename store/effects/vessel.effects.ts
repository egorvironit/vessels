import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromAlarmStore from '@alarms/store';
import { VesselActionTypes } from '../actions';
import { VesselService } from '../../services/vessel.service';

@Injectable()
export class VesselEffects {

    constructor(
        private vesselService: VesselService,
        private actions$: Actions,
        private store: Store<fromAlarmStore.State>
    ) {
    }

    @Effect() load$: Observable<Action> = this.actions$
        .pipe(
            ofType(VesselActionTypes.Load),
            mergeMap(() =>
                this.vesselService.loadVessels()
                    .pipe(
                        map(data => ({ type: VesselActionTypes.LoadSuccess, payload: data })),
                        catchError(() => of({ type: VesselActionTypes.LoadFailure }))
                    )
            )
        );
}
