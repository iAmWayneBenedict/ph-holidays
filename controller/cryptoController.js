const {passKey} = require("../config");
const CryptoJS = require("crypto-js");

const encrypt = (string) => CryptoJS.AES.encrypt(string, passKey).toString()

const decrypt = (string) => CryptoJS.AES.decrypt(string, passKey).toString(CryptoJS.enc.Utf8)

module.exports = {
    encrypt, decrypt
}