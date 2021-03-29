import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'ngx-moment';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { VesselPopupComponent } from './vessel-popup.component';
import { VesselPopupHeaderComponent } from './vessel-popup-header/vessel-popup-header.component';
import {
    VesselMotionParametersComponent,
    VesselSubdetailsComponent
} from '@vessels/components';
import { VesselPopupVoyageInfoComponent } from './vessel-popup-voyage-info/vessel-popup-voyage-info.component';
import { VesselPopupAlarmComponent } from '@vessels/components/vessel-popup/vessel-popup-alarm/vessel-popup-alarm.component';
import { CoordinatesPipe } from '@shared/pipes';
import { ValueOrNAPipe } from '@shared/pipes/value-or-na.pipe';
import * as RouterActions from '@store/actions';

describe('VesselPopupComponent', () => {
    let component: VesselPopupComponent;
    let fixture: ComponentFixture<VesselPopupComponent>;

    const store = {
        dispatch: (data) => {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                VesselPopupComponent,
                VesselPopupHeaderComponent,
                VesselMotionParametersComponent,
                VesselPopupVoyageInfoComponent,
                VesselSubdetailsComponent,
                VesselPopupAlarmComponent,
                CoordinatesPipe,
                ValueOrNAPipe
            ],
            imports: [
                MomentModule,
                TranslateModule.forRoot(),
                StoreModule.forRoot({})
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VesselPopupComponent);
        component = fixture.componentInstance;
        component.vessel$ = of(null);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirect to details page', () => {
        component['store' as any] = store as any;
        spyOn(component['store' as any], 'dispatch');
        const vesselId = 1;
        component.onGoToDetails(vesselId);

        expect(store.dispatch).toHaveBeenCalledWith(
            new RouterActions.Go({
                path: ['overview/details'],
                query: { vesselId }
            })
        );
    });

});
