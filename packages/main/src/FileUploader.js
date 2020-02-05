import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import FileUploaderTemplate from "./generated/templates/FileUploaderTemplate.lit.js";
import Button from "./Button.js";
import Input from "./Input.js";

// Styles
import FileUploaderCss from "./generated/themes/FileUploader.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-file-uploader",
	properties: /** @lends sap.ui.webcomponents.main.FileUploader.prototype */ {
		accept: {
			type: String,
		},

		disabled: {
			type: Boolean,
		},

		// files: {
		// 	type: FileList,
		// },

		value: {
			type: String,
		},

		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

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
		 * Defines a short hint intended to aid the user with data entry when the
		 * <code>ui5-input</code> has no value.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		placeholder: {
			type: String,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.FileUploader.prototype */ {
		//
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

	static async define(...params) {
		await Promise.all([
			Input.define(),
			Button.define(),
		])

		super.define(...params);
	}

	constructor() {
		super();
		if (this._canUseNativeFormSupport) {
			this._internals = this.attachInternals();
		}
	}

	/**
	 * Determines input helper type in forms.
	 * @protected
	 */
	get _type() {
		return "file";
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
		const files = event.target.files;

		if (this._canUseNativeFormSupport) {
			this._files = files;
		}

		this._updateValue(files);
	}

	_updateValue(files) {
		if (files.length) {
			const filesNamesConcat = Array.from(files).reduce((acc, currFile) => {
				return `${acc}"${currFile.name}" `;
			}, "")
	
	
			this.value = filesNamesConcat;
		}
	}

	_setFormValue() {
		if (!this._files) {
			return;
		}

		const formData = new FormData();
	
		for (let i = 0; i < this._files.length; i++) {
			formData.append(this.name, this._files[i]);
		}

		this._internals.setFormValue(formData);
		delete this._files;
	}

	get _canUseNativeFormSupport() {
		return !!this.attachInternals;
	}
}

FileUploader.define();

export default FileUploader;
