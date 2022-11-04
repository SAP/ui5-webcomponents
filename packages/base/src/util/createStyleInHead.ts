import { ObjectWithDynamicKeys } from "../types";

/**
 * Creates a <style> tag in the <head> tag
 * @param cssText - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
const createStyleInHead = (cssText: string, attributes?: ObjectWithDynamicKeys) => {
	const style = document.createElement("style");
	style.type = "text/css";

	if (attributes) {
		Object.entries(attributes).forEach(pair => style.setAttribute(...pair));
	}

	style.textContent = cssText;
	document.head.appendChild(style);
	return style;
};

export default createStyleInHead;
