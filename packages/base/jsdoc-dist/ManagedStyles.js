import createStyleInHead from "./util/createStyleInHead.js";
import createLinkInHead from "./util/createLinkInHead.js";
import { shouldUseLinks, getUrl } from "./CSP.js";
const getStyleId = (name, value) => {
    return value ? `${name}|${value}` : name;
};
const createStyle = (data, name, value = "") => {
    const content = typeof data === "string" ? data : data.content;
    if (shouldUseLinks()) {
        const attributes = {};
        attributes[name] = value;
        const href = getUrl(data.packageName, data.fileName);
        createLinkInHead(href, attributes);
    }
    else if (document.adoptedStyleSheets) {
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(content);
        stylesheet._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
    }
    else {
        const attributes = {};
        attributes[name] = value;
        createStyleInHead(content, attributes);
    }
};
const updateStyle = (data, name, value = "") => {
    const content = typeof data === "string" ? data : data.content;
    if (shouldUseLinks()) {
        const link = document.querySelector(`head>link[${name}="${value}"]`);
        link.href = getUrl(data.packageName, data.fileName);
    }
    else if (document.adoptedStyleSheets) {
        const stylesheet = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
        if (stylesheet) {
            stylesheet.replaceSync(content || "");
        }
    }
    else {
        const style = document.querySelector(`head>style[${name}="${value}"]`);
        if (style) {
            style.textContent = content || "";
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
        linkElement?.parentElement?.removeChild(linkElement);
    }
    else if (document.adoptedStyleSheets) {
        document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => sh._ui5StyleId !== getStyleId(name, value));
    }
    else {
        const styleElement = document.querySelector(`head > style[${name}="${value}"]`);
        styleElement?.parentElement?.removeChild(styleElement);
    }
};
const createOrUpdateStyle = (data, name, value = "") => {
    if (hasStyle(name, value)) {
        updateStyle(data, name, value);
    }
    else {
        createStyle(data, name, value);
    }
};
export { createStyle, hasStyle, updateStyle, removeStyle, createOrUpdateStyle, };
//# sourceMappingURL=ManagedStyles.js.map