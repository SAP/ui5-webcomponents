const styles = new Map();

const registerStyle = (theme, styleName, styleContent) => {
	if (typeof (styleContent) === "string" && styleContent.length) {
		// is inlined string
		if (!styles.has(theme)) {
			styles.set(theme, {});
		}
		styles.get(theme)[styleName] = styleContent;
	}
};

const getStyle = (theme, styleName) => {
	if (!styles.has(theme)) {
		styles.set(theme, {});
	}

	const themeMap = styles.get(theme);

	if (themeMap[styleName]) {
		return themeMap[styleName];
	}
};

const getStyles = (theme, styleNames) => {
	return styleNames.map(styleName => getStyle(theme, styleName));
};

export { registerStyle, getStyles };
