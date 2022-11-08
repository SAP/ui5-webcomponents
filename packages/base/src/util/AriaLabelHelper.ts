import { ObjectWithDynamicKeys } from "../types";

const getEffectiveAriaLabelText = (el: HTMLElement) => {
	const accessibleEl = el as ObjectWithDynamicKeys;

	if (!accessibleEl.accessibleNameRef) {
		if (accessibleEl.accessibleName) {
			return accessibleEl.accessibleName;
		}

		return undefined;
	}

	return getAriaLabelledByTexts(el);
};

/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related texts
 */
const getAriaLabelledByTexts = (el: HTMLElement) => {
	const ids = (el as ObjectWithDynamicKeys).accessibleNameRef.split(" ");
	const owner = el.getRootNode() as HTMLElement;
	let result = "";

	ids.forEach((elementId: string, index: number) => {
		const element = owner.querySelector(`[id='${elementId}']`);
		result += `${element ? element.textContent : ""}`;

		if (index < ids.length - 1) {
			result += " ";
		}
	});

	return result;
};

/**
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related "label for" texts
 */
const getAssociatedLabelForTexts = (el: HTMLElement) => {
	const results: Array<string> = [];
	const labels = (el.getRootNode() as HTMLElement).querySelectorAll(`[ui5-label][for="${el.id}"],label[for="${el.id}"]`);

	labels.forEach((label: Node) => {
		const labelText = label.textContent;
		labelText && results.push(labelText);
	});

	if (results.length) {
		return results.join(" ");
	}

	return undefined;
};

export {
	getEffectiveAriaLabelText,
	getAriaLabelledByTexts,
	getAssociatedLabelForTexts,
};
