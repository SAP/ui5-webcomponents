import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
interface IFormElement extends UI5Element {
    value?: string | number;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    multiple?: boolean;
    checked?: boolean;
}
type NativeFormElement = HTMLInputElement | HTMLTextAreaElement;
type NativeInputUpdateCallback = (element: IFormElement, nativeInput: NativeFormElement) => void;
type NativeInputChangeCallback = (e: Event) => void;
declare class FormSupport {
    /**
     * Syncs the native input element, rendered into the component's light DOM,
     * with the component's state.
     * @param { IFormElement} element - the component with form support
     * @param { NativeInputUpdateCallback } nativeInputUpdateCallback - callback to calculate the native input's "disabled" and "value" properties
     */
    static syncNativeHiddenInput(element: IFormElement, nativeInputUpdateCallback?: NativeInputUpdateCallback): void;
    /**
     * Syncs the native textarea element, rendered into the component's light DOM,
     * with the component's state.
     * @param { IFormElement} element - the component with form support
     * @param { NativeInputUpdateCallback } nativeInputUpdateCallback - callback to calculate the native input's "disabled" and "value" properties
     */
    static syncNativeHiddenTextArea(element: IFormElement, nativeInputUpdateCallback?: NativeInputUpdateCallback): void;
    static syncNativeElement(element: IFormElement, nativeElement: NativeFormElement | null, nativeInputUpdateCallback?: NativeInputUpdateCallback, nativeElementTagName?: string): void;
    /**
     * Syncs the native file input element, rendered into the `ui5-file-uploader` component's light DOM,
     * with the `ui5-file-uploader` component's state.
     * @param { IFormFileElement} element - the component with form support
     * @param { NativeInputUpdateCallback } nativeInputUpdateCallback - callback to calculate the native input's "disabled" and "value" properties
     * @param { NativeInputChangeCallback } nativeInputChangeCallback - callback, added to native input's "change" event
     */
    static syncNativeFileInput(element: IFormElement, nativeInputUpdateCallback: NativeInputUpdateCallback, nativeInputChangeCallback: NativeInputChangeCallback): void;
    static triggerFormSubmit(element: IFormElement): void;
    static triggerFormReset(element: IFormElement): void;
}
export default FormSupport;
export { IFormElement, NativeFormElement, NativeInputChangeCallback, NativeInputUpdateCallback, };
