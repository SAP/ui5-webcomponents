import createStyleInHead from "./util/createStyleInHead.js";
import createLinkInHead from "./util/createLinkInHead.js";
import { shouldUseLinks, getUrl } from "./CSP.js";
import { StyleData, StyleDataCSP } from "./types.js";
import { isSafari } from "./Device.js";
import { getCurrentRuntimeIndex, compareRuntimes } from "./Runtimes.js";

const getStyleId = (name: string, value: string) => {
	return value ? `${name}|${value}` : name;
};

const shouldUpdate = (runtimeIndex: string | undefined) => {
	if (runtimeIndex === undefined) {
		return true;
	}
	return compareRuntimes(getCurrentRuntimeIndex(), parseInt(runtimeIndex)) === 1; // 1 means the current is newer, 0 means the same, -1 means the resource's runtime is newer
};

const createStyle = (data: StyleData, name: string, value = "", theme?: string) => {
	const content = typeof data === "string" ? data : data.content;
	const currentRuntimeIndex = getCurrentRuntimeIndex();

	if (shouldUseLinks()) {
		const attributes = {} as Record<string, any>;
		attributes[name] = value;
		if (theme) {
			attributes["data-ui5-runtime-index"] = currentRuntimeIndex;
			attributes["data-ui5-theme"] = theme;
		}
		const href = getUrl((data as StyleDataCSP).packageName, (data as StyleDataCSP).fileName);
		createLinkInHead(href, attributes);
	} else if (document.adoptedStyleSheets && !isSafari()) {
		const stylesheet = new CSSStyleSheet();
		stylesheet.replaceSync(content);
		(stylesheet as Record<string, any>)._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
		if (theme) {
			(stylesheet as Record<string, any>)._ui5RuntimeIndex = currentRuntimeIndex;
			(stylesheet as Record<string, any>)._ui5Theme = theme;
		}
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
	} else {
		const attributes = {} as Record<string, any>;
		attributes[name] = value;
		if (theme) {
			attributes["data-ui5-runtime-index"] = currentRuntimeIndex;
			attributes["data-ui5-theme"] = theme;
		}
		createStyleInHead(content, attributes);
	}
};

const updateStyle = (data: StyleData, name: string, value = "", theme?: string) => {
	const content = typeof data === "string" ? data : data.content;
	const currentRuntimeIndex = getCurrentRuntimeIndex();

	if (shouldUseLinks()) {
		const link = document.querySelector(`head>link[${name}="${value}"]`) as HTMLLinkElement;
		const href = getUrl((data as StyleDataCSP).packageName, (data as StyleDataCSP).fileName);

		if (!theme) {
			link.href = href;
		} else {
			const linkRuntimeIndex = link.getAttribute("data-ui5-runtime-index") || undefined;
			const linkTheme = link.getAttribute("data-ui5-theme");
			if (linkTheme !== theme || shouldUpdate(linkRuntimeIndex)) {
				link.href = href;
				link.setAttribute("data-ui5-runtime-index", String(currentRuntimeIndex));
				link.setAttribute("data-ui5-theme", theme);
			}
		}
	} else if (document.adoptedStyleSheets && !isSafari()) {
		const stylesheet = document.adoptedStyleSheets.find(sh => (sh as Record<string, any>)._ui5StyleId === getStyleId(name, value));
		if (!stylesheet) {
			return;
		}

		if (!theme) {
			stylesheet.replaceSync(content || "");
		} else {
			const stylesheetRuntimeIndex: string | undefined = (stylesheet as Record<string, any>)._ui5RuntimeIndex;
			const stylesheetTheme: string | undefined = (stylesheet as Record<string, any>)._ui5Theme;
			if (stylesheetTheme !== theme || shouldUpdate(stylesheetRuntimeIndex)) {
				stylesheet.replaceSync(content || "");
				(stylesheet as Record<string, any>)._ui5RuntimeIndex = String(currentRuntimeIndex);
				(stylesheet as Record<string, any>)._ui5Theme = theme;
			}
		}
	} else {
		const style = document.querySelector(`head>style[${name}="${value}"]`);
		if (!style) {
			return;
		}

		if (!theme) {
			style.textContent = content || "";
		} else {
			const styleRuntimeIndex = style.getAttribute("data-ui5-runtime-index") || undefined;
			const styleTheme = style.getAttribute("data-ui5-theme");
			if (styleTheme !== theme || shouldUpdate(styleRuntimeIndex)) {
				style.textContent = content || "";
				style.setAttribute("data-ui5-runtime-index", String(currentRuntimeIndex));
				style.setAttribute("data-ui5-theme", theme);
			}
		}
	}
};

const hasStyle = (name: string, value = ""): boolean => {
	if (shouldUseLinks()) {
		return !!document.querySelector(`head>link[${name}="${value}"]`);
	}

	const styleElement = document.querySelector(`head>style[${name}="${value}"]`);

	if (document.adoptedStyleSheets && !isSafari()) {
		return !!styleElement || !!document.adoptedStyleSheets.find(sh => (sh as Record<string, any>)._ui5StyleId === getStyleId(name, value));
	}

	return !!styleElement;
};

const removeStyle = (name: string, value = "") => {
	if (shouldUseLinks()) {
		const linkElement = document.querySelector(`head>link[${name}="${value}"]`);
		linkElement?.parentElement?.removeChild(linkElement);
	} else if (document.adoptedStyleSheets && !isSafari()) {
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => (sh as Record<string, any>)._ui5StyleId !== getStyleId(name, value));
	} else {
		const styleElement = document.querySelector(`head > style[${name}="${value}"]`);
		styleElement?.parentElement?.removeChild(styleElement);
	}
};

const createOrUpdateStyle = (data: StyleData, name: string, value = "", theme?: string) => {
	if (hasStyle(name, value)) {
		updateStyle(data, name, value, theme);
	} else {
		createStyle(data, name, value, theme);
	}
};

const mergeStyles = (style1?: StyleData, style2?: StyleData) => {
	if (style1 === undefined) {
		return style2;
	}
	if (style2 === undefined) {
		return style1;
	}
	const style2Content = typeof style2 === "string" ? style2 : style2.content;
	if (typeof style1 === "string") {
		return `${style1} ${style2Content}`;
	}
	return {
		content: `${style1.content} ${style2Content}`,
		packageName: style1.packageName,
		fileName: style1.fileName,
	};
};

export {
	createStyle,
	hasStyle,
	updateStyle,
	removeStyle,
	createOrUpdateStyle,
	mergeStyles,
};

export type {
	StyleData,
	StyleDataCSP,
};
