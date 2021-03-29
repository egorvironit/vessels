import { Vessel } from './vessel.model';

export interface LoadVesselsResponse {
    staticDataTimestamp: number;
    dynamicDataTimestamp: number;
    vessels: Vessel[];
}
