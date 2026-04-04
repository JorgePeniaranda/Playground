import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import App from './App';

describe('App', () => {
  test('renders the shared greeting', () => {
    render(<App />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hello, World!' })).toBeInTheDocument();
    expect(screen.getByText(/reuses the shared/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('autocomplete', 'name');
  });

  test('updates the greeting when the name changes', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Playground' } });

    expect(screen.getByRole('heading', { name: 'Hello, Playground!' })).toBeInTheDocument();
  });

  test('falls back to World when the input is blank', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: '   ' } });

    expect(screen.getByRole('heading', { name: 'Hello, World!' })).toBeInTheDocument();
  });
});
