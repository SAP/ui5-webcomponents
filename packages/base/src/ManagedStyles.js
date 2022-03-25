import createStyleInHead from "./util/createStyleInHead.js";
import createLinkInHead from "./util/createLinkInHead.js";
import { shouldUseLinks, getUrl } from "./CSP.js";
import { shouldUpdateResource } from "./SharedResourcePolicy.js";
import SharedResourceType from "./types/SharedResourceType.js";
import { getCurrentRuntimeIndex } from "./Runtimes.js";

const getStyleId = (name, value) => {
	return value ? `${name}|${value}` : name;
};

const createStyle = (data, name, value = "") => {
	const content = typeof data === "string" ? data : data.content;
	const currentRuntimeIndex = getCurrentRuntimeIndex();

	if (shouldUseLinks()) {
		const attributes = {};
		attributes[name] = value;
		attributes["data-ui5-runtime-index"] = currentRuntimeIndex;
		const href = getUrl(data.packageName, data.fileName);
		createLinkInHead(href, attributes);
	} else if (document.adoptedStyleSheets) {
		const stylesheet = new CSSStyleSheet();
		stylesheet.replaceSync(content);
		stylesheet._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
		stylesheet._runtimeIndex = currentRuntimeIndex;
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
	} else {
		const attributes = {};
		attributes[name] = value;
		attributes["data-ui5-runtime-index"] = currentRuntimeIndex;
		createStyleInHead(content, attributes);
	}
};

const updateStyle = (data, name, value = "") => {
	const content = typeof data === "string" ? data : data.content;
	const currentRuntimeIndex = getCurrentRuntimeIndex();

	if (shouldUseLinks()) {
		const link = document.querySelector(`head>link[${name}="${value}"]`);
		const runtimeIndex = link.getAttribute("data-ui5-runtime-index");
		if (shouldUpdateResource(SharedResourceType.ThemeProperties, runtimeIndex)) {
			link.href = getUrl(data.packageName, data.fileName);
			link.setAttribute("data-ui5-runtime-index", currentRuntimeIndex);
		}
	} else if (document.adoptedStyleSheets) {
		const stylesheet = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
		const runtimeIndex = stylesheet._runtimeIndex;
		if (shouldUpdateResource(SharedResourceType.ThemeProperties, runtimeIndex)) {
			stylesheet.replaceSync(content || "");
			stylesheet._runtimeIndex = currentRuntimeIndex;
		}
	} else {
		const style = document.querySelector(`head>style[${name}="${value}"]`);
		const runtimeIndex = style.getAttribute("data-ui5-runtime-index");
		if (shouldUpdateResource(SharedResourceType.ThemeProperties, runtimeIndex)) {
			style.textContent = content || "";
			style.setAttribute("data-ui5-runtime-index", currentRuntimeIndex);
		}
	}
};

const hasStyle = (name, value = "") => {
	if (shouldUseLinks()) {
		return !!document.querySelector(`head>link[${name}="${value}"]`);
	}

	if (document.adoptedStyleSheets) {
		return !!document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
	}

	return !!document.querySelector(`head>style[${name}="${value}"]`);
};

const removeStyle = (name, value = "") => {
	if (shouldUseLinks()) {
		const linkElement = document.querySelector(`head>link[${name}="${value}"]`);
		if (linkElement) {
			linkElement.parentElement.removeChild(linkElement);
		}
	} else if (document.adoptedStyleSheets) {
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => sh._ui5StyleId !== getStyleId(name, value));
	} else {
		const styleElement = document.querySelector(`head > style[${name}="${value}"]`);
		if (styleElement) {
			styleElement.parentElement.removeChild(styleElement);
		}
	}
};

const createOrUpdateStyle = (data, name, value = "") => {
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
