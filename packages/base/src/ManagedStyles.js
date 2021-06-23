import getSharedResource from "./getSharedResource.js";
import createStyleInHead from "./util/createStyleInHead.js";
import setToArray from "./util/setToArray.js";

const allAdopted = getSharedResource("ManagedStyles.allAdopted", new Map());

const createStyle = (content, name, value = "") => {
	if (document.adoptedStyleSheets) {
		const key = `${name}|${value}`;
		if (!allAdopted.has(key)) {
			const stylesheet = new CSSStyleSheet();
			stylesheet.replaceSync(content);
			allAdopted.set(key, stylesheet);
			document.adoptedStyleSheets = setToArray(allAdopted); // works for a map too -> returns an array of the values
		}
	} else {
		const attributes = {};
		attributes[name] = value;
		createStyleInHead(content, attributes);
	}
};

const updateStyle = (content, name, value = "") => {
	if (document.adoptedStyleSheets) {
		const key = `${name}|${value}`;
		const stylesheet = allAdopted.get(key);
		stylesheet.replaceSync(content);
		document.adoptedStyleSheets = setToArray(allAdopted); // works for a map too -> returns an array of the values
	} else {
		document.querySelector(`head>style[${name}="${value}"]`).textContent = content || "";
	}
};

const hasStyle = (name, value) => {
	const hasStyleTag = !!document.querySelector(`head>style[${name}="${value}"]`);
	if (hasStyleTag) {
		return true; // If another runtime has created the style tag, even if adoptedStyleSheets are supported, use this tag
	}

	if (document.adoptedStyleSheets) {
		const key = `${name}|${value}`;
		return allAdopted.has(key);
	}

	return hasStyleTag;
};

export { createStyle, hasStyle, updateStyle };
