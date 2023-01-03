import { registerFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element";

interface IFormElement extends UI5Element {
	value?: string,
	name?: string,
	disabled?: boolean,
	required?: boolean,
	multiple?: boolean,
}

type NativeInputUpdateCallback = (element: IFormElement, nativeInput: HTMLInputElement) => void;
type NativeInputChangeCallback = (e: Event) => void;

class FormSupport {
	/**
	 * Syncs the native input element, rendered into the component's light DOM,
	 * with the component's state.
	 * @param { IFormElement} element - the component with form support
	 * @param { NativeInputUpdateCallback } nativeInputUpdateCallback - callback to calculate the native input's "disabled" and "value" properties
	 */
	static syncNativeHiddenInput(element: IFormElement, nativeInputUpdateCallback?: NativeInputUpdateCallback) {
		const needsNativeInput = !!element.name || element.required;
		let nativeInput = element.querySelector("input[data-ui5-form-support]") as HTMLInputElement;
		if (needsNativeInput && !nativeInput) {
			nativeInput = document.createElement("input");

			nativeInput.style.clip = "rect(0 0 0 0)";
			nativeInput.style.clipPath = "inset(50%)";
			nativeInput.style.height = "1px";
			nativeInput.style.overflow = "hidden";
			nativeInput.style.position = "absolute";
			nativeInput.style.whiteSpace = "nowrap";
			nativeInput.style.width = "1px";
			nativeInput.style.bottom = "0";
			nativeInput.setAttribute("tabindex", "-1");
			nativeInput.required = element.required!;
			nativeInput.setAttribute("data-ui5-form-support", "");
			nativeInput.setAttribute("aria-hidden", "true");

			nativeInput.addEventListener("focusin", () => element.getFocusDomRef()?.focus());

			nativeInput.slot = "formSupport"; // Needed for IE - otherwise input elements are not part of the real DOM tree and are not detected by forms
			element.appendChild(nativeInput);
		}
		if (!needsNativeInput && nativeInput) {
			element.removeChild(nativeInput);
		}

		if (needsNativeInput) {
			nativeInput.name = element.name!;
			(nativeInputUpdateCallback || copyDefaultProperties)(element, nativeInput);
		}
	}

	/**
	 * Syncs the native file input element, rendered into the <code>ui5-file-uploader</code> component's light DOM,
	 * with the <code>ui5-file-uploader</code> component's state.
	 * @param { IFormFileElement} element - the component with form support
	 * @param { NativeInputUpdateCallback } nativeInputUpdateCallback - callback to calculate the native input's "disabled" and "value" properties
	 * @param { NativeInputChangeCallback } nativeInputChangeCallback - callback, added to native input's "change" event
	 */
	static syncNativeFileInput(element: IFormElement, nativeInputUpdateCallback: NativeInputUpdateCallback, nativeInputChangeCallback: NativeInputChangeCallback) {
		const needsNativeInput = !!element.name;
		let nativeInput = element.querySelector(`input[type="file"][data-ui5-form-support]`) as HTMLInputElement;

		if (needsNativeInput && !nativeInput) {
			nativeInput = document.createElement("input");
			nativeInput.type = "file";
			nativeInput.setAttribute("data-ui5-form-support", "");
			nativeInput.slot = "formSupport"; // Needed to visualize the input in the light dom
			nativeInput.style.position = "absolute";
			nativeInput.style.top = "0";
			nativeInput.style.left = "0";
			nativeInput.style.width = "100%";
			nativeInput.style.height = "100%";
			nativeInput.style.opacity = "0";

			if (element.multiple) {
				nativeInput.multiple = true;
			}

			nativeInput.addEventListener("change", nativeInputChangeCallback);

			element.appendChild(nativeInput);
		}

		if (!needsNativeInput && nativeInput) {
			element.removeChild(nativeInput);
		}

		if (needsNativeInput) {
			nativeInput.name = element.name!;
			(nativeInputUpdateCallback || copyDefaultProperties)(element, nativeInput);
		}
	}

	static triggerFormSubmit(element: IFormElement) {
		let currentElement = element.parentElement;
		while (currentElement && currentElement.tagName.toLowerCase() !== "form") {
			currentElement = currentElement.parentElement;
		}

		if (currentElement instanceof HTMLFormElement) {
			if (!currentElement.checkValidity()) {
				currentElement.reportValidity();
				return;
			}

			// eslint-disable-next-line no-undef
			const submitPrevented = !currentElement.dispatchEvent(new SubmitEvent("submit", {
				bubbles: true,
				cancelable: true,
				submitter: element,
			}));

			if (submitPrevented) {
				return;
			}

			currentElement.submit();
		}
	}
}

const copyDefaultProperties = (element: IFormElement, nativeInput: HTMLInputElement) => {
	nativeInput.disabled = element.disabled!;
	nativeInput.value = element.value!;
};

// Add form support to the global features registry so that Web Components can find and use it
registerFeature("FormSupport", FormSupport);

export default FormSupport;

export {
	IFormElement,
	NativeInputChangeCallback,
	NativeInputUpdateCallback,
};
