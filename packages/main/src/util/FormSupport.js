/**
 *
 * @param element - the WebComponent that needs form support
 * @param nativeInputUpdateCallback - determines how the native input's disabled and value properties are calculated
 */
const manageNativeHiddenInput = (element, nativeInputUpdateCallback) => {
	const needsNativeInput = !!element.name;
	let nativeInput = element.querySelector("input[type=hidden][data-ui5-webcomponents-form-support]");
	if (needsNativeInput && !nativeInput) {
		nativeInput = document.createElement("input");
		nativeInput.type = "hidden";
		nativeInput.setAttribute("data-ui5-webcomponents-form-support", "");
		element.appendChild(nativeInput);
	}
	if (!needsNativeInput && nativeInput) {
		element.removeChild(nativeInput);
	}

	if (needsNativeInput) {
		nativeInput.name = element.name;
		(nativeInputUpdateCallback || copyDefaultProperties)(element, nativeInput);
	}
};

const manageNativeSubmitInput = (element) => {
	const needsNativeSubmit = !!element.submitForms;
	let nativeSubmit = element.querySelector("input[type=submit][data-ui5-webcomponents-form-support]");
	if (needsNativeSubmit && !nativeSubmit) {
		nativeSubmit = document.createElement("input");
		nativeSubmit.type = "submit";
		nativeSubmit.setAttribute("data-ui5-webcomponents-form-support", "");
		element.appendChild(nativeSubmit);
	}
	if (!needsNativeSubmit && nativeSubmit) {
		element.removeChild(nativeSubmit);
	}
};

const triggerNativeSubmit = (element) => {
	const nativeSubmit = element.querySelector("input[type=submit][data-ui5-webcomponents-form-support]");
	if (nativeSubmit) {
		nativeSubmit.click();
	}
};

const copyDefaultProperties = (element, nativeInput) => {
	nativeInput.disabled = element.disabled;
	nativeInput.value = element.value;
};

export { manageNativeHiddenInput, manageNativeSubmitInput, triggerNativeSubmit };
