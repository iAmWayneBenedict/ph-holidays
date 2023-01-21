const { default: jwtDecode } = require("jwt-decode");
const CryptoJS = require("crypto-js");

const getTokenData = (token) => jwtDecode(token);

const unHash = (str) => CryptoJS.AES.decrypt(str, process.env.PASS_KEY).toString(CryptoJS.enc.Utf8);

module.exports = { getTokenData, unHash };
