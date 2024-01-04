import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationResponseType } from '../types/validation-response.type';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-input-content-viewer',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    templateUrl: './input-content-viewer.component.html',
})
export class InputContentViewerComponent {

    @Input() validationResponse: ValidationResponseType = {statusCode: 200};

    data = []
    reasons = []

    displayedColumns: string[] = ['date']

    dataSource = []

    ngOnChanges(changes: SimpleChanges) {
        if (changes['validationResponse']) {
            const currentValue = changes['validationResponse'].currentValue
            this.data = currentValue.content || []
            this.reasons = currentValue.reasons || []
            this.dataSource = this.data
        }
    }
}