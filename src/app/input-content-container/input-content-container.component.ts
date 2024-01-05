import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackEndService } from '../services/backend.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InputContentViewerComponent } from '../input-content-viewer/input-content-viewer.component';
import { ValidationData } from '../interfaces/validation-data.interface';

@Component({
    selector: 'app-input-content-container',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, InputContentViewerComponent],
    templateUrl: './input-content-container.component.html',
})
export class InputContentContainerComponent {

    private _fileName: string = '';
    
    @Input() set fileName(value: string) {
       this._fileName = value;
    }
    
    get fileName(): string {
        return this._fileName;
    }

    isLoading = true;
    validationResponse = {statusCode: 200};

    isFromRevalidation = false;

    constructor(private backEndService: BackEndService) {}

    ngAfterViewInit() {
        if (this._fileName) {
            this.backEndService.postValidationByFile(this._fileName).subscribe(data => {
                this.isLoading = false;
                this.validationResponse = data;
            });
        }
    }

    onValidationDataChanged = (newValidationData: ValidationData): void => {
        this.isLoading = true;
        this.validationResponse = {statusCode: 200};
        this.backEndService.postValidation(newValidationData).subscribe(data => {
            this.isLoading = false;
            this.validationResponse = data;
            this.isFromRevalidation = true;
        });
    }

}
