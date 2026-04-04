import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { createGreetingMessage, normalizeName } from './app.controller';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected name = 'World';

  protected get message(): string {
    return createGreetingMessage(this.name);
  }

  protected onNameChange(value: string): void {
    this.name = normalizeName(value);
  }
}
