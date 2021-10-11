/**
 * @file            AppLogger.ts
 * @author          Niiju
 * @description     Logger module
 */


/* ------------------------------------------------------------------------- */
/*                             Global variables                              */
/* ------------------------------------------------------------------------- */

const formating = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',

    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',

    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m'
};

/* ------------------------------------------------------------------------- */
/*                                 Functions                                 */
/* ------------------------------------------------------------------------- */

const log = (content: any, type: string = 'log') => {
    const date = new Date();
    const timestamp = `[${date.toLocaleDateString()} ${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}:${`0${date.getSeconds()}`.slice(-2)}]`;
    let startFormating = '';

    switch (type) {
        case 'log':
            break;
        case 'error':
            startFormating = formating.BgRed;
            break;
        case 'warn':
            startFormating = formating.FgBlack + formating.BgYellow;
            break;
        case 'debug':
            startFormating = formating.FgCyan;
            break;
        case 'ready':
            startFormating = formating.FgGreen;
            break;
    }

    console.log(`${timestamp} ${startFormating}${content}${formating.Reset}`);
};

const error = (content: any) => log(content, 'error');
const warn = (content: any) => log(content, 'warn');
const debug = (content: any) => log(content, 'debug');
const ready = (content: any) => log(content, 'ready');

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export { log, error, warn, debug, ready };
