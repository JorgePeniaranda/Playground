// @ts-check

/**
 * Converts an unknown error value into a user-facing message.
 * @param {unknown} error The thrown value to normalize.
 * @returns {string} The best available error message.
 */
export function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Writes an error message to the configured error stream.
 * @param {unknown} error The thrown value to report.
 * @param {{ stderr?: import('node:stream').Writable, prefix?: string }} [options] Optional output settings for the error report.
 * @returns {void}
 */
export function reportError(error, options = {}) {
  const { stderr = process.stderr, prefix = '' } = options;
  stderr.write(`${prefix}${getErrorMessage(error)}\n`);
}

/**
 * Reports an error and updates the process exit code.
 * @param {unknown} error The thrown value to report.
 * @param {{ stderr?: import('node:stream').Writable, exitCode?: number, prefix?: string }} [options] Optional reporting and exit settings.
 * @returns {void}
 */
export function failWithError(error, options = {}) {
  const { exitCode = 1, ...reportOptions } = options;
  reportError(error, reportOptions);
  process.exitCode = exitCode;
}
