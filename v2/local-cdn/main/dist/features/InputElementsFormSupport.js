import { registerFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
const findNearestFormElement = (element) => {
    let currentElement = element.parentElement;
    while (currentElement && currentElement.tagName.toLowerCase() !== "form") {
        currentElement = currentElement.parentElement;
    }
    if (currentElement instanceof HTMLFormElement) {
        return currentElement;
    }
};
class FormSupport {
    /**
     * Syncs the native input element, rendered into the component's light DOM,
     * with the component's state.
     * @param { IFormElement} element - the component with form support
     * @param { NativeInputUpdateCallback } nativeInputUpdateCallback - callback to calculate the native input's "disabled" and "value" properties
     */
    static syncNativeHiddenInput(element, nativeInputUpdateCallback) {
        const needsNativeInput = !!element.name || element.required;
        const nativeInput = element.querySelector("input[data-ui5-form-support]");
        if (needsNativeInput) {
            this.syncNativeElement(element, nativeInput, nativeInputUpdateCallback);
        }
        else if (nativeInput) {
            element.removeChild(nativeInput);
        }
    }
    /**
     * Syncs the native textarea element, rendered into the component's light DOM,
     * with the component's state.
     * @param { IFormElement} element - the component with form support
     * @param { NativeInputUpdateCallback } nativeInputUpdateCallback - callback to calculate the native input's "disabled" and "value" properties
     */
    static syncNativeHiddenTextArea(element, nativeInputUpdateCallback) {
        const needsNativeTextArea = !!element.name || element.required;
        const nativeTextarea = element.querySelector("textarea[data-ui5-form-support]");
        if (needsNativeTextArea) {
            this.syncNativeElement(element, nativeTextarea, nativeInputUpdateCallback, "textarea");
        }
        else if (nativeTextarea) {
            element.removeChild(nativeTextarea);
        }
    }
    static syncNativeElement(element, nativeElement, nativeInputUpdateCallback, nativeElementTagName = "input") {
        if (!nativeElement) {
            nativeElement = document.createElement(nativeElementTagName);
            nativeElement.style.clip = "rect(0 0 0 0)";
            nativeElement.style.clipPath = "inset(50%)";
            nativeElement.style.height = "1px";
            nativeElement.style.overflow = "hidden";
            nativeElement.style.position = "absolute";
            nativeElement.style.whiteSpace = "nowrap";
            nativeElement.style.width = "1px";
            nativeElement.style.bottom = "0";
            nativeElement.setAttribute("tabindex", "-1");
            nativeElement.required = element.required;
            nativeElement.setAttribute("data-ui5-form-support", "");
            nativeElement.setAttribute("aria-hidden", "true");
            nativeElement.addEventListener("focusin", () => element.getFocusDomRef()?.focus());
            nativeElement.slot = "formSupport"; // Needed for IE - otherwise input elements are not part of the real DOM tree and are not detected by forms
            element.appendChild(nativeElement);
        }
        nativeElement.name = element.name;
        (nativeInputUpdateCallback || copyDefaultProperties)(element, nativeElement);
    }
    /**
     * Syncs the native file input element, rendered into the `ui5-file-uploader` component's light DOM,
     * with the `ui5-file-uploader` component's state.
     * @param { IFormFileElement} element - the component with form support
     * @param { NativeInputUpdateCallback } nativeInputUpdateCallback - callback to calculate the native input's "disabled" and "value" properties
     * @param { NativeInputChangeCallback } nativeInputChangeCallback - callback, added to native input's "change" event
     */
    static syncNativeFileInput(element, nativeInputUpdateCallback, nativeInputChangeCallback) {
        const needsNativeInput = !!element.name;
        let nativeInput = element.querySelector(`input[type="file"][data-ui5-form-support]`);
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
            nativeInput.name = element.name;
            (nativeInputUpdateCallback || copyDefaultProperties)(element, nativeInput);
        }
    }
    static triggerFormSubmit(element) {
        const formElement = findNearestFormElement(element);
        if (formElement) {
            if (!formElement.checkValidity()) {
                formElement.reportValidity();
                return;
            }
            // eslint-disable-next-line no-undef
            const submitPrevented = !formElement.dispatchEvent(new SubmitEvent("submit", {
                bubbles: true,
                cancelable: true,
                submitter: element,
            }));
            if (submitPrevented) {
                return;
            }
            formElement.submit();
        }
    }
    static triggerFormReset(element) {
        const formElement = findNearestFormElement(element);
        if (formElement) {
            formElement.reset();
        }
    }
}
const copyDefaultProperties = (element, nativeInput) => {
    nativeInput.disabled = element.disabled;
    nativeInput.value = element.value; // We do not explicitly convert to string to retain the current browser behavior
};
// Add form support to the global features registry so that Web Components can find and use it
registerFeature("FormSupport", FormSupport);
export default FormSupport;
//# sourceMappingURL=InputElementsFormSupport.js.map