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
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { FILEUPLOAD_BROWSE, FILEUPLOADER_TITLE, VALUE_STATE_SUCCESS, VALUE_STATE_INFORMATION, VALUE_STATE_ERROR, VALUE_STATE_WARNING, } from "./generated/i18n/i18n-defaults.js";
import Input from "./Input.js";
import Popover from "./Popover.js";
import Icon from "./Icon.js";
// Template
import FileUploaderTemplate from "./generated/templates/FileUploaderTemplate.lit.js";
import FileUploaderPopoverTemplate from "./generated/templates/FileUploaderPopoverTemplate.lit.js";
// Styles
import FileUploaderCss from "./generated/themes/FileUploader.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
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
    static get formAssociated() {
        return true;
    }
    constructor() {
        super();
        this._internals = this.attachInternals && this.attachInternals();
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
    _onclick(e) {
        if (getEventMark(e) === "button") {
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
        if (files) {
            this._input.files = files;
            this._updateValue(files);
            this.fireEvent("change", {
                files,
            });
        }
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
    onBeforeRendering() {
        this._enableFormSupport();
    }
    onAfterRendering() {
        if (!this.value) {
            this._input.value = "";
        }
        this.toggleValueStatePopover(this.shouldOpenValueStateMessagePopover);
    }
    _enableFormSupport() {
        const formSupport = getFeature("FormSupport");
        if (formSupport) {
            if (this._canUseNativeFormSupport) {
                this._setFormValue();
            }
            else {
                formSupport.syncNativeFileInput(this, (element, nativeInput) => {
                    nativeInput.disabled = !!element.disabled;
                }, this._onChange.bind(this));
            }
        }
        else if (this.name) {
            console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
    }
    _onChange(e) {
        const changedFiles = e.target.files;
        this._updateValue(changedFiles);
        this.fireEvent("change", {
            files: changedFiles,
        });
    }
    _updateValue(files) {
        this.value = Array.from(files || []).reduce((acc, currFile) => {
            return `${acc}"${currFile.name}" `;
        }, "");
    }
    _setFormValue() {
        const formData = new FormData();
        if (this.files) {
            for (let i = 0; i < this.files.length; i++) {
                formData.append(this.name, this.files[i]);
            }
        }
        this._internals.setFormValue(formData);
    }
    toggleValueStatePopover(open) {
        if (open) {
            this.openValueStatePopover();
        }
        else {
            this.closeValueStatePopover();
        }
    }
    async openValueStatePopover() {
        const popover = await this._getPopover();
        if (popover) {
            popover.showAt(this);
        }
    }
    async closeValueStatePopover() {
        const popover = await this._getPopover();
        if (popover) {
            popover.close();
        }
    }
    async _getPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector(".ui5-valuestatemessage-popover");
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
    get _canUseNativeFormSupport() {
        return !!(this._internals && this._internals.setFormValue);
    }
    get _keepInputInShadowDOM() {
        // only put input in the light dom when ui5-file-uploader is placed inside form and there is no support for form elements
        return this._canUseNativeFormSupport || !this.name;
    }
    get _input() {
        return (this.shadowRoot.querySelector("input[type=file]") || this.querySelector("input[type=file][data-ui5-form-support]"));
    }
    get valueStateTextMappings() {
        return {
            "Success": FileUploader_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
            "Information": FileUploader_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
            "Error": FileUploader_1.i18nBundle.getText(VALUE_STATE_ERROR),
            "Warning": FileUploader_1.i18nBundle.getText(VALUE_STATE_WARNING),
        };
    }
    get valueStateText() {
        return this.valueStateTextMappings[this.valueState];
    }
    get hasValueState() {
        return this.valueState !== ValueState.None;
    }
    get hasValueStateText() {
        return this.hasValueState && this.valueState !== ValueState.Success;
    }
    get valueStateMessageText() {
        return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
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
            Error: "error",
            Warning: "alert",
            Success: "sys-enter-2",
            Information: "information",
        };
        return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
    }
    get classes() {
        return {
            popoverValueState: {
                "ui5-valuestatemessage-root": true,
                "ui5-valuestatemessage--success": this.valueState === ValueState.Success,
                "ui5-valuestatemessage--error": this.valueState === ValueState.Error,
                "ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
                "ui5-valuestatemessage--information": this.valueState === ValueState.Information,
            },
        };
    }
    get styles() {
        return {
            popoverHeader: {
                "width": `${this.ui5Input ? this.ui5Input.offsetWidth : 0}px`,
            },
        };
    }
    get ui5Input() {
        return this.shadowRoot.querySelector(".ui5-file-uploader-input");
    }
    static async onDefine() {
        FileUploader_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
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
    property({ type: ValueState, defaultValue: ValueState.None })
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
    slot()
], FileUploader.prototype, "formSupport", void 0);
FileUploader = FileUploader_1 = __decorate([
    customElement({
        tag: "ui5-file-uploader",
        languageAware: true,
        renderer: litRender,
        styles: FileUploaderCss,
        template: FileUploaderTemplate,
        staticAreaTemplate: FileUploaderPopoverTemplate,
        staticAreaStyles: [ResponsivePopoverCommonCss, ValueStateMessageCss],
        dependencies: [
            Input,
            Popover,
            Icon,
        ],
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
        detail: {
            /**
             * @public
             */
            files: { type: FileList },
        },
    })
], FileUploader);
FileUploader.define();
export default FileUploader;
//# sourceMappingURL=FileUploader.js.map