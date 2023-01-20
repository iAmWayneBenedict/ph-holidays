const User = require("../model/User");

const loginController = async (email, password) => {
	try {
		return await User.login(email, password);
	} catch (error) {
		throw error;
	}
};

const registerController = async (email, password, confirmPassword) => {
	if (password !== confirmPassword) throw Error("Password not matched!");

	try {
		return await User.signup(email, password);
	} catch (error) {
		throw error;
	}
};

const authControllerRegister = async (email, providers) => {
	try {
		return await User.authRegister(email, providers);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	loginController,
	registerController,
	authControllerRegister,
};
