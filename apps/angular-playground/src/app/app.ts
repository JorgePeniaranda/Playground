import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { greet } from '@playground/utils';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected name = 'World';

  protected get message(): string {
    return greet(this.normalizeName(this.name));
  }

  protected onNameChange(value: string): void {
    this.name = this.normalizeName(value);
  }

  private normalizeName(value: string): string {
    const normalizedValue = value.trim();

    return normalizedValue || 'World';
  }
}
