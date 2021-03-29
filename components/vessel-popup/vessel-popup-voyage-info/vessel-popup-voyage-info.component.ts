import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { VesselStaticData } from '@vessels/models/vessel-static-data.model';

@Component({
    selector: 'vessel-popup-voyage-info',
    templateUrl: './vessel-popup-voyage-info.component.html',
    styleUrls: ['./vessel-popup-voyage-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselPopupVoyageInfoComponent {
    @Input() data: VesselStaticData;
}
