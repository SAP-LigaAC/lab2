import {setLoggingLevel, setRequestLogLevel, setLogPattern, isLoggingLevel, logMessage, logNetwork as _logNetwork} from 'cf-nodejs-logging-support';
import {LOG_LEVEL_DEFAULT, LOG_MODE_HUMAN} from './constants.js';

// log level is one of [error, warn, info, debug]
const LOG_LEVEL = process.env.LOG_LEVEL || LOG_LEVEL_DEFAULT;
// log mode is either configured to be [human]-readable or [undefined] for kibana
const LOG_MODE = process.env.LOG_MODE;

/**
 * Should be called once during server bootstrapping
 */
function _setupLogging() {
    setLoggingLevel(LOG_LEVEL);
    setRequestLogLevel(LOG_LEVEL);

    if (LOG_MODE === LOG_MODE_HUMAN) {
        // we can also include [{{written_at}}] to see the time of the log
        setLogPattern('[CF-LOG] [{{level}}] {{msg}}');
        _loggers.debug('set log to human readable format');
    }
    _loggers.debug(`set log level to ${LOG_LEVEL}`);
}


/**
 * Logs a message while considering the configured log level
 * @param level the level on which the given message should be logged
 * @param message the message to log
 */
function _logMessage(level, message) {
    if (isLoggingLevel(level)) {
        logMessage(level, message);
    }
}

/**
 * Convenience methods for logging
 */
const _loggers = {
    message: _logMessage,
    error: message => _logMessage('error', message),
    warn: message => _logMessage('warn', message),
    info: message => _logMessage('info', message),
    debug: message => _logMessage('debug', message)
};

export const setupLogging = _setupLogging;
export const log = _loggers;
export const logNetwork = _logNetwork;
