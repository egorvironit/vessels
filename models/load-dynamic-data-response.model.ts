import { VesselDynamicData } from './vessel-dynamic-data.model';

export interface LoadDynamicDataResponse {
    timestamp: number;
    targets: VesselDynamicData[];
}
