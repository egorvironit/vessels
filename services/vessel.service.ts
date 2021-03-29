import { environment } from '@environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoadVesselsResponse, VesselTrack, LoadStaticDataResponse, LoadDynamicDataResponse } from '../models';
import { VesselUtil } from '@vessels/utils';
import { VesselTrackPoint } from '@vessels/models/vessel-track-point.model';

@Injectable()
export class VesselService {

    constructor(private httpClient: HttpClient) { }

    loadVessels(timestamp?: number): Observable<LoadVesselsResponse> {
        return combineLatest(
            this.loadStaticData(timestamp),
            this.loadDynamicData()
        ).pipe(
            map(([staticData, dynamicData]) => ({
                staticDataTimestamp: staticData.timestamp,
                dynamicDataTimestamp: dynamicData.timestamp,
                vessels: VesselUtil.mergeVesselData(staticData, dynamicData)
            }))
        );
    }

    private loadStaticData(timestamp?: number): Observable<LoadStaticDataResponse> {
        return this.httpClient
            .get<LoadStaticDataResponse>(`${environment.api.endpoint}/targets/static${timestamp ? '/' + timestamp : ''}`);
    }

    private loadDynamicData(): Observable<LoadDynamicDataResponse> {
        return this.httpClient.get<LoadDynamicDataResponse>(`${environment.api.endpoint}/targets/dynamic`);
    }

    loadVesselTrack(vesselId: number): Observable<VesselTrack> {
        const requestUrl = `${environment.api.endpoint}/target/track/${vesselId}`;
        return this.httpClient.get<VesselTrackPoint[]>(requestUrl).pipe(
            map((vesselTrackPoints: VesselTrackPoint[]) => ({ vesselId, vesselTrackPoints }))
        );
    }

    getTracks(trackIds: number[]): Observable<VesselTrack[]> {
        const tracks$ = trackIds.map(id => this.loadVesselTrack(id));
        return combineLatest(tracks$);
    }

}
