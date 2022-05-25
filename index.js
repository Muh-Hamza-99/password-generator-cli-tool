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
    .parse();

const { length, save, numbers, symbols } = commander.opts();

const generatedPassword = createPassword(length, numbers, symbols);

if (save) savePassword(generatedPassword);

clipboardy.writeSync(generatedPassword);

console.log(chalk.blue("Generated Password: ") + chalk.bold(generatedPassword));
console.log(chalk.yellow("Password copied to clipboard!"));