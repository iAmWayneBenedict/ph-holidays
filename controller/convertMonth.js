const convertMonthToIndex = (month) => {
	let mon = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	for (let index = 0; index < mon.length; index++) {
		if (month === mon[index]) {
			return index;
		}
	}

	return -1;
};

const convertMonthToName = (month) => {
	let mon = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	for (let index = 0; index < mon.length; index++) {
		if (month === index) {
			return mon[index];
		}
	}

	return -1;
};

module.exports = {
	convertMonthToIndex,
	convertMonthToName,
};
