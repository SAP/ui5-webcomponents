const isInstanceOfTable = (obj) => {
    return "isTable" in obj && !!obj.isTable;
};
const isSelectionCheckbox = (e) => {
    return e.composedPath().some((el) => el.hasAttribute?.("ui5-table-selection-component"));
};
const isHeaderSelector = (e) => {
    return isSelectionCheckbox(e) && e.composedPath().some((el) => el instanceof HTMLElement && el.hasAttribute("ui5-table-header-row"));
};
const findRowInPath = (composedPath) => {
    return composedPath.find((el) => el instanceof HTMLElement && el.hasAttribute("ui5-table-row"));
};
const findVerticalScrollContainer = (element) => {
    while (element) {
        const { overflowY } = window.getComputedStyle(element);
        if (overflowY === "auto" || overflowY === "scroll") {
            return element;
        }
        if (element.parentNode instanceof ShadowRoot) {
            element = element.parentNode.host;
        }
        else {
            element = element.parentElement;
        }
    }
    return document.scrollingElement || document.documentElement;
};
const scrollElementIntoView = (scrollContainer, element, stickyElements, isRtl) => {
    if (stickyElements.length === 0) {
        return;
    }
    const elementRect = element.getBoundingClientRect();
    const inline = isRtl ? "right" : "left";
    const { x: stickyX, y: stickyY } = stickyElements.reduce(({ x, y }, stickyElement) => {
        const { top, [inline]: inlineStart } = getComputedStyle(stickyElement);
        const stickyElementRect = stickyElement.getBoundingClientRect();
        if (top !== "auto" && stickyElementRect.bottom > elementRect.top) {
            y = Math.max(y, stickyElementRect.bottom);
        }
        if (inlineStart !== "auto") {
            if (!isRtl && stickyElementRect.right > elementRect.left) {
                x = Math.max(x, stickyElementRect.right);
            }
            else if (isRtl && stickyElementRect.left < elementRect.right) {
                x = Math.min(x, stickyElementRect.left);
            }
        }
        return { x, y };
    }, { x: elementRect[inline], y: elementRect.top });
    const scrollX = elementRect[inline] - stickyX;
    const scrollY = elementRect.top - stickyY;
    if (scrollX === 0 && scrollY === 0) {
        // avoid unnecessary scroll call, when nothing changes
        return;
    }
    scrollContainer.scrollBy({
        top: scrollY,
        left: scrollX,
    });
};
const isFeature = (element, identifier) => {
    return element.identifier === identifier;
};
export { isInstanceOfTable, isSelectionCheckbox, isHeaderSelector, findRowInPath, findVerticalScrollContainer, scrollElementIntoView, isFeature, };
//# sourceMappingURL=TableUtils.js.map