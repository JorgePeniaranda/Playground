import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';

import App from './App';

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders Hello World heading', () => {
    render(<App />);
    expect(screen.getByText('Hello World!')).toBeDefined();
  });
});
