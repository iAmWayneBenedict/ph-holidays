const { getUserById } = require("../controller/userController");
const { getTokenData } = require("../utils/decode");

const getCurrentUser = async (req, res) => {
	const currentUserJWT = getTokenData(req.params.jwt);
	const user = await getUserById(currentUserJWT._id);

	res.status(200).json({
		msg: "Successfully Signed in",
		code: 200,
		user,
	});
};

module.exports = {
	getCurrentUser,
};
