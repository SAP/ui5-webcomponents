const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers
const getStylesString = (styles) => {
    if (Array.isArray(styles)) {
        return styles.filter(style => !!style).flat(MAX_DEPTH_INHERITED_CLASSES).map((style) => {
            return typeof style === "string" ? style : style.content;
        }).join(" ");
    }
    return typeof styles === "string" ? styles : styles.content;
};
export default getStylesString;
//# sourceMappingURL=getStylesString.js.map