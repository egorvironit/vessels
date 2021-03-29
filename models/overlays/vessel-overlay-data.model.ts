import { Observable, Subject } from 'rxjs';

import { TrackViewInfo, Vessel, VesselTrack } from '../index';
import { Themes, Locales } from '@settings/constants';
import { Dictionary } from '@core/models';

export interface VesselOverlayData {
    vessels$: Observable<Vessel[]>;
    vesselsDictionary$: Observable<Dictionary<Vessel>>;
    selectedVessel$: Observable<Vessel>;
    theme$: Observable<Themes>;
    locale$: Observable<Locales>;
    vesselSelectedTrack$: Observable<VesselTrack>;
    vesselTracks$: Observable<VesselTrack[]>;
    vesselTrackViewInfo$: Observable<Dictionary<TrackViewInfo>>;
    redraw$: Subject<boolean>;
}
