const User = require("../model/User");

const loginController = () => {};

const registerController = async (email, password) => {
	try {
		const user = await User.signup(email, password);
		return user;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	loginController,
	registerController,
};
