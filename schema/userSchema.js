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

userSchema.statics.login = async function (email, password) {
	if (password.length < 8) throw Error("Password must be at least 8 characters");

	if (!validator.isEmail(email)) throw Error("Email is not valid");

	let user = await this.findOne({ email });

	if (!user) throw Error("Incorrect email or password");

	let isMatched = await bcrypt.compare(password, user.password);

	if (!isMatched) throw Error("Incorrect email or password");

	return user;
};

userSchema.statics.auth = async function (email, provider) {
	let user = await this.findOne({ email });

	if (!user) {
		return this.create({
			email,
			password: " ",
			providers: [provider],
		});
	}
	if (!user.providers[provider]) {
		return this.findOneAndUpdate(
			{ email },
			{
				$addToSet: {
					providers: provider,
				},
			},
			{
				new: true,
				upsert: true,
			}
		);
	}

	return user;
};

module.exports = userSchema;
