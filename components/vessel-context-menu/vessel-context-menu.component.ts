import { ChangeDetectionStrategy, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import * as fromVessel from '@vessels/store';
import { TrackPeriods } from '@vessels/constants';
import { Vessel } from '@vessels/models';

@Component({
    selector: 'vessels-targets-context-menu',
    templateUrl: './vessel-context-menu.component.html',
    styleUrls: ['./vessel-context-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselContextMenuComponent implements OnInit, OnDestroy {

    readonly TrackPeriods = TrackPeriods;

    vesselId: number;
    trackPeriod$: Observable<number>;

    @ViewChild('menu') menu: ContextMenuComponent;

    private destroyed$ = new Subject();

    constructor(private store: Store<fromVessel.State>) { }

    ngOnInit() {
        this.store.select(fromVessel.getVesselContextMenuData)
            .pipe(
                takeUntil(this.destroyed$),
                filter(data => !!data)
            )
            .subscribe(contextMenuData => {
                this.vesselId = contextMenuData.targetId;
                this.trackPeriod$ = this.store.select(fromVessel.getTrackViewInfoById, this.vesselId);
            });
    }

    isLinkVisible(vessel: Vessel): boolean {
        return !!(vessel && vessel.static && vessel.static.link && vessel.static.linkText);
    }

    displayTrack(period: number) {
        this.store.dispatch(new fromVessel.LoadTrack({ vesselId: this.vesselId }));
        this.store.dispatch(new fromVessel.ChangeTrackViewInfo({
            period,
            targetId: this.vesselId
        }));
    }

    openLink(link: string) {
        window.open(link, '_blank');
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }
}
