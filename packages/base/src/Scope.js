let suffix;

const setScope = scope => {
	suffix = scope;
};

const getScope = () => {
	return suffix;
};

export {
	setScope,
	getScope,
};
