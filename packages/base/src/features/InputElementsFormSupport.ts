import type UI5Element from "../UI5Element.js";

interface IFormElement extends UI5Element {
	name?: string;
	formElementFormattedValue?: FormData | string | null;
	formElementValidityMessage?: string;
	formElementValidity?: ValidityStateFlags;
	formElementAnchor?: () => HTMLElement | undefined | Promise<HTMLElement | undefined>;
	internals_?: ElementInternals;
}

const attachFormElementInternals = (element: IFormElement, attachOnly = false) => {
	element.internals_ = element.attachInternals();

	if (!attachOnly) {
		setFormElementValue(element);
	}
};

const setFormElementValue = (element: IFormElement, test = false) => {
	if (!element.internals_?.form) {
		return;
	}

	if (!element.name) {
		element.internals_?.setFormValue(null);
		return;
	}

	if (!test) {
		setFormElementValidity(element);
	}

	element.internals_.setFormValue(element.formElementFormattedValue || null);
};

const setFormElementValidity = async (element: IFormElement) => {
	if (!element.internals_?.form) {
		return;
	}
	if (element.formElementValidity && Object.keys(element.formElementValidity).some(key => key)) {
		const focusRef = await element.formElementAnchor?.();
		element.internals_.setValidity(element.formElementValidity, element.formElementValidityMessage, focusRef);
	} else {
		element.internals_.setValidity({});
	}
};

const submitForm = (element: IFormElement) => {
	if (!element.internals_?.form) {
		return;
	}

	element.internals_.form.requestSubmit();
};

const resetForm = (element: IFormElement) => {
	if (!element.internals_?.form) {
		return;
	}

	element.internals_?.form.reset();
};

export {
	attachFormElementInternals,
	setFormElementValue,
	setFormElementValidity,
	submitForm,
	resetForm,
};

export {
	IFormElement,
};
