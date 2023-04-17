import { Component, Input, OnInit, } from '@angular/core';

@Component({
    selector: 'app-property-card',
    templateUrl: './property-card.component.html',
    styleUrls: ['./property-card.component.scss', '../user-properties/user-properties.component.scss']
})
export class PropertyCardComponent {
    @Input() property: any;
    currentIndx = 0;

    goToPrev() {
        if (this.currentIndx === 0) {
            return;
        }
        this.currentIndx--;
    }

    goToNext() {
        if (this.currentIndx === this.property?.urls.length - 1) {
            this.currentIndx = 0;
            return;
        }
        this.currentIndx++;
    }


}