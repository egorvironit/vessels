import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { VesselAlarmsComponent } from './vessel-alarms.component';
import { VesselSubdetailsComponent } from '../vessel-subdetails/vessel-subdetails.component';

describe('VesselAlarmsComponent', () => {
    let component: VesselAlarmsComponent;
    let fixture: ComponentFixture<VesselAlarmsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                VesselAlarmsComponent,
                VesselSubdetailsComponent
            ],
            imports: [
                TranslateModule.forRoot()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VesselAlarmsComponent);
        component = fixture.componentInstance;
        component.alarms$ = of([]);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
