var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FileUploader_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { FILEUPLOAD_BROWSE, FILEUPLOADER_TITLE, VALUE_STATE_SUCCESS, VALUE_STATE_INFORMATION, VALUE_STATE_ERROR, VALUE_STATE_WARNING, } from "./generated/i18n/i18n-defaults.js";
// Template
import FileUploaderTemplate from "./FileUploaderTemplate.js";
// Styles
import FileUploaderCss from "./generated/themes/FileUploader.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
const convertBytesToMegabytes = (bytes) => (bytes / 1024) / 1024;
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
let FileUploader = FileUploader_1 = class FileUploader extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * If set to "true", the input field of component will not be rendered. Only the default slot that is passed will be rendered.
         * @default false
         * @public
         */
        this.hideInput = false;
        /**
         * Defines whether the component is in disabled state.
         *
         * **Note:** A disabled component is completely noninteractive.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Allows multiple files to be chosen.
         * @default false
         * @public
         */
        this.multiple = false;
        /**
         * Defines the name/names of the file/files to upload.
         * @default ""
         * @formEvents change
         * @formProperty
         * @public
         */
        this.value = "";
        /**
         * Defines the value state of the component.
         * @default "None"
         * @public
         */
        this.valueState = "None";
        /**
         * @private
         */
        this.focused = false;
    }
    async formElementAnchor() {
        return this.getFocusDomRefAsync();
    }
    /**
     * @override
     */
    getFocusDomRef() {
        return this.content[0];
    }
    get formFormattedValue() {
        if (this.files && this.name) {
            const formData = new FormData();
            for (let i = 0; i < this.files.length; i++) {
                formData.append(this.name, this.files[i]);
            }
            return formData;
        }
        return null;
    }
    _onmouseover() {
        this.content.forEach(item => {
            item.classList.add("ui5_hovered");
        });
    }
    _onmouseout() {
        this.content.forEach(item => {
            item.classList.remove("ui5_hovered");
        });
    }
    _onclick() {
        if (this.getFocusDomRef()?.matches(":focus-within")) {
            this._input.click();
        }
    }
    _onkeydown(e) {
        if (isEnter(e)) {
            this._input.click();
            e.preventDefault();
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._input.click();
            e.preventDefault();
        }
    }
    _ondrag(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    _ondrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer?.files;
        if (!files) {
            return;
        }
        const validatedFiles = this._validateFiles(files);
        if (!this.value && !validatedFiles.length) {
            return;
        }
        this._input.files = validatedFiles;
        this._updateValue(validatedFiles);
        this.fireDecoratorEvent("change", {
            files: validatedFiles,
        });
    }
    _onfocusin() {
        this.focused = true;
    }
    _onfocusout() {
        this.focused = false;
    }
    /**
     * FileList of all selected files.
     * @public
     * @default null
     */
    get files() {
        if (this._input) {
            return this._input.files;
        }
        return FileUploader_1._emptyFilesList;
    }
    onAfterRendering() {
        if (!this.value) {
            this._input.value = "";
        }
        this.toggleValueStatePopover(this.shouldOpenValueStateMessagePopover);
    }
    _onChange(e) {
        let changedFiles = e.target.files;
        if (changedFiles) {
            changedFiles = this._validateFiles(changedFiles);
        }
        if (!this.value && !changedFiles?.length) {
            return;
        }
        this._updateValue(changedFiles);
        this.fireDecoratorEvent("change", {
            files: changedFiles,
        });
    }
    _updateValue(files) {
        this.value = Array.from(files || []).reduce((acc, currFile) => {
            return `${acc}"${currFile.name}" `;
        }, "");
    }
    /**
     * Checks whether all files are below `maxFileSize` (if set),
     * and fires a `file-size-exceed` event if any file exceeds it.
     * @private
     */
    _validateFiles(changedFiles) {
        const exceededFilesData = this.maxFileSize ? this._getExceededFiles(changedFiles) : [];
        if (exceededFilesData.length) {
            this.fireDecoratorEvent("file-size-exceed", {
                filesData: exceededFilesData,
            });
            changedFiles = new DataTransfer().files;
        }
        return changedFiles;
    }
    _getExceededFiles(files) {
        const filesArray = Array.from(files);
        const exceededFiles = [];
        for (let i = 0; i < filesArray.length; i++) {
            const fileSize = convertBytesToMegabytes(filesArray[i].size);
            if (fileSize > this.maxFileSize) {
                exceededFiles.push({
                    fileName: filesArray[i].name,
                    fileSize,
                });
            }
        }
        return exceededFiles;
    }
    toggleValueStatePopover(open) {
        if (open) {
            this.openValueStatePopover();
        }
        else {
            this.closeValueStatePopover();
        }
    }
    openValueStatePopover() {
        const popover = this._getPopover();
        if (popover) {
            popover.opener = this;
            popover.open = true;
        }
    }
    closeValueStatePopover() {
        const popover = this._getPopover();
        if (popover) {
            popover.open = false;
        }
    }
    _getPopover() {
        return this.shadowRoot.querySelector(".ui5-valuestatemessage-popover");
    }
    /**
     * in case when the component is not placed in the DOM, return empty FileList, like native input would do
     * @private
     */
    static get _emptyFilesList() {
        if (!this.emptyInput) {
            this.emptyInput = document.createElement("input");
            this.emptyInput.type = "file";
        }
        return this.emptyInput.files;
    }
    get browseText() {
        return FileUploader_1.i18nBundle.getText(FILEUPLOAD_BROWSE);
    }
    get titleText() {
        return FileUploader_1.i18nBundle.getText(FILEUPLOADER_TITLE);
    }
    get _input() {
        return (this.shadowRoot.querySelector("input[type=file]") || this.querySelector("input[type=file][data-ui5-form-support]"));
    }
    get valueStateTextMappings() {
        return {
            "Positive": FileUploader_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
            "Information": FileUploader_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
            "Negative": FileUploader_1.i18nBundle.getText(VALUE_STATE_ERROR),
            "Critical": FileUploader_1.i18nBundle.getText(VALUE_STATE_WARNING),
        };
    }
    get valueStateText() {
        return this.valueStateTextMappings[this.valueState];
    }
    get hasValueState() {
        return this.valueState !== ValueState.None;
    }
    get hasValueStateText() {
        return this.hasValueState && this.valueState !== ValueState.Positive;
    }
    get shouldDisplayDefaultValueStateMessage() {
        return !this.valueStateMessage.length && this.hasValueStateText;
    }
    get shouldOpenValueStateMessagePopover() {
        return this.focused && this.hasValueStateText && !this.hideInput;
    }
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageInputIcon() {
        const iconPerValueState = {
            Negative: "error",
            Critical: "alert",
            Positive: "sys-enter-2",
            Information: "information",
        };
        return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
    }
    get ui5Input() {
        return this.shadowRoot.querySelector(".ui5-file-uploader-input");
    }
};
__decorate([
    property()
], FileUploader.prototype, "accept", void 0);
__decorate([
    property({ type: Boolean })
], FileUploader.prototype, "hideInput", void 0);
__decorate([
    property({ type: Boolean })
], FileUploader.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], FileUploader.prototype, "multiple", void 0);
__decorate([
    property()
], FileUploader.prototype, "name", void 0);
__decorate([
    property()
], FileUploader.prototype, "placeholder", void 0);
__decorate([
    property()
], FileUploader.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], FileUploader.prototype, "maxFileSize", void 0);
__decorate([
    property()
], FileUploader.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], FileUploader.prototype, "focused", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], FileUploader.prototype, "content", void 0);
__decorate([
    slot()
], FileUploader.prototype, "valueStateMessage", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], FileUploader, "i18nBundle", void 0);
FileUploader = FileUploader_1 = __decorate([
    customElement({
        tag: "ui5-file-uploader",
        languageAware: true,
        formAssociated: true,
        renderer: jsxRenderer,
        styles: [
            FileUploaderCss,
            ResponsivePopoverCommonCss,
            ValueStateMessageCss,
        ],
        template: FileUploaderTemplate,
    })
    /**
     * Event is fired when the value of the file path has been changed.
     *
     * **Note:** Keep in mind that because of the HTML input element of type file, the event is also fired in Chrome browser when the Cancel button of the uploads window is pressed.
     * @param {FileList | null} files The current files.
     * @public
     */
    ,
    event("change", {
        bubbles: true,
    })
    /**
     * Event is fired when the size of a file is above the `maxFileSize` property value.
     * @param {Array<FileData>} filesData An array of `FileData` objects containing the`fileName` and `fileSize` in MB of each file that exceeds the upload limit.
     * @since 2.2.0
     * @public
     */
    ,
    event("file-size-exceed", {
        bubbles: true,
    })
], FileUploader);
FileUploader.define();
export default FileUploader;
//# sourceMappingURL=FileUploader.js.map