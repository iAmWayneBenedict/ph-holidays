const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.PASS_KEY, { expiresIn: "1w" });
};

module.exports = {
	createToken,
};
