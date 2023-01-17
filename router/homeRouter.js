const home = (req, res) => {
	res.render("main");
};

const pricing = (req, res) => {
	res.render("pricing");
};

module.exports = {
	home,
	pricing,
};
