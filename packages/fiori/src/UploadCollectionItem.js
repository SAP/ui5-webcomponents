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
		description: {
			type: String,
		},
		editable: {
			type: Boolean,
		},
		noDelete: {
			type: Boolean,
		},
		// TODO: better name + event for click
		fileNameClickable: {
			type: Boolean,
		},
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
		return [ListItem.styles ,UploadCollectionItemCss];
	}

	static get template() {
		return UploadCollectionItemTemplate;
	}

	static async onDefine() {
		await Promise.all([
			Button.define(),
		]);
	}

	/**
	 * @override
	 */
	get classes() {
		const result = super.classes;
		result.main["ui5-uci-root"] = true;
		return result;
	}

	/**
	 * @override
	 */
	get modeDelete() {
		return !this.noDelete && super.modeDelete;
	}

	_onEdit() {

	}

}

UploadCollectionItem.define();

export default UploadCollectionItem;
