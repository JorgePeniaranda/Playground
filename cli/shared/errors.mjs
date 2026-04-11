// @ts-check

/**
 * @param {unknown} error
 * @returns {string}
 */
export function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

/**
 * @param {unknown} error
 * @param {{ stderr?: NodeJS.WritableStream, prefix?: string }} [options]
 * @returns {void}
 */
export function reportError(error, options = {}) {
  const { stderr = process.stderr, prefix = '' } = options;
  stderr.write(`${prefix}${getErrorMessage(error)}\n`);
}

/**
 * @param {unknown} error
 * @param {{ stderr?: NodeJS.WritableStream, exitCode?: number, prefix?: string }} [options]
 * @returns {void}
 */
export function failWithError(error, options = {}) {
  const { exitCode = 1, ...reportOptions } = options;
  reportError(error, reportOptions);
  process.exitCode = exitCode;
}
