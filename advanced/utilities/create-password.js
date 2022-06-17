const alphabets = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[];/<>"

const createPassword = (length = 8) => {
    let characters = alphabets + numbers + symbols;
    return generatePassword(length, characters)
};

const generatePassword = (length, characters) => {
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    };
    return password;
};

module.exports = createPassword;