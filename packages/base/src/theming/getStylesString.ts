import { StyleData } from "../index.js";

const getStylesString = (styles: Array<StyleData> | StyleData) => {
	if (Array.isArray(styles)) {
		return styles.filter(style => !!style).flatMap((style: StyleData) => {
			return typeof style === "string" ? style : style.content;
		}).join(" ");
	}

	return typeof styles === "string" ? styles : styles.content;
};

export default getStylesString;
