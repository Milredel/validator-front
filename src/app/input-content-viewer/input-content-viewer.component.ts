import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationResponseType } from '../types/validation-response.type';
import { MatTableModule } from '@angular/material/table';
import { Utils } from '../common/utils';

@Component({
    selector: 'app-input-content-viewer',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    templateUrl: './input-content-viewer.component.html',
})
export class InputContentViewerComponent {

    @Input() validationResponse: ValidationResponseType = {statusCode: 200};

    data = []
    reasons = {}

    displayedColumns: string[] = ['date', 'label', 'amount']

    dataSource = []

    ngOnChanges(changes: SimpleChanges) {
        if (changes['validationResponse']) {
            const currentValue = changes['validationResponse'].currentValue
            this.data = currentValue.content || []
            this.reasons = currentValue.reasons || {}
            console.log(this.reasons)
            this.dataSource = this.data
        }
    }

    hasErrors = (): boolean => !Utils.isEmpty(this.reasons)

}