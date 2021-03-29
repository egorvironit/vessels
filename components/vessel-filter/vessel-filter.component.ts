import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
    selector: 'vessel-filter',
    templateUrl: './vessel-filter.component.html',
    styleUrls: ['./vessel-filter.component.scss']
})
export class VesselFilterComponent implements OnInit, OnDestroy {
    destroy$ = new Subject();

    @Output() filterChanged = new EventEmitter<any>();

    @ViewChild('filter') filterInput: ElementRef;

    constructor() { }

    ngOnInit() {
        fromEvent(this.filterInput.nativeElement, 'input')
            .pipe(
                debounceTime(500),
                takeUntil(this.destroy$)
            )
            .subscribe(({ target }) => this.filterChanged.emit(target.value));
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    onClearFilter() {
        this.filterChanged.emit('');
        this.filterInput.nativeElement.value = '';
    }

}
