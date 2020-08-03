const getStylesString = styles => {
	if (Array.isArray(styles)) {
		return flatten(styles).join(" ");
	}

	return styles;
};

const flatten = arr => {
	return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
};

export default getStylesString;
