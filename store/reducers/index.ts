import { createSelector, createFeatureSelector, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromVessel from './vessel.reducer';
import * as fromVesselFilter from './vessel-filter.reducer';
import * as fromVesselTable from './vessel-table.reducer';
import * as fromVesselTrack from './vessel-track.reducer';
import * as fromVesselContextMenu from './vessel-context-menu.reducer';
import * as fromRoot from '@store/index';
import { getVesselsWithActiveAlarms } from '@alarms/store';
import { VesselViewStatuses, VesselTableColumnsDictonary } from '@vessels/constants';
import { VesselUtil } from '@vessels/utils';
import { getOutdatedTargetPeriodInMin } from '@settings/store';

export interface VesselState {
    vessels: fromVessel.State;
    vesselFilter: fromVesselFilter.State;
    vesselTable: fromVesselTable.State;
    vesselTracks: fromVesselTrack.State;
    vesselContextMenu: fromVesselContextMenu.State;
}

export interface State {
    vessels: VesselState;
}

export const reducers = {
    vessels: fromVessel.reducer,
    vesselFilter: fromVesselFilter.reducer,
    vesselTable: fromVesselTable.reducer,
    vesselTracks: fromVesselTrack.reducer,
    vesselContextMenu: fromVesselContextMenu.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    const config = fromRoot.createLocalStorageSyncConfig(
        'vesselTable',
        ['ids'],
        fromVesselTable.initialState
    );

    return localStorageSync(config)(reducer);
}

export const getVesselsState = createFeatureSelector<VesselState>('vessels');

export const getVesselEntitiesState = createSelector(getVesselsState, state => state.vessels);
export const { selectAll: getAllVessels } = fromVessel.adapter.getSelectors(getVesselEntitiesState);
export const getVesselStaticDataTimestamp = createSelector(getVesselsState, state => state.vessels.staticDataTimestamp);
export const getVesselDynamicDataTimestamp = createSelector(getVesselsState, state => state.vessels.dynamicDataTimestamp);
export const getLasVesselDataReponseTime = createSelector(getVesselsState, state => state.vessels.lastReponseTimestamp);

export const getIsVesselsLoaded = createSelector(getVesselsState, state => state.vessels.isLoaded);
export const getVesselFilter = createSelector(getVesselsState, state => state.vesselFilter.query);
export const getVesselTableColumns = createSelector(
    getVesselsState,
    state => state.vesselTable.ids.map(id => VesselTableColumnsDictonary[id])
);

export const getVesselsTrackEntitiesState = createSelector(getVesselsState, state => state.vesselTracks);
export const { selectAll: getVesselsTracks } = fromVesselTrack.adapter.getSelectors(getVesselsTrackEntitiesState);

export const getVessels = createSelector(
    getVesselDynamicDataTimestamp,
    getOutdatedTargetPeriodInMin,
    getAllVessels,
    getVesselsWithActiveAlarms,
    (timestamp, outdatedPeriodInMin, vessels, vesselWithActiveAlarms) => vessels
        .map(vessel => ({
            ...vessel,
            status: VesselUtil.getVesselStatus(timestamp, outdatedPeriodInMin, vessel, vesselWithActiveAlarms)
        }))
        .filter(vessel => vessel.status !== VesselViewStatuses.removed)
);

export const getAllVesselEntities = createSelector(
    getVessels,
    vessels => vessels.reduce((acc, vessel) => {
        acc[vessel.targetId] = vessel;
        return acc;
    }, {})
);

export const getTracksViewInfo = createSelector(getVesselsState, state => state.vesselTracks.vesselTrackViewInfo);

export const getVesselContextMenuState = createSelector(getVesselsState, state => state.vesselContextMenu);
export const getVesselContextMenuData = createSelector(getVesselContextMenuState, state => state.contextMenuData);

export const getVesselTracksByTrackViewInfo = createSelector(
    getAllVesselEntities,
    getTracksViewInfo,
    getVesselsTracks,
    (vessels, defaultTracks, vesselTracks) =>
        vesselTracks.filter(track =>
            VesselUtil.isVesselVisible(vessels[track.vesselId]) && defaultTracks[track.vesselId]
        )
);

export const getFilteredVessel = createSelector(getVessels, getVesselFilter, (vessels, filter) => {
    const queryInUppercase = filter.toUpperCase();
    return vessels.filter(vessel => {
        const name = vessel.static ? vessel.static.name : String(vessel.targetId);
        const mmsi = vessel.static ? vessel.static.mmsi : '';
        return (name).toUpperCase().includes(queryInUppercase) || String(mmsi).toUpperCase().includes(queryInUppercase);
    });
});

export const getTrackViewInfoById = createSelector(
    getTracksViewInfo,
    (tracks, id) => tracks[id] ? tracks[id].period : null
);
