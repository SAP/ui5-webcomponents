let externalThemePresent = false;

const setExternalThemePresent = value => {
	externalThemePresent = value;
};

const getExternalThemePresent = () => externalThemePresent;

export {
	getExternalThemePresent,
	setExternalThemePresent,
};
