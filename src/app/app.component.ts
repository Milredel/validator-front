import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InputChoiceComponent } from "./input-choice/input-choice.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, MatSlideToggleModule, InputChoiceComponent]
})
export class AppComponent {
    title = 'ValidatoR';
    serverFileName = '';

    onServerFileNameReceived(fileName: string): void {
        this.serverFileName = fileName;
    }
}
