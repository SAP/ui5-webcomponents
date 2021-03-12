const escapeReg = /[[\]{}()*+?.\\^$|]/g;

const escapeRegExp = str => {
	return str.replace(escapeReg, "\\$&");
};

const StartsWith = (value, items) => {
	return items.filter(item => {
		const lowerText = item.text.toLowerCase();

		return lowerText.startsWith(value.toLowerCase());
	});
};

const StartsWithPerTerm = (value, items) => {
	const reg = new RegExp(`(^|\\s)${escapeRegExp(value.toLowerCase())}.*`, "g");

	return items.filter(item => {
		reg.lastIndex = 0;

		return reg.test(item.text.toLowerCase());
	});
};

const Contains = (value, items) => {
	return items.filter(item => {
		const lowerText = item.text.toLowerCase();

		return lowerText.includes(value.toLowerCase());
	});
};

const None = (_, items) => items;

export {
	StartsWithPerTerm,
	StartsWith,
	Contains,
	None,
};
