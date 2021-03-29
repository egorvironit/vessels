import { LoadTrack } from '@vessels/store';
import { VesselTrackActionTypes } from './vessel-track.actions';
import { LoadTrackFailure, LoadTrackSuccess } from '@vessels/store/actions/vessel-track.actions';
import { VesselTrack } from '@vessels/models';

describe('Vessel track actions', () => {
    it('should create an Load Track action', () => {
        const payload = { vesselId: 1 };
        const action = new LoadTrack({ vesselId: 1 });
        expect(<LoadTrack>{ ...action }).toEqual(<LoadTrack>{ payload, type: VesselTrackActionTypes.Load });
    });

    it('should create an LoadTrackSuccess action', () => {
        const payload: VesselTrack = {
            vesselId: 1,
            vesselTrackPoints: []
        };

        const action = new LoadTrackSuccess(payload);
        expect(<LoadTrackSuccess>{ ...action }).toEqual(<LoadTrackSuccess>{ payload, type: VesselTrackActionTypes.LoadSuccess });
    });

    it('should create an LoadTrackFailure action', () => {
        const action = new LoadTrackFailure();
        expect(<LoadTrackFailure>{ ...action }).toEqual(<LoadTrackFailure>{ type: VesselTrackActionTypes.LoadFailure });
    });
});
