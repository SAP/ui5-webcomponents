import ComboBox from "./ComboBox.js";
import ComboBoxItemNew from "./ComboBoxItemNew.js";
import Badge from "./Badge.js";
import CustomListItem from "./CustomListItem.js";

import ComboBoxPopoverNewTemplate from "./generated/templates/ComboBoxPopoverNewTemplate.lit.js";
import ComboBoxPopoverNewCss from "./generated/themes/ComboBoxPopoverNew.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-combobox-new",
};

/**
 * @class
 * The <code>ui5-cb-item</code> represents the item for a <code>ui5-combobox</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ComboBoxNew
 * @extends UI5Element
 * @tagname ui5-cb-item
 * @public
 */
class ComboBoxNew extends ComboBox {
	static get metadata() {
		return metadata;
	}

	static get staticAreaTemplate() {
		return ComboBoxPopoverNewTemplate;
	}

	static get staticAreaStyles() {
		return [
			...ComboBox.staticAreaStyles,
			ComboBoxPopoverNewCss,
		];
	}

	static get dependencies() {
		return [
			...ComboBox.dependencies,
			ComboBoxItemNew,
			Badge,
			CustomListItem,
		];
	}
}

ComboBoxNew.define();

export default ComboBoxNew;
