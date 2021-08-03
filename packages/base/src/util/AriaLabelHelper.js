import findNodeOwner from "./findNodeOwner.js";

const getEffectiveAriaLabelText = el => {
	if (!el.accessibleNameRef) {
		if (el.accessibleName) {
			return el.accessibleName;
		}

		return undefined;
	}

	return getAriaLabelledByTexts(el);
};

/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related texts
 * @param {HTMLElement} ownerDocument (Optional) Defines the HTMLElement(might document or custom element) where the you want to search for the texts.
 * @param {String} readyIds (Optional) Defines a string of elements ids. The text of these elements will be returned. If used you should provide either el or ownerDocument
 */
const getAriaLabelledByTexts = (el, ownerDocument, readyIds = "") => {
	const ids = (readyIds && readyIds.split(" ")) || el.accessibleNameRef.split(" ");
	const owner = ownerDocument || findNodeOwner(el);
	let result = "";

	ids.forEach((elementId, index) => {
		const element = owner.querySelector(`[id='${elementId}']`);
		result += `${element ? element.textContent : ""}`;

		if (index < ids.length - 1) {
			result += " ";
		}
	});

	return result;
};

export {
	getEffectiveAriaLabelText,
	getAriaLabelledByTexts,
};
