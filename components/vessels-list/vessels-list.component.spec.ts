import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuModule } from 'ngx-contextmenu';
import { StoreModule } from '@ngrx/store';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MomentModule } from 'ngx-moment';
import { of } from 'rxjs';


import { VesselContextMenuComponent, VesselListComponent } from '@vessels/components';
import { SharedModule } from '@shared/shared.module';
import { reducers } from '@vessels/store';

describe('VesselListComponent', () => {
    let component: VesselListComponent;
    let fixture: ComponentFixture<VesselListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                ContextMenuModule.forRoot(),
                NgxDatatableModule,
                MomentModule,
                StoreModule.forRoot({}),
                StoreModule.forFeature('vessels', reducers),
                SharedModule
            ],
            declarations: [
                VesselListComponent,
                VesselContextMenuComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VesselListComponent);
        component = fixture.componentInstance;
        component.vessels$ = of([]);
        component.columns$ = of([]);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
