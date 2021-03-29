import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { VesselPopupAlarmComponent } from './vessel-popup-alarm.component';

describe('VesselPopupAlarmComponent', () => {
    let component: VesselPopupAlarmComponent;
    let fixture: ComponentFixture<VesselPopupAlarmComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VesselPopupAlarmComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VesselPopupAlarmComponent);
        component = fixture.componentInstance;
        component.alarms$ = of([]);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
