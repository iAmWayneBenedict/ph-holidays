const User = require("../model/User");

const loginController = () => {};

const registerController = async (email, password, confirmPassword) => {
	if (password !== confirmPassword) throw Error("Password not matched!");

	try {
		return await User.signup(email, password);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	loginController,
	registerController,
};
