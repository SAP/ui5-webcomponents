const isElementContainingBlock = (el) => {
    const computedStyle = getComputedStyle(el);
    return ["size", "inline-size"].indexOf(computedStyle.containerType) > -1
        || ["transform", "perspective"].indexOf(computedStyle.willChange) > -1
        || ["layout", "paint", "strict", "content"].indexOf(computedStyle.contain) > -1
        || (computedStyle.transform && computedStyle.transform !== "none")
        || (computedStyle.perspective && computedStyle.perspective !== "none")
        || (computedStyle.backdropFilter && computedStyle.backdropFilter !== "none");
};
export default isElementContainingBlock;
//# sourceMappingURL=isElementContainingBlock.js.map