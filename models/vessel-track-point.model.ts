import { Position } from './position.model';

export interface VesselTrackPoint {
    position: Position;
    cog: number;
    sog: number;
    heading: number;
    timestamp: number;
}
