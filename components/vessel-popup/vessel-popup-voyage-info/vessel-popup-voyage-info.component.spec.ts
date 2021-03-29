import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'ngx-moment';

import { VesselPopupVoyageInfoComponent } from './vessel-popup-voyage-info.component';
import { ValueOrNAPipe } from '@shared/pipes/value-or-na.pipe';
import { generateVesselStaticData } from '@testing/factories/vessels/vessel.factory';
import { By } from '@angular/platform-browser';

describe('VesselPopupVoyageInfoComponent', () => {
    let component: VesselPopupVoyageInfoComponent;
    let fixture: ComponentFixture<VesselPopupVoyageInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                VesselPopupVoyageInfoComponent,
                ValueOrNAPipe
            ],
            imports: [
                MomentModule,
                TranslateModule.forRoot()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VesselPopupVoyageInfoComponent);
        component = fixture.componentInstance;
        component.data = generateVesselStaticData();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display data', () => {
        const elements = fixture.debugElement.queryAll(By.css('.parameter-value'));

        expect(elements[0].nativeElement.textContent).toBe('');
        expect(elements[1].nativeElement.textContent).toBe('');
        expect(elements[2].nativeElement.textContent).toBe('');

        fixture.detectChanges();

        expect(elements[0].nativeElement.textContent).toBe(String(component.data.mmsi));
        expect(elements[1].nativeElement.textContent).toBe(component.data.destination);
        expect(elements[2].nativeElement.textContent).toBe('29 Oct 2019 14:49 UTC');
    });

    it('should display N/A', () => {
        const elements = fixture.debugElement.queryAll(By.css('.parameter-value'));

        expect(elements[0].nativeElement.textContent).toBe('');
        expect(elements[1].nativeElement.textContent).toBe('');
        expect(elements[2].nativeElement.textContent).toBe('');
        component.data.mmsi = null;
        component.data.destination = null;
        component.data.eta = null;

        fixture.detectChanges();

        expect(elements[0].nativeElement.textContent).toBe('-');
        expect(elements[1].nativeElement.textContent).toBe('-');
        expect(elements[2].nativeElement.textContent).toBe('-');
    });
});
