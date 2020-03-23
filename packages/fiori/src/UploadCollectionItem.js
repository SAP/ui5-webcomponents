import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UploadCollectionItemTemplate from "./generated/templates/UploadCollectionItemTemplate.lit.js";
import ListItem from "@ui5/webcomponents/dist/ListItem.js";

// Styles
import UploadCollectionItemCss from "./generated/themes/UploadCollectionItem.css.js";
import Button from "@ui5/webcomponents/dist/Button.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-upload-collection-item",
	properties: /** @lends sap.ui.webcomponents.fiori.UploadCollectionItem.prototype */ {
		file: {
			type: Object,
			defaultValue: null,
		},
		fileName: {
			type: String,
		},
		noDelete: {
			type: Boolean,
		},
		// TODO: better name + event for click
		fileNameClickable: {
			type: Boolean,
		},
		_editing: {
			type: Boolean
		}
	},
	slots: /** @lends sap.ui.webcomponents.fiori.UploadCollectionItem.prototype */ {
		"default": {
			type: Node,
		},
		thumbnail: {
			type: HTMLElement,
		}
	},
	events: /** @lends sap.ui.webcomponents.fiori.UploadCollectionItem.prototype */ {
		_rename: { }
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
 * For the <code>ui5-upload-collection-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents-fiori/dist/UploadCollectionItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.UploadCollectionItem
 * @extends UI5Element
 * @tagname ui5-upload-collection-item
 * @public
 */
class UploadCollectionItem extends ListItem {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return [ListItem.styles, UploadCollectionItemCss];
	}

	static get template() {
		return UploadCollectionItemTemplate;
	}

	static async onDefine() {
		await Promise.all([
			Button.define(),
		]);
	}

	onBeforeRendering() {
		if (!this.focused) {
			this._editing = false;
		}
	}

	onAfterRendering() {
		if (this.focused && this._editing) {
			const inp = this.shadowRoot.getElementById("ui5-uci-edit-input");
			inp.focus();
			// TODO: find way to select input's value
			// inp.setSelectionRange(0, this._fileNameWithoutExtension.length);
		}
	}

	/**
	 * @override
	 */
	onDetailClick(event) {
		super.onDetailClick(event);
		this._editing = true;
	}

	_onInputChange(event) {
		if (this.shadowRoot.getElementById("ui5-uci-edit-cancel").active) {
			return;
		}

		this._editing = false;
		this.fileName = event.target.value;
		this.fireEvent("_rename");
	}

	_onRenameCancel(event) {
		this._editing = false;
	}

	/**
	 * @override
	 */
	get classes() {
		const result = super.classes;

		return {
			main: {
				...result.main,
				"ui5-uci-root": true,
				"ui5-uci-root-edit": this._editing
			}
		}
	}

	/**
	 * @override
	 */
	get modeDelete() {
		return !this.noDelete && super.modeDelete;
	}

	get _fileNameWithoutExtension() {
		return this.fileName.split(".")[0];
	}

	get _fileExtension() {
		return this.fileName.includes(".") ? `.${this.fileName.split(".").pop()}` : "";
	}
}

UploadCollectionItem.define();

export default UploadCollectionItem;
