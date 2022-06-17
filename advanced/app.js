require("dotenv").config({ path: "./config.env" });

const commander = require("commander");
const chalk = require("chalk");
const clipboardy = require("clipboardy");

const createPassword = require("./utilities/create-password");
const savePassword = require("./utilities/save-password");
const decryptPasswords = require("./utilities/decrypt-passwords");
const sendEmail = require("./utilities/send-email")

commander.version("1.0.0").description("Simple Password Management Tool");

commander
    .option("-s, --save", "Save password to password.txt.")
    .option("-p, --password <string>", "Type your password.")
    .option("-l, --length <number>", "Length of password.", "8")
    .option("-ag, --autogenerate", "Autogenerate the password.")
    .option("-fw, --for-what <string>", "State what the password will be for.")
    .option("-d, --decrypt", "Decrypt passwords in passwords.txt.")
    .option("-t, --token <string>", "Secret token for decrypt passwords.")
    .option("-se, --email", "Send secret token for decrypting passwords to your email.")
    .parse();

const { length, save, password, autogenerate, forWhat, decrypt, token, email } = commander.opts();

if (password && autogenerate) console.log(chalk.red("Choose one! Either enter your own password or let us auto generate a strong password!"));
else {
    if (password && save) {
        if (!forWhat) console.log(chalk.blue("You must mention what the password is for."));
        else savePassword(password, forWhat);
    } else if (autogenerate) {
        const generatedPassword = createPassword(length);
        if (save && forWhat) savePassword(generatedPassword, forWhat);
        else console.log(chalk.blue("You must mention what the password is for."));
        clipboardy.writeSync(generatedPassword);
        console.log(chalk.blackBright("Password copied to clipboard!"));
        console.log(chalk.magenta(`Here is your autogenerated password: ${chalk.bold(generatedPassword)}`));
    };
};

if (decrypt) {
    if (!token) console.log(chalk.red("Please enter the secret token that is sent to you via email!"));
    else {
        if (token === process.env.SECRET_KEY) {
            decryptPasswords()
                .then(passwords => Object.entries(passwords).forEach(([ key, value ]) => console.log(chalk.cyan(`${key}: ${value}`))))
                .catch(error => console.log("Error in parsing passwords!"));
        } else console.log(chalk.yellow("Invalid token!"));
    };
};

if (email) {
    sendEmail()
        .then(() => console.log(chalk.green("Token has been sent to your inbox!")))
        .catch(error => console.log("Error in sending email!"))
};