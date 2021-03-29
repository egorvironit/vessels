import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselPopupHeaderComponent } from './vessel-popup-header.component';
import { By } from '@angular/platform-browser';

describe('VesselPopupHeaderComponent', () => {
    let component: VesselPopupHeaderComponent;
    let fixture: ComponentFixture<VesselPopupHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VesselPopupHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VesselPopupHeaderComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should go to details page', () => {
        spyOn(component.clickDetailsIcon, 'emit');
        component.goToDetailsPage();
        expect(component.clickDetailsIcon.emit).toHaveBeenCalled();
    });

    it('should display header name', () => {
        const headerName = 'name_h';
        component.headerName = headerName;

        const element = fixture.debugElement.query(By.css('.vessel-name'));
        expect(element.nativeElement.textContent).toBe('');

        fixture.detectChanges();

        expect(element.nativeElement.textContent).toBe(headerName);
    });
});
