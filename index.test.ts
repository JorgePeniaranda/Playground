import { main } from './index';

describe('main', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should print "Hello World!" to the console', () => {
    main();
    expect(consoleSpy).toHaveBeenCalledWith('Hello World!');
  });

  test('should call console.log once', () => {
    main();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
});
