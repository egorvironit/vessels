import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ContextMenuModule } from 'ngx-contextmenu';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MomentModule } from 'ngx-moment';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
    VesselFilterComponent,
    VesselListComponent,
    VesselGeneralInfoComponent,
    VesselAlarmsComponent,
    VesselMotionParametersComponent,
    VesselSubdetailsComponent,
    VesselContextMenuComponent
} from './components';
import { reducers, VesselEffectsCollection, localStorageSyncReducer } from './store';
import { VesselService } from './services';
import { SharedModule } from '@shared/shared.module';
import {
    VesselPopupComponent,
    VesselPopupHeaderComponent,
    VesselPopupVoyageInfoComponent,
    VesselPopupAlarmComponent
} from '@vessels/components/vessel-popup';

@NgModule({
    declarations: [
        VesselFilterComponent,
        VesselListComponent,
        VesselAlarmsComponent,
        VesselMotionParametersComponent,
        VesselGeneralInfoComponent,
        VesselSubdetailsComponent,
        VesselPopupComponent,
        VesselPopupHeaderComponent,
        VesselPopupVoyageInfoComponent,
        VesselPopupAlarmComponent,
        VesselContextMenuComponent
    ],
    imports: [
        CommonModule,
        MomentModule,
        TranslateModule,
        OverlayModule,
        ContextMenuModule.forRoot(),
        StoreModule.forFeature('vessels', reducers, {
            metaReducers: [localStorageSyncReducer]
        }),
        EffectsModule.forFeature(VesselEffectsCollection),
        VirtualScrollerModule,
        SharedModule,
        PerfectScrollbarModule,
        NgxDatatableModule
    ],
    exports: [
        VesselFilterComponent,
        VesselListComponent,
        VesselAlarmsComponent,
        VesselMotionParametersComponent,
        VesselGeneralInfoComponent,
        VesselPopupComponent,
        VesselContextMenuComponent
    ],
    providers: [
        VesselService
    ],
    entryComponents: [VesselPopupComponent]
})
export class VesselsModule {
}
