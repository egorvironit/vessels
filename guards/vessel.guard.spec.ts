import { TestBed, inject } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { VesselGuard } from './vessel.guard';

describe('VesselGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({})
            ],
            providers: [VesselGuard]
        });
    });

    it('should create', inject([VesselGuard], (guard: VesselGuard) => {
        expect(guard).toBeTruthy();
    }));
});
