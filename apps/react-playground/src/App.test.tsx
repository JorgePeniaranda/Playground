import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import App from './App';

describe('App', () => {
  test('renders the shared greeting', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Hello, World!' })).toBeDefined();
    expect(screen.getByText(/reuses the shared/i)).toBeDefined();
  });

  test('updates the greeting when the name changes', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Playground' } });

    expect(screen.getByRole('heading', { name: 'Hello, Playground!' })).toBeDefined();
  });
});
