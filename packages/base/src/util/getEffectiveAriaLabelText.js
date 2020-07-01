import findNodeOwner from "./findNodeOwner.js";

/**
 *  @param element - DOM Node
 *  @param {Object} settings - Defines the following settings: isInLightDOM, startFromParent
 */
const getEffectiveAriaLabelText = (el, settings) => {
	if (!el.ariaLabelledby) {
		if (el.ariaLabel) {
			return el.ariaLabel;
		}

		return undefined;
	}

	const ids = el.ariaLabelledby.split(" ");
	const owner = findNodeOwner(el, settings);
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

export default getEffectiveAriaLabelText;
