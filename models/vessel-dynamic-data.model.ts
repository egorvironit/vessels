import { Position } from './position.model';

export interface VesselDynamicData {
    targetId: number;
    cog: number;
    sog: number;
    heading: number;
    position: Position;
    navStatus: string;
    trackingMode: string;
    trackingStatus: string;
    timestamp: number;
}
