import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Alarm } from '@alarms/model';

@Component({
    selector: 'vessel-popup-alarm',
    templateUrl: './vessel-popup-alarm.component.html',
    styleUrls: ['./vessel-popup-alarm.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselPopupAlarmComponent {
    @Input() alarms$: Observable<Alarm[]>;
}
