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
	providers: {
		type: [String],
	},
	verified: {
		type: Boolean,
	},
});

userSchema.statics.signup = async function (email, password) {
	const user = await this.findOne({ email });

	if (user && user?.verified) throw Error("Email already used!");

	if (password.length < 8) throw Error("Password must be at least 8 characters");

	if (!validator.isEmail(email)) throw Error("Email is not valid");

	let salt = await bcrypt.genSalt(10);
	let hash = await bcrypt.hash(password, salt);

	if (!user?.verified && user)
		return this.findOneAndUpdate({ email }, { password: hash, verified: false });

	return this.create({ email, password: hash, verified: false });
};

userSchema.statics.login = async function (email, password) {
	if (password.length < 8) throw Error("Password must be at least 8 characters");

	if (!validator.isEmail(email)) throw Error("Email is not valid");

	let user = await this.findOne({ email, verified: true });

	if (!user) throw Error("Incorrect email or password");

	let isMatched = await bcrypt.compare(password, user.password);

	if (!isMatched) throw Error("Incorrect email or password");

	return user;
};

userSchema.statics.authRegister = async function (email, providers) {
	let user = await this.findOne({ email });

	if (!user) {
		return this.create({
			email,
			password: " ",
			providers: providers,
			verified: true,
		});
	}

	return this.findOneAndUpdate({ email }, { providers, verified: true });
};

userSchema.statics.authLogin = async function (email, providers) {
	let user = await this.findOne({ email });

	if (!user) throw Error("User not registered");

	if (user.providers.join() != providers.join()) throw Error("Account not registered");

	return user;
};

module.exports = userSchema;
