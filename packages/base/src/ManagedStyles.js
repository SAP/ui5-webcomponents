import createStyleInHead from "./util/createStyleInHead.js";
import createLinkInHead from "./util/createLinkInHead.js";
import { shouldUseLinks, getUrl } from "./CSP.js";
import { getCurrentRuntimeIndex, compareRuntimes } from "./Runtimes.js";

const shouldUpdate = runtimeIndex => {
	const createdByOldRuntime = runtimeIndex === undefined; // The style/link/stylesheet was created by an old runtime (that does not set info on it)
	const currentRuntimeIsNewer = compareRuntimes(getCurrentRuntimeIndex(), parseInt(runtimeIndex)) === 1; // 1 means the current is newer, 0 means the same, -1 means the resource's runtime is newer
	return createdByOldRuntime || currentRuntimeIsNewer;
};

const getStyleId = (name, value) => {
	return value ? `${name}|${value}` : name;
};

const createStyle = (data, name, value = "", theme = undefined) => {
	const content = typeof data === "string" ? data : data.content;
	const currentRuntimeIndex = getCurrentRuntimeIndex();

	if (shouldUseLinks()) {
		const attributes = {};
		attributes[name] = value;
		attributes["data-ui5-runtime-index"] = currentRuntimeIndex;
		if (theme) {
			attributes["data-ui5-theme"] = theme;
		}
		const href = getUrl(data.packageName, data.fileName);
		createLinkInHead(href, attributes);
	} else if (document.adoptedStyleSheets) {
		const stylesheet = new CSSStyleSheet();
		stylesheet.replaceSync(content);
		stylesheet._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
		stylesheet._ui5RuntimeIndex = currentRuntimeIndex;
		if (theme) {
			stylesheet._ui5Theme = theme;
		}
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
	} else {
		const attributes = {};
		attributes[name] = value;
		attributes["data-ui5-runtime-index"] = currentRuntimeIndex;
		if (theme) {
			attributes["data-ui5-theme"] = theme;
		}
		createStyleInHead(content, attributes);
	}
};

const updateStyle = (data, name, value = "", theme = undefined) => {
	const content = typeof data === "string" ? data : data.content;
	const currentRuntimeIndex = getCurrentRuntimeIndex();

	if (shouldUseLinks()) {
		const link = document.querySelector(`head>link[${name}="${value}"]`);
		const linkRuntimeIndex = link.getAttribute("data-ui5-runtime-index");
		const linkTheme = link.getAttribute("data-ui5-theme");
		if (linkTheme !== theme || shouldUpdate(linkRuntimeIndex)) {
			link.href = getUrl(data.packageName, data.fileName);
			link.setAttribute("data-ui5-runtime-index", currentRuntimeIndex);
			link.setAttribute("data-ui5-theme", theme);
		}
	} else if (document.adoptedStyleSheets) {
		const stylesheet = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
		const stylesheetRuntimeIndex = stylesheet._ui5RuntimeIndex;
		const stylesheetTheme = stylesheet._ui5Theme;
		if (stylesheetTheme !== theme || shouldUpdate(stylesheetRuntimeIndex)) {
			stylesheet.replaceSync(content || "");
			stylesheet._ui5RuntimeIndex = currentRuntimeIndex;
			stylesheet._ui5Theme = theme;
		}
	} else {
		const style = document.querySelector(`head>style[${name}="${value}"]`);
		const styleRuntimeIndex = style.getAttribute("data-ui5-runtime-index");
		const styleTheme = style.getAttribute("data-ui5-theme");
		if (styleTheme !== theme || shouldUpdate(styleRuntimeIndex)) {
			style.textContent = content || "";
			style.setAttribute("data-ui5-runtime-index", currentRuntimeIndex);
			style.setAttribute("data-ui5-theme", theme);
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

const createOrUpdateStyle = (data, name, value = "", theme = undefined) => {
	if (hasStyle(name, value)) {
		updateStyle(data, name, value, theme);
	} else {
		createStyle(data, name, value, theme);
	}
};

export {
	createStyle,
	hasStyle,
	updateStyle,
	removeStyle,
	createOrUpdateStyle,
};
