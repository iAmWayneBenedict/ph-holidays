const dotenv = require("dotenv");
dotenv.config();
module.exports = {
	passKey: process.env.PASS_KEY,
	url: process.env.URL,
	port: process.env.PORT,
	mongoDBURI: process.env.mongoDBURI,
};
