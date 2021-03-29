import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Vessel } from '@vessels/models';

@Component({
    selector: 'vessel-general-info',
    templateUrl: './vessel-general-info.component.html',
    styleUrls: ['./vessel-general-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselGeneralInfoComponent {

    @Input() vessel: Vessel;

    constructor() { }

}
