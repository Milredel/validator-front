import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackEndService } from '../services/backend.service';

@Component({
    selector: 'app-input-content-container',
    standalone: true,
    imports: [CommonModule],
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

    constructor(private backEndService: BackEndService) {}

    ngAfterViewInit() {
        if (this._fileName) {
            this.backEndService.postValidationByFile(this._fileName).subscribe(data => {
                console.log(data)
            });
        }
    }

}
