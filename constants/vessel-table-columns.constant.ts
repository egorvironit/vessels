import { Dictionary } from '@core/models';
import { VesselTableColumn } from '@vessels/models';

export const vesselTableColumns: VesselTableColumn[] = [
    { id: 'none', prop: 'none', title: 'None', sortable: false },
    { id: 'type', prop: 'static.type', title: 'VESSELS.TYPE', sortable: true },
    { id: 'mmsi', prop: 'static.mmsi', title: 'VESSELS.MMSI', sortable: true },
    { id: 'callsign', prop: 'static.callsign', title: 'VESSELS.CALLSIGN', sortable: true },
    { id: 'imo', prop: 'static.imo', title: 'VESSELS.DETAILS.IMO_NUMBER', sortable: true },
    { id: 'flag', prop: 'static.flag', title: 'VESSELS.DETAILS.FLAG', sortable: true },
    { id: 'destination', prop: 'static.destination', title: 'COMMON.DESTINATION', sortable: true },
    { id: 'eta', prop: 'static.eta', title: 'VESSELS.DETAILS.ETA', sortable: true },
    { id: 'navStatus', prop: 'dynamic.navStatus', title: 'VESSELS.DETAILS.NAV_STATUS', sortable: true },
    { id: 'trackingMode', prop: 'dynamic.trackingMode', title: 'VESSELS.DETAILS.TRACKING_MODE', sortable: true },
    { id: 'trackingStatus', prop: 'dynamic.trackingStatus', title: 'VESSELS.DETAILS.TRACKING_STATUS', sortable: true },
    { id: 'class', prop: 'static.class', title: 'VESSELS.DETAILS.TARGET_CLASS', sortable: true },
    { id: 'length', prop: 'static.length', title: 'VESSELS.DETAILS.LENGTH', sortable: true },
    { id: 'beam', prop: 'static.beam', title: 'VESSELS.DETAILS.BEAM', sortable: true },
    { id: 'draught', prop: 'static.draught', title: 'VESSELS.DETAILS.DRAUGHT', sortable: true },
    { id: 'boardHeight', prop: 'static.boardHeight', title: 'VESSELS.DETAILS.BOARD_HEIGHT', sortable: true },
    { id: 'cog', prop: 'dynamic.cog', title: 'VESSELS.DETAILS.COG', sortable: true },
    { id: 'sog', prop: 'dynamic.sog', title: 'VESSELS.DETAILS.SOG', sortable: true },
    { id: 'heading', prop: 'dynamic.heading', title: 'VESSELS.DETAILS.HEADING', sortable: true },
    { id: 'position', prop: 'dynamic.position', title: 'COMMON.POSITION', sortable: false }
];

export const VesselTableColumnsDictonary: Dictionary<VesselTableColumn> = vesselTableColumns.reduce((acc, column) => {
    acc[column.id] = column;
    return acc;
}, {});
