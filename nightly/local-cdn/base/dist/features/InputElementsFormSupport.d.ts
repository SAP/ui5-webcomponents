import type UI5Element from "../UI5Element.js";
interface IFormElement extends UI5Element {
    _internals?: ElementInternals;
}
interface IFormInputElement extends IFormElement {
    name?: string;
    formFormattedValue: FormData | string | null;
    formValidityMessage?: string;
    formValidity?: ValidityStateFlags;
    formElementAnchor?: () => HTMLElement | undefined | Promise<HTMLElement | undefined>;
}
declare const attachFormElementInternals: (element: IFormInputElement | IFormElement) => void;
declare const setFormValue: (element: IFormInputElement) => void;
declare const setFormValidity: (element: IFormInputElement) => Promise<void>;
declare const submitForm: (element: IFormElement) => void;
declare const resetForm: (element: IFormElement) => void;
export { attachFormElementInternals, setFormValue, setFormValidity, submitForm, resetForm, };
export type { IFormInputElement, IFormElement, };
