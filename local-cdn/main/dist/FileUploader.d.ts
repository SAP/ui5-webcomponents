import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Input from "./Input.js";
import Popover from "./Popover.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";
type FileUploaderChangeEventDetail = {
    files: FileList | null;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-file-uploader` opens a file explorer dialog and enables users to upload files.
 * The component consists of input field, but you can provide an HTML element by your choice
 * to trigger the file upload, by using the default slot.
 * Furthermore, you can set the property "hideInput" to "true" to hide the input field.
 *
 * To get all selected files, you can simply use the read-only "files" property.
 * To restrict the types of files the user can select, you can use the "accept" property.
 *
 * And, similar to all input based components, the FileUploader supports "valueState", "placeholder", "name", and "disabled" properties.
 *
 * For the `ui5-file-uploader`
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/FileUploader.js";`
 * @constructor
 * @since 1.0.0-rc.6
 * @extends UI5Element
 * @public
 */
declare class FileUploader extends UI5Element implements IFormElement {
    /**
     * Comma-separated list of file types that the component should accept.
     *
     * **Note:** Please make sure you are adding the `.` in front on the file type, e.g. `.png` in case you want to accept png's only.
     * @default ""
     * @public
     */
    accept: string;
    /**
     * If set to "true", the input field of component will not be rendered. Only the default slot that is passed will be rendered.
     * @default false
     * @public
     */
    hideInput: boolean;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is completely noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Allows multiple files to be chosen.
     * @default false
     * @public
     */
    multiple: boolean;
    /**
     * Determines the name with which the component will be submitted in an HTML form.
     *
     * **Important:** For the `name` property to have effect, you must add the following import to your project:
     * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
     *
     * **Note:** When set, a native `input` HTML element
     * will be created inside the component so that it can be submitted as
     * part of an HTML form. Do not use this property unless you need to submit a form.
     * @default ""
     * @public
     */
    name: string;
    /**
     * Defines a short hint intended to aid the user with data entry when the component has no value.
     * @default ""
     * @public
     */
    placeholder: string;
    /**
     * Defines the name/names of the file/files to upload.
     * @default ""
     * @formEvents change
     * @formProperty
     * @public
     */
    value: string;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * @private
     */
    focused: boolean;
    /**
     * By default the component contains a single input field. With this slot you can pass any content that you wish to add. See the samples for more information.
     *
     * **Note:** If no content is provided in this slot, the component will only consist of an input field and will not be interactable using the keyboard.
     * Also it is not recommended to use any non-interactable components, as it may lead to poor accessibility experience.
     * @public
     */
    content: Array<HTMLElement>;
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed,
     * when the component is in `Information`, `Warning` or `Error` value state.
     * @since 1.0.0-rc.9
     * @public
     */
    valueStateMessage: Array<HTMLElement>;
    /**
     * The slot is used to render native `input` HTML element within Light DOM to enable form submit,
     * when `name` property is set.
     * @private
     */
    formSupport: Array<HTMLElement>;
    _internals: ElementInternals;
    static emptyInput: HTMLInputElement;
    static i18nBundle: I18nBundle;
    static get formAssociated(): boolean;
    constructor();
    _onmouseover(): void;
    _onmouseout(): void;
    _onclick(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _ondrag(e: DragEvent): void;
    _ondrop(e: DragEvent): void;
    _onfocusin(): void;
    _onfocusout(): void;
    /**
     * FileList of all selected files.
     * @public
     * @default null
     */
    get files(): FileList | null;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    _enableFormSupport(): void;
    _onChange(e: Event): void;
    _updateValue(files: FileList | null): void;
    _setFormValue(): void;
    toggleValueStatePopover(open: boolean): void;
    openValueStatePopover(): Promise<void>;
    closeValueStatePopover(): Promise<void>;
    _getPopover(): Promise<Popover>;
    /**
     * in case when the component is not placed in the DOM, return empty FileList, like native input would do
     * @private
     */
    static get _emptyFilesList(): FileList | null;
    get browseText(): string;
    get titleText(): string;
    get _canUseNativeFormSupport(): boolean;
    get _keepInputInShadowDOM(): boolean;
    get _input(): HTMLInputElement;
    get valueStateTextMappings(): Record<string, string>;
    get valueStateText(): string;
    get hasValueState(): boolean;
    get hasValueStateText(): boolean;
    get valueStateMessageText(): Node[];
    get shouldDisplayDefaultValueStateMessage(): boolean;
    get shouldOpenValueStateMessagePopover(): boolean;
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageInputIcon(): string;
    get classes(): {
        popoverValueState: {
            "ui5-valuestatemessage-root": boolean;
            "ui5-valuestatemessage--success": boolean;
            "ui5-valuestatemessage--error": boolean;
            "ui5-valuestatemessage--warning": boolean;
            "ui5-valuestatemessage--information": boolean;
        };
    };
    get styles(): {
        popoverHeader: {
            width: string;
        };
    };
    get ui5Input(): Input | null;
    static onDefine(): Promise<void>;
}
export default FileUploader;
export type { FileUploaderChangeEventDetail, };
