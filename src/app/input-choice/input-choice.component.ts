import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BackEndService } from '../services/backend.service';

@Component({
    selector: 'app-input-choice',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './input-choice.component.html',
    styleUrl: './input-choice.component.scss',
})
export class InputChoiceComponent {
    fileName: string = '';
    serverFileName: string = '';
    @Input() requiredFileType = 'application/JSON';
    @Output() onServerFileNameReceived = new EventEmitter<any>();

    constructor(private backEndService: BackEndService) {}

    onInputClick = (event: MouseEvent) => { // little hack because onChange doesn't fire when selecting same file again
        const element = event.target as HTMLInputElement
        element.value = ''
    }

    onFileSelected(event: any): void {
        const file:File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("file", file);
            this.backEndService.postFile(formData).subscribe(data => {
                const { fileName } = data
                this.serverFileName = fileName || ''
                this.onServerFileNameReceived.emit(this.serverFileName)
            });
        }
    }

    reset(): void {
        this.fileName = ''
        this.serverFileName = ''
        this.onServerFileNameReceived.emit(this.serverFileName)
    }
}
  