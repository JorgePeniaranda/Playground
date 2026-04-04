import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { main } from './index';

describe('main ts', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should print "Hello World!" to the console', () => {
    main();
    expect(consoleSpy).toHaveBeenCalledWith('Hello World!');
  });

  it('should call console.log once', () => {
    main();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
});
