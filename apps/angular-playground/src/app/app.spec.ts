import { TestBed } from '@angular/core/testing';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render the shared greeting and form semantics', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('main')).not.toBeNull();
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, World!');
    expect(compiled.querySelector('input[name="name"]')?.getAttribute('autocomplete')).toBe('name');
  });

  it('should update the greeting when the name changes', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector<HTMLInputElement>('#name');

    expect(input).not.toBeNull();

    if (input) {
      input.value = 'Playground';
      input.dispatchEvent(new Event('input'));
    }
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Playground!');
  });

  it('should fall back to World when the name is blank', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector<HTMLInputElement>('#name');

    expect(input).not.toBeNull();

    if (input) {
      input.value = '   ';
      input.dispatchEvent(new Event('input'));
    }
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, World!');
  });
});
