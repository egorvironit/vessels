import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import * as fromVesselStore from '../store';

@Injectable({
    providedIn: 'root'
})
export class VesselGuard implements CanActivate {

    constructor(private store: Store<fromVesselStore.State>) { }

    canActivate(): Observable<boolean> {
        return this.store
            .select(fromVesselStore.getIsVesselsLoaded)
            .pipe(
                filter(loaded => loaded),
                take(1)
            );
    }

}
