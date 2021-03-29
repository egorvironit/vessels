import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuModule } from 'ngx-contextmenu';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

import { VesselContextMenuComponent } from './vessel-context-menu.component';
import { reducers } from '@vessels/store';

describe('TargetsContextMenuComponent', () => {
    let component: VesselContextMenuComponent;
    let fixture: ComponentFixture<VesselContextMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VesselContextMenuComponent],
            imports: [
                ContextMenuModule.forRoot(),
                TranslateModule.forRoot(),
                StoreModule.forRoot({}),
                StoreModule.forFeature('vessels', reducers),
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VesselContextMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
