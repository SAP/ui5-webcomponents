type StyleData = string | { content: string};

const getStylesString = (styles: Array<StyleData> | StyleData) => {
	if (Array.isArray(styles)) {
		return flatten(styles.filter(style => !!style)).map((style: StyleData) => {
			return typeof style === "string" ? style : style.content;
		}).join(" ");
	}

	return typeof styles === "string" ? styles : styles.content;
};

const flatten = (arr: Array<any>): Array<any> => {
	return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
};

export default getStylesString;
