import { ComponentStylesData, StyleData } from "../types.js";

const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers

const getStylesString = (styles: ComponentStylesData) => {
	if (Array.isArray(styles)) {
		return (styles.filter(style => !!style).flat(MAX_DEPTH_INHERITED_CLASSES) as Array<StyleData>).map((style: StyleData) => {
			return typeof style === "string" ? style : style.content;
		}).join(" ");
	}

	return typeof styles === "string" ? styles : styles.content;
};

export default getStylesString;
