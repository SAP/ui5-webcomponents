import isNodeHidden from "./isNodeHidden.js";

const isNodeTabbable = node => {
	if (!node) {
		return false;
	}

	const nodeName = node.nodeName.toLowerCase();

	if (node.hasAttribute("data-sap-no-tab-ref")) {
		return false;
	}

	if (isNodeHidden(node)) {
		return false;
	}

	if (nodeName === "a" || /input|select|textarea|button|object/.test(nodeName)) {
		return !node.disabled;
	}

	const tabIndex = node.getAttribute("tabindex");
	if (tabIndex !== null && tabIndex !== undefined) {
		return parseInt(tabIndex) >= 0;
	}
};

export default isNodeTabbable;
