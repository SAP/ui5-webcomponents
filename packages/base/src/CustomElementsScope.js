let suffix;

const setCustomElementsScopingSuffix = scope => {
	suffix = scope;
};

const getCustomElementsScopingSuffix = () => {
	return suffix;
};

export {
	setCustomElementsScopingSuffix,
	getCustomElementsScopingSuffix,
};
