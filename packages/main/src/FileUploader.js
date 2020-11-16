import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	fetchI18nBundle,
	getI18nBundle,
} from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	FILEUPLOAD_BROWSE,
	FILEUPLOADER_TITLE,
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
} from "./generated/i18n/i18n-defaults.js";

import Input from "./Input.js";
import Popover from "./Popover.js";

// Template
import FileUploaderTemplate from "./generated/templates/FileUploaderTemplate.lit.js";
import FileUploaderPopoverTemplate from "./generated/templates/FileUploaderPopoverTemplate.lit.js";

// Styles
import FileUploaderCss from "./generated/themes/FileUploader.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-file-uploader",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.FileUploader.prototype */ {
		/**
		 * Comma-separated list of file types that the <code>ui5-file-uploader</code> should accept.
		 * <br><br>
		 * <b>Note:</b> Please make sure you are adding the <code>.</code> in front on the file type, e.g. <code>.png</code> in case you want to accept png's only.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		accept: {
			type: String,
		},

		/**
		 * If set to "true", the input field of <code>ui5-file-uploader</code> will not be rendered. Only the default slot that is passed will be rendered.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideInput: {
			type: Boolean,
		},

		/**
		 * Defines whether <code>ui5-file-uploader</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-file-uploader</code> is completely noninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Allows multiple files to be chosen.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		multiple: {
			type: Boolean,
		},

		/**
		 * Determines the name with which the <code>ui5-file-uploader</code> will be submitted in an HTML form.
		 *
		 * <br><br>
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br><br>
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the <code>ui5-file-uploader</code> so that it can be submitted as
		 * part of an HTML form. Do not use this property unless you need to submit a form.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: {
			type: String,
		},

		/**
		 * Defines a short hint intended to aid the user with data entry when the <code>ui5-file-uploader</code> has no value.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		placeholder: {
			type: String,
		},

		/**
		 * Defines the name/names of the file/files to upload.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
		},

		/**
		 * Defines the value state of the <code>ui5-file-uploader</code>.
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
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * @private
		 */
		focused: {
			type: Boolean,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.FileUploader.prototype */ {
		/**
		 * By default the <code>ui5-file-uploader</code> contains a single input field. With this slot you can pass any content that you wish to add. See the samples for more information.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "content",
			type: HTMLElement,
		},

		/**
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-file-uploader</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-file-uploader</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * @type {HTMLElement[]}
		 * @since 1.0.0-rc.9
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.FileUploader.prototype */ {
		/**
		 * Event is fired when the value of the file path has been changed.
		 * <b>Note:</b> Keep in mind that because of the HTML input element of type file, the event is also fired in Chrome browser when the Cancel button of the uploads window is pressed.
		 *
		 * @event
		 * @param {FileList} files The current files.
		 * @public
		 */
		change: {
			detail: {
				files: { type: FileList },
			},
		},
	},
};

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
 * <code>import @ui5/webcomponents/dist/FileUploader.js";</code>
 *
 * @constructor
 * @since 1.0.0-rc.6
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.FileUploader
 * @extends UI5Element
 * @tagname ui5-file-uploader
 * @public
 */
class FileUploader extends UI5Element {
	static get formAssociated() {
		return true;
	}

	static get metadata() {
		return metadata;
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
		if (this._canUseNativeFormSupport) {
			this._internals = this.attachInternals();
		}

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
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

	_onfocusin() {
		this.focused = true;
	}

	_onfocusout() {
		this.focused = false;
	}

	/**
	 * FileList of all selected files.
	 * @readonly
	 * @type { FileList }
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
		const FormSupport = getFeature("FormSupport");

		if (FormSupport) {
			if (this._canUseNativeFormSupport) {
				this._setFormValue();
			} else {
				FormSupport.syncNativeFileInput(
					this,
					(element, nativeInput) => {
						nativeInput.disabled = element.disabled;
					},
					this._onChange.bind(this)
				);
			}
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	_onChange(event) {
		this._updateValue(event.target.files);
		this.fireEvent("change", {
			files: event.target.files,
		});
	}

	_updateValue(files) {
		this.value = Array.from(files).reduce((acc, currFile) => {
			return `${acc}"${currFile.name}" `;
		}, "");
	}

	_setFormValue() {
		const formData = new FormData();

		for (let i = 0; i < this.files.length; i++) {
			formData.append(this.name, this.files[i]);
		}

		this._internals.setFormValue(formData);
	}

	toggleValueStatePopover(open) {
		if (open) {
			this.openValueStatePopover();
		} else {
			this.closeValueStatePopover();
		}
	}

	async openValueStatePopover() {
		const popover = await this._getPopover();

		if (popover) {
			popover.openBy(this);
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
	 * in case when ui5-file-uploader is not placed in the DOM, return empty FileList, like native input would do
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
		return this.i18nBundle.getText(FILEUPLOAD_BROWSE);
	}

	get titleText() {
		return this.i18nBundle.getText(FILEUPLOADER_TITLE);
	}

	get _canUseNativeFormSupport() {
		return !!this.attachInternals;
	}

	get _keepInputInShadowDOM() {
		// only put input in the light dom when ui5-file-uploader is placed inside form and there is no support for form elements
		return this._canUseNativeFormSupport || !this.name;
	}

	get _input() {
		return this.shadowRoot.querySelector("input[type=file]") || this.querySelector("input[type=file][data-ui5-form-support]");
	}

	/**
	 * Determines input helper type in forms.
	 * @private
	 */
	get _type() {
		return "file";
	}

	get valueStateTextMappings() {
		const i18nBundle = this.i18nBundle;

		return {
			"Success": i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": i18nBundle.getText(VALUE_STATE_INFORMATION),
			"Error": i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": i18nBundle.getText(VALUE_STATE_WARNING),
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

	static get dependencies() {
		return [Input, Popover];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

FileUploader.define();

export default FileUploader;
