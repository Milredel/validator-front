import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

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

    constructor(private http: HttpClient) {}

    onFileSelected(event: any): void {
        const file:File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("file", file);
            this.http.post<{fileName: string}>("http://localhost:3000/file", formData).subscribe(data => {
                const { fileName } = data
                this.serverFileName = fileName || ''
                this.onServerFileNameReceived.emit(this.serverFileName)
        }   );
        }
    }

    reset(): void {
        this.fileName = ''
        this.serverFileName = ''
        this.onServerFileNameReceived.emit(this.serverFileName)
    }
}
  