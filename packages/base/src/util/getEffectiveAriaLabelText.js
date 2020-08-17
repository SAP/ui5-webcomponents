import findNodeOwner from "./findNodeOwner.js";

const getEffectiveAriaLabelText = el => {
	if (!el.ariaLabelledby) {
		if (el.ariaLabel) {
			return el.ariaLabel;
		}

		return undefined;
	}

	const ids = el.ariaLabelledby.split(" ");
	const owner = findNodeOwner(el);
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
