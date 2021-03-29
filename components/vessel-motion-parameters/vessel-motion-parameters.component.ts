import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { VesselDynamicData } from '@vessels/models';

@Component({
    selector: 'vessel-motion-parameters',
    templateUrl: './vessel-motion-parameters.component.html',
    styleUrls: ['./vessel-motion-parameters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselMotionParametersComponent {
    @Input() data: VesselDynamicData;
    @Input() isCompactView = false;

}
