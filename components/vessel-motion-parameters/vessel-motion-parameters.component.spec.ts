import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { VesselMotionParametersComponent } from './vessel-motion-parameters.component';
import { VesselSubdetailsComponent } from '../vessel-subdetails/vessel-subdetails.component';
import { CoordinatesPipe } from '@shared/pipes';
import { generateVesselDynamicData } from '@testing/factories/vessels/vessel.factory';
import { ValueOrNAPipe } from '@shared/pipes/value-or-na.pipe';

describe('VesselMotionParametersComponent', () => {
    let component: VesselMotionParametersComponent;
    let fixture: ComponentFixture<VesselMotionParametersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                VesselMotionParametersComponent,
                VesselSubdetailsComponent,
                CoordinatesPipe,
                ValueOrNAPipe
            ],
            imports: [
                TranslateModule.forRoot()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VesselMotionParametersComponent);
        component = fixture.componentInstance;
        component.data = generateVesselDynamicData();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
