export interface VesselStaticData {
    targetId: number;
    name?: string;
    mmsi?: number;
    imo?: number;
    type?: string;
    callsign?: string;
    flag?: string;
    class?: string;
    length?: number;
    beam?: number;
    draught?: number;
    boardHeight?: number;
    destination?: string;
    eta?: number;
    photoLink?: string;
    link?: string;
    linkText?: string;
}
