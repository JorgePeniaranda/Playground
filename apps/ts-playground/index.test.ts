import { main as mainTs } from './index.ts';

describe('main ts', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should print "Hello World!" to the console', () => {
    mainTs();
    expect(consoleSpy).toHaveBeenCalledWith('Hello World!');
  });

  test('should call console.log once', () => {
    mainTs();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
});

describe('main tsx', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should print "Hello World!" to the console', () => {
    mainTsx();
    expect(consoleSpy).toHaveBeenCalledWith('Hello World!');
  });

  test('should call console.log once', () => {
    mainTsx();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
});
