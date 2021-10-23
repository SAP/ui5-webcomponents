import createStyleInHead from "./util/createStyleInHead.js";

const getStyleId = (name, value) => {
	return value ? `${name}|${value}` : name;
};

const createStyle = (content, name, value = "") => {
	if (document.adoptedStyleSheets) {
		const stylesheet = new CSSStyleSheet();
		stylesheet.replaceSync(content);
		stylesheet._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
	} else {
		const attributes = {};
		attributes[name] = value;
		createStyleInHead(content, attributes);
	}
};

const updateStyle = (content, name, value = "") => {
	if (document.adoptedStyleSheets) {
		document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value)).replaceSync(content || "");
	} else {
		document.querySelector(`head>style[${name}="${value}"]`).textContent = content || "";
	}
};

const hasStyle = (name, value = "") => {
	if (document.adoptedStyleSheets) {
		return !!document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
	}

	return !!document.querySelector(`head>style[${name}="${value}"]`);
};

const removeStyle = (name, value = "") => {
	if (document.adoptedStyleSheets) {
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => sh._ui5StyleId !== getStyleId(name, value));
	}

	const styleElement = document.querySelector(`head>style[${name}="${value}"]`);
	if (styleElement) {
		styleElement.parentElement.removeChild(styleElement);
	}
};

export {
	createStyle,
	hasStyle,
	updateStyle,
	removeStyle,
};
