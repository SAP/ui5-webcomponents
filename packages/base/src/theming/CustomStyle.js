const customCSSFor = {};

const addCustomCSS = (tag, css, ...rest) => {
	if (rest.length) {
		throw new Error("addCustomCSS no longer accepts theme specific CSS. new signature is `addCustomCSS(tag, css)`");
	}

	if (!customCSSFor[tag]) {
		customCSSFor[tag] = [];
	}

	customCSSFor[tag].push(css);
};

const getCustomCSS = tag => {
	return customCSSFor[tag] ? customCSSFor[tag].join("") : "";
};

export { addCustomCSS, getCustomCSS };
