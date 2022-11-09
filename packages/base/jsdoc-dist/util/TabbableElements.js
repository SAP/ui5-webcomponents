import isNodeTabbable from "./isNodeTabbable.js";
const getTabbableElements = (node) => {
    return getTabbables([...node.children]);
};
const getLastTabbableElement = (node) => {
    const tabbables = getTabbables([...node.children]);
    return tabbables.length ? tabbables[tabbables.length - 1] : null;
};
const getTabbables = (nodes, tabbables) => {
    const tabbablesNodes = tabbables || [];
    if (!nodes) {
        return tabbablesNodes;
    }
    nodes.forEach(currentNode => {
        if (currentNode.nodeType === Node.TEXT_NODE || currentNode.nodeType === Node.COMMENT_NODE) {
            return;
        }
        let currentElement = currentNode;
        if (currentElement.hasAttribute("data-sap-no-tab-ref")) {
            return;
        }
        if (currentElement.shadowRoot) {
            // get the root node of the ShadowDom (1st none style tag)
            const children = currentElement.shadowRoot.children;
            currentElement = Array.from(children).find(node => node.tagName !== "STYLE");
        }
        if (!currentElement) {
            return;
        }
        if (isNodeTabbable(currentElement)) {
            tabbablesNodes.push(currentElement);
        }
        if (currentElement.tagName === "SLOT") {
            getTabbables(currentElement.assignedNodes(), tabbablesNodes);
        }
        else {
            getTabbables([...currentElement.children], tabbablesNodes);
        }
    });
    return tabbablesNodes;
};
export { getTabbableElements, getLastTabbableElement, };
//# sourceMappingURL=TabbableElements.js.map