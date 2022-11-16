import createStyleInHead from "./util/createStyleInHead.js";
import createLinkInHead from "./util/createLinkInHead.js";
import { shouldUseLinks, getUrl } from "./CSP.js";
import { StyleData, StyleDataCSP } from "./types.js";

const getStyleId = (name: string, value: string) => {
	return value ? `${name}|${value}` : name;
};

const createStyle = (data: StyleData, name: string, value = "") => {
	const content = typeof data === "string" ? data : data.content;

	if (shouldUseLinks()) {
		const attributes = {} as Record<string, any>;
		attributes[name] = value;
		const href = getUrl((data as StyleDataCSP).packageName, (data as StyleDataCSP).fileName);
		createLinkInHead(href, attributes);
	} else if (document.adoptedStyleSheets) {
		const stylesheet = new CSSStyleSheet();
		stylesheet.replaceSync(content);
		(stylesheet as Record<string, any>)._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
	} else {
		const attributes = {} as Record<string, any>;
		attributes[name] = value;
		createStyleInHead(content, attributes);
	}
};

const updateStyle = (data: StyleData, name: string, value = "") => {
	const content = typeof data === "string" ? data : data.content;

	if (shouldUseLinks()) {
		const link = document.querySelector(`head>link[${name}="${value}"]`) as HTMLLinkElement;
		link.href = getUrl((data as StyleDataCSP).packageName, (data as StyleDataCSP).fileName);
	} else if (document.adoptedStyleSheets) {
		const stylesheet = document.adoptedStyleSheets.find(sh => (sh as Record<string, any>)._ui5StyleId === getStyleId(name, value));
		if (stylesheet) {
			stylesheet.replaceSync(content || "");
		}
	} else {
		const style = document.querySelector(`head>style[${name}="${value}"]`);
		if (style) {
			style.textContent = content || "";
		}
	}
};

const hasStyle = (name: string, value = "") => {
	if (shouldUseLinks()) {
		return !!document.querySelector(`head>link[${name}="${value}"]`);
	}

	if (document.adoptedStyleSheets) {
		return !!document.adoptedStyleSheets.find(sh => (sh as Record<string, any>)._ui5StyleId === getStyleId(name, value));
	}

	return !!document.querySelector(`head>style[${name}="${value}"]`);
};

const removeStyle = (name: string, value = "") => {
	if (shouldUseLinks()) {
		const linkElement = document.querySelector(`head>link[${name}="${value}"]`);
		linkElement?.parentElement?.removeChild(linkElement);
	} else if (document.adoptedStyleSheets) {
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => (sh as Record<string, any>)._ui5StyleId !== getStyleId(name, value));
	} else {
		const styleElement = document.querySelector(`head > style[${name}="${value}"]`);
		styleElement?.parentElement?.removeChild(styleElement);
	}
};

const createOrUpdateStyle = (data: StyleData, name: string, value = "") => {
	if (hasStyle(name, value)) {
		updateStyle(data, name, value);
	} else {
		createStyle(data, name, value);
	}
};

export {
	createStyle,
	hasStyle,
	updateStyle,
	removeStyle,
	createOrUpdateStyle,
};

export type {
	StyleData,
	StyleDataCSP,
};
