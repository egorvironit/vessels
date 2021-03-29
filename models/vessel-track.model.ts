import { VesselTrackPoint } from './vessel-track-point.model';

export interface VesselTrack {
    vesselId: number;
    vesselTrackPoints: VesselTrackPoint[];
}
