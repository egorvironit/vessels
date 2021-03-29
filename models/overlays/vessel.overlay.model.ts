import { combineLatest } from 'rxjs';
import { Map } from 'mapbox-gl';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, debounceTime, startWith } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { Overlay } from '@map/models';
import { VesselOverlayData } from './vessel-overlay-data.model';
import { VesselDrawer } from './vessel-drawer.model';
import { VesselSpeedVectorDrawer } from './vessel-speed-vector-drawer.model';
import { VesselTrackDrawer } from './vessel-track-drawer.model';
import { VesselTrackMarkersDrawer } from './vessel-track-markers-drawer.model';

export class VesselOverlay implements Overlay {

    private destroyed$ = new Subject();

    constructor(
        private map: Map,
        private vesselOverlayData: VesselOverlayData,
        private translate: TranslateService
    ) {
        const vesselDrawer = new VesselDrawer(this.map, this.translate);
        const vesselSpeedVectorDrawer = new VesselSpeedVectorDrawer(this.map);
        const vesselTrackDrawer = new VesselTrackDrawer(this.map);
        const vesselTrackIconDrawer = new VesselTrackMarkersDrawer(this.map);

        combineLatest(
            this.vesselOverlayData.vessels$,
            this.vesselOverlayData.selectedVessel$,
            this.vesselOverlayData.theme$,
            this.vesselOverlayData.locale$,
            this.vesselOverlayData.redraw$.pipe(startWith(true))
        )
            .pipe(
                debounceTime(1),
                takeUntil(this.destroyed$)
            )
            .subscribe(([vessels, selectedVessel, theme]) => {
                vesselDrawer.draw(vessels, selectedVessel, theme);
                vesselSpeedVectorDrawer.draw(vessels, theme);
            });

        combineLatest(
            this.vesselOverlayData.vesselSelectedTrack$,
            this.vesselOverlayData.vesselTracks$,
            this.vesselOverlayData.vesselTrackViewInfo$,
            this.vesselOverlayData.vesselsDictionary$,
            this.vesselOverlayData.redraw$.pipe(startWith(true))
        )
            .pipe(
                debounceTime(1),
                takeUntil(this.destroyed$)
            )
            .subscribe(([vesselSelectedTrack, vesselTracks, vesselTrackViewInfo, vesselsDictionary]) => {
                vesselTrackDrawer.draw(vesselSelectedTrack, vesselTracks, vesselTrackViewInfo, vesselsDictionary);
                vesselTrackIconDrawer.draw(vesselSelectedTrack, vesselTracks, vesselTrackViewInfo, vesselsDictionary);
            });

    }

    destroy() {
        this.destroyed$.next();
    }

}
