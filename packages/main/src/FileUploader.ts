import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import {
	FILEUPLOAD_BROWSE,
	FILEUPLOADER_TITLE,
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";

// @ts-ignore
import Input from "./Input.js";
// @ts-ignore
import Popover from "./Popover.js";
import Icon from "./Icon.js";

// Template
import FileUploaderTemplate from "./generated/templates/FileUploaderTemplate.lit.js";
import FileUploaderPopoverTemplate from "./generated/templates/FileUploaderPopoverTemplate.lit.js";

// Styles
import FileUploaderCss from "./generated/themes/FileUploader.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import type FormSupport from "./features/InputElementsFormSupport.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-file-uploader</code> opens a file explorer dialog and enables users to upload files.
 * The component consists of input field, but you can provide an HTML element by your choice
 * to trigger the file upload, by using the default slot.
 * Furthermore, you can set the property "hideInput" to "true" to hide the input field.
 * <br>
 * To get all selected files, you can simply use the read-only "files" property.
 * To restrict the types of files the user can select, you can use the "accept" property.
 * <br>
 * And, similar to all input based components, the FileUploader supports "valueState", "placeholder", "name", and "disabled" properties.
 *
 * For the <code>ui5-file-uploader</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/FileUploader.js";</code>
 *
 * @constructor
 * @since 1.0.0-rc.6
 * @author SAP SE
 * @alias sap.ui.webc.main.FileUploader
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-file-uploader
 * @public
 */
@customElement("ui5-file-uploader")
@languageAware
/**
 * Event is fired when the value of the file path has been changed.
 * <b>Note:</b> Keep in mind that because of the HTML input element of type file, the event is also fired in Chrome browser when the Cancel button of the uploads window is pressed.
 *
 * @event sap.ui.webc.main.FileUploader#change
 * @param {FileList} files The current files.
 * @public
 */
@event("change", {
	detail: {
		files: { type: FileList },
	},
})
class FileUploader extends UI5Element implements IFormElement {
	/**
	 * Comma-separated list of file types that the component should accept.
	 * <br><br>
	 * <b>Note:</b> Please make sure you are adding the <code>.</code> in front on the file type, e.g. <code>.png</code> in case you want to accept png's only.
	 * @type {string}
	 * @name sap.ui.webc.main.FileUploader.prototype.accept
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	accept!: string;

	/**
	 * If set to "true", the input field of component will not be rendered. Only the default slot that is passed will be rendered.
	 * @type {boolean}
	 * @name sap.ui.webc.main.FileUploader.prototype.hideInput
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	hideInput!: boolean;

	/**
	 * Defines whether the component is in disabled state.
	 * <br><br>
	 * <b>Note:</b> A disabled component is completely noninteractive.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.FileUploader.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Allows multiple files to be chosen.
	 * @type {boolean}
	 * @name sap.ui.webc.main.FileUploader.prototype.multiple
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	multiple!: boolean;

	/**
	 * Determines the name with which the component will be submitted in an HTML form.
	 *
	 * <br><br>
	 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
	 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
	 *
	 * <br><br>
	 * <b>Note:</b> When set, a native <code>input</code> HTML element
	 * will be created inside the component so that it can be submitted as
	 * part of an HTML form. Do not use this property unless you need to submit a form.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.FileUploader.prototype.name
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	name!: string;

	/**
	 * Defines a short hint intended to aid the user with data entry when the component has no value.
	 * @type {string}
	 * @name sap.ui.webc.main.FileUploader.prototype.placeholder
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	placeholder!: string;

	/**
	 * Defines the name/names of the file/files to upload.
	 * @type {string}
	 * @name sap.ui.webc.main.FileUploader.prototype.value
	 * @defaultvalue ""
	 * @formEvents change
	 * @formProperty
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * Defines the value state of the component.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>None</code></li>
	 * <li><code>Error</code></li>
	 * <li><code>Warning</code></li>
	 * <li><code>Success</code></li>
	 * <li><code>Information</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.base.types.ValueState}
	 * @name sap.ui.webc.main.FileUploader.prototype.valueState
	 * @defaultvalue "None"
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: ValueState;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * By default the component contains a single input field. With this slot you can pass any content that you wish to add. See the samples for more information.
	 *
	 * @type {HTMLElement[]}
	 * @name sap.ui.webc.main.FileUploader.prototype.default
	 * @slot content
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 * <br><br>
	 *
	 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
	 * <br>
	 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
	 * when the component is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
	 * @type {HTMLElement[]}
	 * @name sap.ui.webc.main.FileUploader.prototype.valueStateMessage
	 * @since 1.0.0-rc.9
	 * @slot
	 * @public
	 */
	@slot()
	valueStateMessage!: Array<HTMLElement>;

	/**
	 * The slot is used to render native <code>input</code> HTML element within Light DOM to enable form submit,
	 * when <code>name</code> property is set.
	 * @type {HTMLElement[]}
	 * @slot
	 * @private
	 */
	@slot()
	formSupport!: Array<HTMLElement>;

	_internals: ElementInternals;

	static emptyInput: HTMLInputElement;

	static i18nBundle: I18nBundle;

	static get formAssociated() {
		return true;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return FileUploaderCss;
	}

	static get template() {
		return FileUploaderTemplate;
	}

	static get staticAreaTemplate() {
		return FileUploaderPopoverTemplate;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, ValueStateMessageCss];
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

	_onclick(e: MouseEvent) {
		if (getEventMark(e) === "button") {
			this._input.click();
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			this._input.click();
			e.preventDefault();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._input.click();
			e.preventDefault();
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
	 * @readonly
	 * @type {FileList}
	 * @public
	 */
	get files() {
		if (this._input) {
			return this._input.files;
		}

		return FileUploader._emptyFilesList;
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
		const formSupport = getFeature<typeof FormSupport>("FormSupport");

		if (formSupport) {
			if (this._canUseNativeFormSupport) {
				this._setFormValue();
			} else {
				formSupport.syncNativeFileInput(this,
					(element: IFormElement, nativeInput: HTMLInputElement) => {
						nativeInput.disabled = !!element.disabled;
					},
					this._onChange.bind(this));
			}
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	_onChange(e: Event) {
		const changedFiles = (e.target as HTMLInputElement).files;

		this._updateValue(changedFiles);
		this.fireEvent("change", {
			files: changedFiles,
		});
	}

	_updateValue(files: FileList | null) {
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

	toggleValueStatePopover(open: boolean) {
		if (open) {
			this.openValueStatePopover();
		} else {
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

	async _getPopover(): Promise<Popover> {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem?.querySelector<Popover>(".ui5-valuestatemessage-popover");
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

	get browseText(): string {
		return FileUploader.i18nBundle.getText(FILEUPLOAD_BROWSE as I18nText);
	}

	get titleText(): string {
		return FileUploader.i18nBundle.getText(FILEUPLOADER_TITLE as I18nText);
	}

	get _canUseNativeFormSupport(): boolean {
		return !!(this._internals && this._internals.setFormValue);
	}

	get _keepInputInShadowDOM(): boolean {
		// only put input in the light dom when ui5-file-uploader is placed inside form and there is no support for form elements
		return this._canUseNativeFormSupport || !this.name;
	}

	get _input(): HTMLInputElement {
		return (this.shadowRoot!.querySelector<HTMLInputElement>("input[type=file]") || this.querySelector<HTMLInputElement>("input[type=file][data-ui5-form-support]"))!;
	}

	get valueStateTextMappings(): Record<string, string> {
		return {
			"Success": FileUploader.i18nBundle.getText(VALUE_STATE_SUCCESS as I18nText),
			"Information": FileUploader.i18nBundle.getText(VALUE_STATE_INFORMATION as I18nText),
			"Error": FileUploader.i18nBundle.getText(VALUE_STATE_ERROR as I18nText),
			"Warning": FileUploader.i18nBundle.getText(VALUE_STATE_WARNING as I18nText),
		};
	}

	get valueStateText(): string {
		return this.valueStateTextMappings[this.valueState];
	}

	get hasValueState(): boolean {
		return this.valueState !== ValueState.None;
	}

	get hasValueStateText(): boolean {
		return this.hasValueState && this.valueState !== ValueState.Success;
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get shouldDisplayDefaultValueStateMessage(): boolean {
		return !this.valueStateMessage.length && this.hasValueStateText;
	}

	get shouldOpenValueStateMessagePopover(): boolean {
		return this.focused && this.hasValueStateText && !this.hideInput;
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateMessageInputIcon(): string {
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
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-file-uploader-input");
	}

	static get dependencies() {
		return [Input, Popover, Icon];
	}

	static async onDefine() {
		FileUploader.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

FileUploader.define();

export default FileUploader;
