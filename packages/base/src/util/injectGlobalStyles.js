import createStyleInHead from "./createStyleInHead.js";

const buildNotDefinedStyles = () => {
	const tags = [
		"button",
		"label",
	];

	return tags.reduce((acc, current) => `${acc}ui5-${current}:not(:defined) { display: none; }\n`, "");
};

const injectGlobalStyles = () => {
	const globalCSS = buildNotDefinedStyles();
	createStyleInHead(globalCSS, { "data-ui5-webcomponents-global-styles": "" });
};

export default injectGlobalStyles;
