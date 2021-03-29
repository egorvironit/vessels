import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'vessel-popup-header',
    templateUrl: './vessel-popup-header.component.html',
    styleUrls: ['./vessel-popup-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselPopupHeaderComponent {

    @Input() headerName: string;

    @Output() clickDetailsIcon = new EventEmitter();

    goToDetailsPage() {
        this.clickDetailsIcon.emit();
    }

}
