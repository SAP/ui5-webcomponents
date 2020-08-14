let suffix;

const setCustomElementsScopingSuffix = scope => {
	if (!scope.match(/^[a-zA-Z0-9_-]+$/)) {
		throw new Error("Only alphanumeric characters and dashes allowed for the scoping suffix");
	}

	suffix = scope;
};

const getCustomElementsScopingSuffix = () => {
	return suffix;
};

export {
	setCustomElementsScopingSuffix,
	getCustomElementsScopingSuffix,
};
