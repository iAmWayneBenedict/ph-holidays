const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
require("dotenv").config();

const createToken = (_id) => jwt.sign({ _id }, process.env.PASS_KEY, { expiresIn: "1w" });

const hash = (str) => CryptoJS.AES.encrypt(str, process.env.PASS_KEY).toString();

module.exports = {
	createToken,
	hash,
};
