import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	fetchI18nBundle,
	getI18nBundle,
} from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	FILE_UPLOADER_BROWSE_TEXT,
} from "./generated/i18n/i18n-defaults.js";
import Button from "./Button.js";
import Input from "./Input.js";

// Template
import FileUploaderTemplate from "./generated/templates/FileUploaderTemplate.lit.js";

// Styles
import FileUploaderCss from "./generated/themes/FileUploader.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-file-uploader",
	properties: /** @lends sap.ui.webcomponents.main.FileUploader.prototype */ {
		/**
		 * Comma-separated list of file types that the <code>ui5-file-uploader</code> should accept.
		 * @type {string}
		 * @public
		 */
		accept: {
			type: String,
		},

		/**
		 * If set to "true", the <code>ui5-file-uploader</code> will be rendered as button only, without showing the input field.
		 * @type {boolean}
		 * @public
		 */
		buttonOnly: {
			type: Boolean,
		},

		/**
		 * Defines whether <code>ui5-file-uploader</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-input</code> is completely noninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the icon to be displayed as graphical element within the button.
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * If set to true, the button will show icon at the end.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		iconEnd: {
			type: Boolean,
		},

		/**
		 * If set to true, the button is displayed without any text.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		iconOnly: {
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
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
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
		 * Name/names of the file/files to upload.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
		},

		/**
		 * Defines the value state of the <code>ui5-file-uploader</code>.
		 * Available options are: <code>None</code>, <code>Success</code>, <code>Warning</code>, and <code>Error</code>.
		 *
		 * @type {string}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.FileUploader.prototype */ {
		/**
		 * Event is fired when the value of the file path has been changed.
		 * Note: Keep in mind that because of the HTML input element of type file, the event is also fired in Chrome browser when the Cancel button of the uploads window is pressed.
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
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-file-uploader</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/FileUploader.js";</code>
 *
 * @constructor
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

	constructor() {
		super();
		if (this._canUseNativeFormSupport) {
			this._internals = this.attachInternals();
		}

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
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

		// in case when ui5-file-uploader is not placed in the DOM, return empty FileList, like native input would do
		const helperInput = document.createElement("input");
		helperInput.type = "file";

		return helperInput.files;
	}

	onBeforeRendering() {
		this._enableFormSupport();
	}

	_enableFormSupport() {
		const FormSupport = getFeature("FormSupport");

		if (FormSupport) {
			if (this._canUseNativeFormSupport) {
				this._setFormValue();
			} else {
				FormSupport.syncNativeVisibleInput(
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

	get browseText() {
		return this.i18nBundle.getText(FILE_UPLOADER_BROWSE_TEXT);
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
	 * @protected
	 */
	get _type() {
		return "file";
	}

	static async define(...params) {
		await Promise.all([
			Input.define(),
			Button.define(),
			fetchI18nBundle("@ui5/webcomponents"),
		]);

		super.define(...params);
	}
}

FileUploader.define();

export default FileUploader;
