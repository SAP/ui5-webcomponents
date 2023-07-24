import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ToolbarSeparatorTemplate from "./generated/templates/ToolbarSeparatorTemplate.lit.js";

import ToolbarItem from "./ToolbarItem.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-toolbar-separator</code> is an element, used for visual separation between two elements.
 * It takes no space in calculating toolbar items width.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ToolbarSeparator
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-toolbar-separator
 * @public
 * @since 1.16.0
 */
@customElement({
	tag: "ui5-toolbar-separator",
})

class ToolbarSeparator extends ToolbarItem {
	get toolbarTemplate() {
		return ToolbarSeparatorTemplate;
	}

	get toolbarPopoverTemplate() {
		return ToolbarSeparatorTemplate;
	}

	get ignoreSpace() {
		return true;
	}
}

ToolbarSeparator.define();

export default ToolbarSeparator;
