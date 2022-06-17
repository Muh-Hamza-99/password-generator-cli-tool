const fs = require("fs");
const path = require("path");
const os = require("os");

const chalk = require("chalk");

const encryptPassword = require("./encrypt-password");

const savePassword = (password, forWhat) => {
    const encryptedPassword = encryptPassword(password);
    fs.open(path.join(__dirname, "../", "passwords.txt"), "a", 666, (event, id) => {
        fs.write(id, forWhat + ": " + encryptedPassword.content + "|" + encryptedPassword.iv  + os.EOL, null, "utf-8", () => {
            fs.close(id, () => {
                console.log(chalk.green("Password saved to password.txt!"));
            });
        });
    });
};

module.exports = savePassword;