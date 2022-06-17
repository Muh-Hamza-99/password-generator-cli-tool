const fs = require("fs");
const path = require("path")
const crypto = require("crypto");
const readline = require("readline");

const chalk = require("chalk");

const algorithm = "aes-256-ctr";

const decryptPasswords = async () => {
    const passwords = {}
    const pathToFile = path.join(__dirname, "../", "passwords.txt")
    if (!fs.existsSync(pathToFile)) console.log(chalk.redBright("Passwords.txt doesn't exist."));
    const fileStream = fs.createReadStream(pathToFile);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    for await (const line of rl) {
        const [ content, iv ] = line.split(": ")[1].split("|");  
        const decipher = crypto.createDecipheriv(algorithm, process.env.SECRET_KEY, Buffer.from(iv, "hex"));
        const decrypted = Buffer.concat([decipher.update(Buffer.from(content, "hex")), decipher.final()]);
        passwords[line.split(": ")[0]] = decrypted.toString();
    };
    return passwords;
};

module.exports = decryptPasswords;