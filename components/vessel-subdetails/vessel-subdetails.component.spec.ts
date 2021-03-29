import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VesselSubdetailsComponent} from './vessel-subdetails.component';

describe('VesselSubdetailsComponent', () => {
    let component: VesselSubdetailsComponent;
    let fixture: ComponentFixture<VesselSubdetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VesselSubdetailsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VesselSubdetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
