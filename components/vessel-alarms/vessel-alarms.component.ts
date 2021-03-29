import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Alarm } from '@alarms/model';

@Component({
    selector: 'vessel-alarms',
    templateUrl: './vessel-alarms.component.html',
    styleUrls: ['./vessel-alarms.component.scss']
})
export class VesselAlarmsComponent {

    @Input() alarms$: Observable<Alarm[]>;

    constructor() {
    }

}
