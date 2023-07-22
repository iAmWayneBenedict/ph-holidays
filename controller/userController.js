const { default: jwtDecode } = require("jwt-decode");
const User = require("../model/User");

const getUserById = (_id) => {
	const user = User.findById({ _id });

	return user;
};

module.exports = {
	getUserById,
};
