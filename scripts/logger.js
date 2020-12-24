/* eslint-disable no-console */
const readline = require('readline');

const chalk = require('chalk');

function clearConsole() {
  if (!process.stdout.isTTY) {
    return;
  }

  const blank = '\n'.repeat(process.stdout.rows);
  console.log(blank);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

function info(...args) {
  clearConsole();

  console.log(`${chalk.bgBlue.black(' INFO ')} ${chalk.white(...args)}`);
}

function done(...args) {
  clearConsole();

  console.log(`${chalk.bgGreen.black(' DONE ')} ${chalk.green(...args)}`);
}

function warn(...args) {
  clearConsole();

  console.log(`${chalk.bgYellow.black(' WARN ')} ${chalk.yellow(...args)}`);
}

function error(...args) {
  clearConsole();

  console.log(`${chalk.bgRed(' ERROR ')} ${chalk.red(...args)}`);
}

module.exports = {
  info,
  done,
  warn,
  error,
  clearConsole,
};
