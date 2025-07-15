import { main } from './index';

describe('main', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    // Espiar en console.log antes de cada prueba
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    // Restaurar console.log después de cada prueba
    consoleSpy.mockRestore();
  });

  test('should print "Hello World" to the console', () => {
    main();
    expect(consoleSpy).toHaveBeenCalledWith('¡Hola Mundo!');
  });

  test('should call console.log once', () => {
    main();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
});
