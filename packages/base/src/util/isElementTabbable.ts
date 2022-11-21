import isElementHidden from "./isElementHidden.js";

const isElementTabbable = (el: HTMLElement) => {
	if (!el) {
		return false;
	}

	const nodeName = el.nodeName.toLowerCase();

	if (el.hasAttribute("data-sap-no-tab-ref")) {
		return false;
	}

	if (isElementHidden(el)) {
		return false;
	}

	const tabIndex = el.getAttribute("tabindex");
	if (tabIndex !== null && tabIndex !== undefined) {
		return parseInt(tabIndex) >= 0;
	}

	if (nodeName === "a" || /input|select|textarea|button|object/.test(nodeName)) {
		return !(el as HTMLLinkElement).disabled;
	}
};

export default isElementTabbable;
