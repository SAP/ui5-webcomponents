const manageFormSupport = (element) => {
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
		nativeInput.disabled = element.disabled;
		nativeInput.name = element.name;
		nativeInput.value = element.value;
	}
};

export { manageFormSupport };
