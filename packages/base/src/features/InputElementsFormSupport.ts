import type UI5Element from "../UI5Element.js";

interface IFormElement extends UI5Element {
	internals_?: ElementInternals;
}

interface IFormInputElement extends IFormElement {
	name: string;
	formFormattedValue: FormData | string | null;
	formValidityMessage?: string;
	formValidity?: ValidityStateFlags;
	formElementAnchor?: () => HTMLElement | undefined | Promise<HTMLElement | undefined>;
}

const attachFormElementInternals = (element: IFormInputElement | IFormElement) => {
	element.internals_ = element.attachInternals();

	if (isInputElement(element)) {
		setFormValue(element);
	}
};

const setFormValue = (element: IFormInputElement) => {
	if (!element.internals_?.form) {
		return;
	}

	setFormValidity(element);

	if (!element.name) {
		element.internals_?.setFormValue(null);
		return;
	}

	element.internals_.setFormValue(element.formFormattedValue || null);
};

const setFormValidity = async (element: IFormInputElement) => {
	if (!element.internals_?.form) {
		return;
	}
	if (element.formValidity && Object.keys(element.formValidity).some(key => key)) {
		const focusRef = await element.formElementAnchor?.();
		element.internals_.setValidity(element.formValidity, element.formValidityMessage, focusRef);
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
	setFormValue,
	setFormValidity,
	submitForm,
	resetForm,
};

export {
	IFormInputElement,
	IFormElement,
};
