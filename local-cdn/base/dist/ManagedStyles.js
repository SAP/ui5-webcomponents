import { getCurrentRuntimeIndex, compareRuntimes } from "./Runtimes.js";
const isSSR = typeof document === "undefined";
const getStyleId = (name, value) => {
    return value ? `${name}|${value}` : name;
};
const shouldUpdate = (runtimeIndex) => {
    if (runtimeIndex === undefined) {
        return true;
    }
    return compareRuntimes(getCurrentRuntimeIndex(), parseInt(runtimeIndex)) === 1; // 1 means the current is newer, 0 means the same, -1 means the resource's runtime is newer
};
const createStyle = (data, name, value = "", theme) => {
    const content = typeof data === "string" ? data : data.content;
    const currentRuntimeIndex = getCurrentRuntimeIndex();
    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(content);
    stylesheet._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
    if (theme) {
        stylesheet._ui5RuntimeIndex = currentRuntimeIndex;
        stylesheet._ui5Theme = theme;
    }
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
};
const updateStyle = (data, name, value = "", theme) => {
    const content = typeof data === "string" ? data : data.content;
    const currentRuntimeIndex = getCurrentRuntimeIndex();
    const stylesheet = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
    if (!stylesheet) {
        return;
    }
    if (!theme) {
        stylesheet.replaceSync(content || "");
    }
    else {
        const stylesheetRuntimeIndex = stylesheet._ui5RuntimeIndex;
        const stylesheetTheme = stylesheet._ui5Theme;
        if (stylesheetTheme !== theme || shouldUpdate(stylesheetRuntimeIndex)) {
            stylesheet.replaceSync(content || "");
            stylesheet._ui5RuntimeIndex = String(currentRuntimeIndex);
            stylesheet._ui5Theme = theme;
        }
    }
};
const hasStyle = (name, value = "") => {
    if (isSSR) {
        return true;
    }
    return !!document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
};
const removeStyle = (name, value = "") => {
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => sh._ui5StyleId !== getStyleId(name, value));
};
const createOrUpdateStyle = (data, name, value = "", theme) => {
    if (hasStyle(name, value)) {
        updateStyle(data, name, value, theme);
    }
    else {
        createStyle(data, name, value, theme);
    }
};
const mergeStyles = (style1, style2) => {
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
export { createStyle, hasStyle, updateStyle, removeStyle, createOrUpdateStyle, mergeStyles, };
//# sourceMappingURL=ManagedStyles.js.map