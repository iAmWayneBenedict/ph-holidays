const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { encrypt } = require("../controller/cryptoController");

const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "email required"],
		unique: [true, "email already used"],
	},
	password: String,
});

userSchema.statics.signup = async function (email, password) {
	const exists = await this.findOne({ email });

	if (exists) {
		throw Error("Email already used!");
	}

	let salt = await bcrypt.genSalt(10);
	let hash = await bcrypt.hash(password, salt);

	return this.create({ email, password: hash });
};

module.exports = userSchema;
