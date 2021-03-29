import { VesselStaticData } from './vessel-static-data.model';

export interface LoadStaticDataResponse {
    timestamp: number;
    targets: VesselStaticData[];
}
