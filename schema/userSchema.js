const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { encrypt } = require("../controller/cryptoController");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "email required"],
		unique: [true, "email already used"],
	},
	password: {
		type: String,
		required: [true, "password is required"],
	},
});

userSchema.statics.signup = async function (email, password) {
	const exists = await this.findOne({ email });

	if (exists) throw Error("Email already used!");

	if (password.length < 8) throw Error("Password must be at least 8 characters");

	if (!validator.isEmail(email)) throw Error("Email is not valid");

	let salt = await bcrypt.genSalt(10);
	let hash = await bcrypt.hash(password, salt);

	return this.create({ email, password: hash });
};

module.exports = userSchema;
