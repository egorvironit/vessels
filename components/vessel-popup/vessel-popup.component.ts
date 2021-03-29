import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as RouterActions from '@store/actions';
import * as OverviewActions from '@pages/overview/store/actions';
import * as fromOverview from '@pages/overview/store';
import { VesselState } from '@vessels/store';
import { Vessel } from '../../models';
import { Alarm } from '@alarms/model';

@Component({
    selector: 'vessel-popup',
    templateUrl: './vessel-popup.component.html',
    styleUrls: ['./vessel-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselPopupComponent {

    vessel$: Observable<Vessel>;
    alarms$: Observable<Alarm[]>;

    constructor(private store: Store<VesselState>) {
        this.alarms$ = this.store.select(fromOverview.getAlarmsBySelectedVessel);
    }

    onGoToDetails(vesselId: number) {
        this.store.dispatch(new RouterActions.Go({
            path: ['overview/details'],
            query: { vesselId }
        }));
        this.store.dispatch(new OverviewActions.SetMapPopupVisibility(false));
    }

}
