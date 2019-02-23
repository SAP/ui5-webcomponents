const customCSSMap = new Map();

const addCustomCSS = (tag, theme, css) => {
	let themeCustomCSS = customCSSMap.get(theme);

	if (!themeCustomCSS) {
		customCSSMap.set(theme, {});
		themeCustomCSS = customCSSMap.get(theme);
	}

	if (!themeCustomCSS[tag]) {
		themeCustomCSS[tag] = [];
	}

	themeCustomCSS[tag].push(css);
};

const getCustomCSS = (theme, tag) => {
	const themeCustomCSS = customCSSMap.get(theme);
	return themeCustomCSS && themeCustomCSS[tag] ? themeCustomCSS[tag].join("") : "";
};

export { addCustomCSS, getCustomCSS };
