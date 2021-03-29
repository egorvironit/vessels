import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    HostListener
} from '@angular/core';
import { ContextMenuService } from 'ngx-contextmenu';
import { Observable, Subject } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { takeUntil } from 'rxjs/operators';

import { Vessel, VesselTableColumn } from '@vessels/models';
import { CoreUtil } from '@core/util';
import { VesselViewStatuses } from '@vessels/constants';
import { VesselContextMenuComponent } from '../vessel-context-menu/vessel-context-menu.component';
import { VesselUtil } from '@vessels/utils';

@Component({
    selector: 'vessel-list',
    templateUrl: './vessels-list.component.html',
    styleUrls: ['./vessels-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselListComponent implements OnDestroy, AfterViewInit {
    @Input() columns$: Observable<VesselTableColumn[]>;
    @Input() vessels$: Observable<Vessel[]>;
    @Input() selectedVesselId$: Observable<number>;

    @Output() vesselClick = new EventEmitter<number>();
    @Output() vesselDetailsClick = new EventEmitter<number>();
    @Output() vesselContextMenuClick = new EventEmitter<number>();

    @ViewChild('list') vesselContextMenu: VesselContextMenuComponent;
    @ViewChild(DatatableComponent) tableComp: DatatableComponent;

    readonly util = CoreUtil;
    readonly VesselUtil = VesselUtil;
    readonly VesselStatuses = VesselViewStatuses;

    private destroyed$ = new Subject();
    private scrollbar: PerfectScrollbar;

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.scrollbar.update();
    }

    constructor(private contextMenuService: ContextMenuService) { }

    ngAfterViewInit() {
        this.scrollbar = new PerfectScrollbar('.datatable-body');
        this.vessels$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.scrollbar.update();
        });
    }

    onContextMenu(event: MouseEvent, vessel: Vessel): void {
        this.contextMenuService.show.next({
            contextMenu: this.vesselContextMenu.menu,
            event,
            item: vessel
        });
        event.preventDefault();
        event.stopPropagation();
        this.vesselContextMenuClick.emit(vessel.targetId);

    }

    onColumnResize() {
        this.tableComp.recalculate();
    }

    selectVessel(id: number) {
        this.vesselClick.next(id);
    }

    goToVesselDetails(id: number) {
        this.vesselDetailsClick.next(id);
    }

    getRowClass(selectedVesselId) {
        return (row) => ({
            active: selectedVesselId === row.targetId,
            inactive: row.status === this.VesselStatuses.outdated,
            alarmed: row.status === this.VesselStatuses.alarmed
        });
    }

    ngOnDestroy() {
        if (this.scrollbar) {
            this.scrollbar.destroy();
        }
        this.destroyed$.next();
    }

}
