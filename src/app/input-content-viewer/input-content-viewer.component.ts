import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationResponseType } from '../types/validation-response.type';
import { MatTableModule } from '@angular/material/table';
import { Utils } from '../common/utils';
import { Line } from '../types/line.type';
import { Reasons } from '../interfaces/reasons.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-input-content-viewer',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatIconModule],
    templateUrl: './input-content-viewer.component.html',
})
export class InputContentViewerComponent {

    @Input() validationResponse: ValidationResponseType = {statusCode: 200};

    data: Line[] = [] as unknown as Line[]
    reasons: Reasons = {} as unknown as Reasons

    displayedColumns: string[] = ['date', 'label', 'amount']

    dataSource: Line[] = [] as unknown as Line[]

    ngOnChanges(changes: SimpleChanges) {
        if (changes['validationResponse']) {
            const currentValue = changes['validationResponse'].currentValue
            this.data = currentValue.content || []
            this.reasons = currentValue.reasons || {}
            if (this.hasErrors()) this.displayedColumns.push('actions')
            this.dataSource = this.data
        }
    }

    hasErrors = (): boolean => !Utils.isEmpty(this.reasons)

    isDuplicate = (element: Line, type: 'balances' | 'movements'): boolean => {
        const duplicates = this.reasons.duplicates[type]
        if (!duplicates) return false
        return duplicates.filter((line) => Utils.compareObjects(line, element)).length > 0
    }

    deleteLine = (element: Line): void => {
        console.log(element)
    }

}