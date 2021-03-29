import { VesselStaticData } from './vessel-static-data.model';
import { VesselDynamicData } from './vessel-dynamic-data.model';
import { VesselViewStatuses } from '@vessels/constants';

export interface Vessel {
    targetId: number;
    status: VesselViewStatuses;
    static: VesselStaticData;
    dynamic: VesselDynamicData;
}
