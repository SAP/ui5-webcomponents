import type { ComponentStylesData } from "../types.js";

const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers

const getStylesString = (styles: ComponentStylesData) => {
	if (Array.isArray(styles)) {
		return (styles.filter(style => !!style).flat(MAX_DEPTH_INHERITED_CLASSES) as Array<string>).join(" ");
	}

	return styles;
};

export default getStylesString;
