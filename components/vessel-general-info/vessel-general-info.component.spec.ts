import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MomentModule } from 'ngx-moment';
import { TranslateModule } from '@ngx-translate/core';

import { VesselGeneralInfoComponent } from './vessel-general-info.component';
import { VesselSubdetailsComponent } from '../vessel-subdetails/vessel-subdetails.component';
import { generateVessel } from '@testing/factories/vessels/vessel.factory';
import { ValueOrNAPipe } from '@shared/pipes/value-or-na.pipe';
import { By } from '@angular/platform-browser';
import { VesselDynamicData, VesselStaticData, Vessel } from '@vessels/models';

describe('VesselGeneralInfoComponent', () => {
    let component: VesselGeneralInfoComponent;
    let fixture: ComponentFixture<VesselGeneralInfoComponent>;

    let vesselNameElement;
    let vesselTypeElement;
    let vesselImoElement;
    let vesselCallsignElement;
    let vesselMmsiElement;
    let vesselFlagElement;
    let vesselDestinationElement;
    let vesselNavStatusElement;
    let vesselTrackingModeElement;
    let vesselClassElement;
    let vesselTrackingStatusElement;
    let vesselLengthElement;
    let vesselBeamElement;
    let vesselDraughtElement;
    let vesselBoardHeightElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                VesselGeneralInfoComponent,
                VesselSubdetailsComponent,
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
        fixture = TestBed.createComponent(VesselGeneralInfoComponent);
        component = fixture.componentInstance;

        vesselNameElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-name"]')).nativeElement;
        vesselTypeElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-type"]')).nativeElement;
        vesselImoElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-imo"]')).nativeElement;
        vesselCallsignElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-callsign"]')).nativeElement;
        vesselMmsiElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-mmsi"]')).nativeElement;
        vesselFlagElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-flag"]')).nativeElement;
        vesselDestinationElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-destination"]')).nativeElement;
        vesselNavStatusElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-nav-status"]')).nativeElement;
        vesselTrackingModeElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-tracking-mode"]')).nativeElement;
        vesselClassElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-class"]')).nativeElement;
        vesselTrackingStatusElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-tracking-status"]')).nativeElement;
        vesselLengthElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-length"]')).nativeElement;
        vesselBeamElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-beam"]')).nativeElement;
        vesselDraughtElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-draught"]')).nativeElement;
        vesselBoardHeightElement = fixture.debugElement.query(By.css('[qa-id="general-info-vessel-board-height"]')).nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display data', () => {
        const data = generateVessel();
        component.vessel = data;

        expect(vesselNameElement.textContent).toBe('');
        expect(vesselTypeElement.textContent).toBe('');
        expect(vesselImoElement.textContent).toBe('');
        expect(vesselCallsignElement.textContent).toBe('');
        expect(vesselDestinationElement.textContent).toBe('');
        expect(vesselFlagElement.textContent).toBe('');
        expect(vesselNavStatusElement.textContent).toBe('');
        expect(vesselTrackingModeElement.textContent).toBe('');
        expect(vesselClassElement.textContent).toBe('');
        expect(vesselTrackingStatusElement.textContent).toBe('');
        expect(vesselMmsiElement.textContent).toBe('');
        expect(vesselLengthElement.textContent.trim()).toBe('');
        expect(vesselBeamElement.textContent.trim()).toBe('');
        expect(vesselDraughtElement.textContent.trim()).toBe('');
        expect(vesselBoardHeightElement.textContent.trim()).toBe('');

        fixture.detectChanges();

        expect(vesselNameElement.textContent).toBe(component.vessel.static.name);
        expect(vesselTypeElement.textContent).toBe(component.vessel.static.type);
        expect(vesselImoElement.textContent).toBe(String(component.vessel.static.imo));
        expect(vesselCallsignElement.textContent).toBe(component.vessel.static.callsign);
        expect(vesselDestinationElement.textContent).toBe(component.vessel.static.destination);
        expect(vesselFlagElement.textContent).toBe(component.vessel.static.flag);
        expect(vesselNavStatusElement.textContent).toBe(component.vessel.dynamic.navStatus);
        expect(vesselTrackingModeElement.textContent).toBe(component.vessel.dynamic.trackingMode);
        expect(vesselClassElement.textContent).toBe(component.vessel.static.class);
        expect(vesselTrackingStatusElement.textContent).toBe(component.vessel.dynamic.trackingStatus);
        expect(vesselMmsiElement.textContent).toBe(String(component.vessel.static.mmsi));
        expect(vesselLengthElement.textContent.trim()).toBe(component.vessel.static.length + ' m');
        expect(vesselBeamElement.textContent.trim()).toBe(component.vessel.static.beam + ' m');
        expect(vesselDraughtElement.textContent.trim()).toBe(component.vessel.static.draught + ' m');
        expect(vesselBoardHeightElement.textContent.trim()).toBe(component.vessel.static.boardHeight + ' m');
    });

    it('should display N/A', () => {
        const data = generateVessel();
        component.vessel = {
            dynamic: {} as VesselDynamicData,
            static: {} as VesselStaticData
        } as Vessel;

        expect(vesselNameElement.textContent).toBe('');
        expect(vesselTypeElement.textContent).toBe('');
        expect(vesselImoElement.textContent).toBe('');
        expect(vesselCallsignElement.textContent).toBe('');
        expect(vesselDestinationElement.textContent).toBe('');
        expect(vesselFlagElement.textContent).toBe('');
        expect(vesselNavStatusElement.textContent).toBe('');
        expect(vesselTrackingModeElement.textContent).toBe('');
        expect(vesselClassElement.textContent).toBe('');
        expect(vesselTrackingStatusElement.textContent).toBe('');
        expect(vesselMmsiElement.textContent).toBe('');
        expect(vesselLengthElement.textContent.trim()).toBe('');
        expect(vesselBeamElement.textContent.trim()).toBe('');
        expect(vesselDraughtElement.textContent.trim()).toBe('');
        expect(vesselBoardHeightElement.textContent.trim()).toBe('');

        fixture.detectChanges();

        expect(vesselNameElement.textContent).toBe('-');
        expect(vesselTypeElement.textContent).toBe('-');
        expect(vesselImoElement.textContent).toBe('-');
        expect(vesselCallsignElement.textContent).toBe('-');
        expect(vesselDestinationElement.textContent).toBe('-');
        expect(vesselFlagElement.textContent).toBe('-');
        expect(vesselNavStatusElement.textContent).toBe('-');
        expect(vesselTrackingModeElement.textContent).toBe('-');
        expect(vesselClassElement.textContent).toBe('-');
        expect(vesselTrackingStatusElement.textContent).toBe('-');
        expect(vesselMmsiElement.textContent).toBe('-');
        expect(vesselLengthElement.textContent.trim()).toBe('-');
        expect(vesselBeamElement.textContent.trim()).toBe('-');
        expect(vesselDraughtElement.textContent.trim()).toBe('-');
        expect(vesselBoardHeightElement.textContent.trim()).toBe('-');
    });
});
