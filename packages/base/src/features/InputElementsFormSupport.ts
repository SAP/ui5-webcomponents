import type UI5Element from "../UI5Element.js";

interface IFormElement extends UI5Element {
	internals_?: ElementInternals;
}

interface IFormInputElement extends IFormElement {
	name: string;
	formElementFormattedValue: FormData | string | null;
	formElementValidityMessage?: string;
	formElementValidity?: ValidityStateFlags;
	formElementAnchor?: () => HTMLElement | undefined | Promise<HTMLElement | undefined>;
}

const attachFormElementInternals = (element: IFormInputElement | IFormElement) => {
	element.internals_ = element.attachInternals();

	if (isInputElement(element)) {
		setFormElementValue(element);
	}
};

const setFormElementValue = (element: IFormInputElement, test = false) => {
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

const setFormElementValidity = async (element: IFormInputElement) => {
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

const isInputElement = (element: IFormInputElement | IFormElement): element is IFormInputElement => {
	return true;
};

export {
	attachFormElementInternals,
	setFormElementValue,
	setFormElementValidity,
	submitForm,
	resetForm,
};

export {
	IFormInputElement,
	IFormElement,
};
