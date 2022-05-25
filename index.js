#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
const clipboardy = require("clipboardy");

const createPassword = require("./utilities/create-password");
const savePassword = require("./utilities/save-password");

commander.version("1.0.0").description("Simple Password Generator!");

commander
    .option("-l, --length <number>", "Length of password", "8")
    .option("-s, --save", "Save password to password.txt")
    .option("-nn, --no-numbers", "Remove numbers")
    .option("-ns, --no-symbols", "Remove symbols")
    .option("-fw, --for-what <string>", "What will the password be used for", "")
    .parse();

const { length, save, numbers, symbols, forWhat } = commander.opts();

const generatedPassword = createPassword(length, numbers, symbols);

if (save && forWhat) savePassword(generatedPassword, forWhat)
else console.log(chalk.red("To save a password, you must mention what it will be used for!"));

clipboardy.writeSync(generatedPassword);

console.log(chalk.blue("Generated Password: ") + chalk.bold(generatedPassword));
console.log(chalk.yellow("Password copied to clipboard!"));