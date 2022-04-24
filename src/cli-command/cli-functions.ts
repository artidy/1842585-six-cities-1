import chalk from 'chalk';

const printHeader = chalk.bold.bgBlackBright.hex('#008080');

const printCommand = chalk.blue;

const printError = chalk.bold.red;

const printInfo = chalk.yellow.bgGray;

const printSuccess = chalk.green.bgWhite;

export {printHeader, printCommand, printError, printInfo, printSuccess};
