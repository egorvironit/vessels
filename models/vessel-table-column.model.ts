import { VesselPropertyTypes } from '@vessels/constants/vessel-property-types.constant';

export interface VesselTableColumn {
    id: VesselPropertyTypes;
    prop: string;
    title: string;
    sortable: boolean;
}
