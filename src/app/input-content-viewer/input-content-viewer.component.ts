import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationResponseType } from '../types/validation-response.type';
import { MatTableModule } from '@angular/material/table';
import { Utils } from '../common/utils';
import { Line } from '../types/line.type';
import { Reasons } from '../interfaces/reasons.interface';
import { MatIconModule } from '@angular/material/icon';
import { DataSource } from '@angular/cdk/collections';
import { ReplaySubject, Observable } from 'rxjs';
import { Balance } from '../interfaces/balance.interface';
import { BalanceError } from '../interfaces/balance-error.interface';
import { ValidationData } from '../interfaces/validation-data.interface';
import { Movement } from '../interfaces/movement.interface';

@Component({
    selector: 'app-input-content-viewer',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatIconModule],
    templateUrl: './input-content-viewer.component.html',
})
export class InputContentViewerComponent {

    @Input() validationResponse: ValidationResponseType = {statusCode: 200};
    @Output() onValidationDataChanged = new EventEmitter<ValidationData>();

    data: Line[] = [] as unknown as Line[]
    reasons: Reasons = {} as unknown as Reasons

    displayedColumns: string[] = ['date', 'label', 'amount']

    dataSource = new LineDataSource(this.data);

    ngOnChanges(changes: SimpleChanges) {
        if (changes['validationResponse']) {
            const currentValue = changes['validationResponse'].currentValue
            this.data = currentValue.content || []
            this.reasons = currentValue.reasons || {}
            if (this.hasErrors()) this.displayedColumns.push('actions')
            this.dataSource.setData(this.data)
        }
    }

    hasErrors = (): boolean => !Utils.isEmpty(this.reasons)

    isDuplicate = (element: Line, type: 'balances' | 'movements'): boolean => 
        !this.reasons.duplicates[type] ? false : this.reasons.duplicates[type].filter((line) => Utils.compareObjects(line, element)).length > 0

    deleteLineAtIndex = (index: number): void => {
        this.data.splice(index, 1);
        this.dataSource.setData(this.data);
        this.forceRevalidation()
    }

    isBalanceWrong = (element: Line): boolean =>
        !this.reasons.balances ? false : this.reasons.balances.filter((line) => line.end.date === element.date).length > 0

    correctBalanceAtIndex = (index: number): void => {
        const balanceError = this.getBalanceErrorFromLineIndex(index)
        if (balanceError) {
            (this.data[index] as Balance).balance = balanceError.diff.computed;
            this.dataSource.setData(this.data);
            this.forceRevalidation()
        }
    }

    getCorrectBalance = (index: number): number => {
        const currentBalance = this.data[index] as Balance;
        const balanceError = this.getBalanceErrorFromLineIndex(index)
        return balanceError ? balanceError.diff.computed : currentBalance.balance
    }

    getBalanceErrorFromLineIndex = (index: number): BalanceError | undefined => {
        const currentBalance = this.data[index] as Balance;
        return this.reasons.balances.find((line) => line.end.date === currentBalance.date);
    }

    forceRevalidation = (): void => {
        this.onValidationDataChanged.emit(this.transformDataToValidationData())
    }

    transformDataToValidationData = (): ValidationData => {
        return this.data.reduce((acc, line) => {
            if (line.hasOwnProperty('balance')) {
                acc.balances.push(line as Balance)
            } else {
                acc.movements.push(line as Movement)
            }
            return acc
        }, {movements: [], balances: []} as ValidationData)
    }

}

class LineDataSource extends DataSource<Line> {
    private _dataStream = new ReplaySubject<Line[]>();

    constructor(initialData: Line[]) {
        super();
        this.setData(initialData);
    }

    connect(): Observable<Line[]> {
        return this._dataStream;
    }

    disconnect() {}

    setData(data: Line[]) {
        this._dataStream.next(data);
    }
}
