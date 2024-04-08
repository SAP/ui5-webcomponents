import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element";

interface IFormElement extends UI5Element {
	name?: string;
	validationMessage?: string;
	validity?: ValidityStateFlags;
	formattedFormValue?: FormData | string | null;
	formAnchor?: () => HTMLElement | undefined | Promise<HTMLElement | undefined>;
	internals_?: ElementInternals;
	value?: string | number;
}

const attachInternalsFormElement = (element: IFormElement, attachOnly = false) => {
	element.internals_ = element.attachInternals();

	if (!attachOnly) {
		setValueFormElement(element);
	}
};

const setValueFormElement = async (element: IFormElement, preventChangeValidity = false) => {
	if (!element.internals_?.form) {
		return;
	}

	if (element.validity && Object.keys(element.validity).some(key => key)) {
		const focusRef = element.formAnchor ? await element.formAnchor() : element.getFocusDomRef();
		element.internals_.setValidity(element.validity, element.validationMessage, focusRef);
	} else if (!preventChangeValidity) {
		element.internals_.setValidity({});
	}

	if (!element.name) {
		element.internals_?.setFormValue(null);
		return;
	}

	element.internals_.setFormValue(element.formattedFormValue || null);
};

const submitForm = (element: IFormElement) => {
	if (!element.internals_?.form) {
		return;
	}

	if (!element.internals_.form.checkValidity()) {
		element.internals_.form.reportValidity();
		return;
	}

	// eslint-disable-next-line no-undef
	const submitPrevented = !element.internals_.form.dispatchEvent(new SubmitEvent("submit", {
		bubbles: true,
		cancelable: true,
		submitter: element,
	}));

	if (submitPrevented) {
		return;
	}

	element.internals_.form.submit();
};

const resetForm = (element: IFormElement) => {
	if (!element.internals_?.form) {
		return;
	}

	element.internals_?.form.reset();
};

export {
	attachInternalsFormElement,
	setValueFormElement,
	submitForm,
	resetForm,
};

export {
	IFormElement,
};
