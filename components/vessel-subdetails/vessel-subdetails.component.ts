import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'vessel-subdetails',
    templateUrl: './vessel-subdetails.component.html',
    styleUrls: ['./vessel-subdetails.component.scss']
})
export class VesselSubdetailsComponent implements OnInit {

    @Input() title: string;
    @Input() isHeaderVisible = true;

    constructor() { }

    ngOnInit() { }

}
