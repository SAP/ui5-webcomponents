import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ToolbarSpacerTemplate from "./generated/templates/ToolbarSpacerTemplate.lit.js";

import ToolbarItem from "./ToolbarItem.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-toolbar-spacer</code> is an element, used for taking needed space for toolbar items to take 100% width.
 * It takes no space in calculating toolbar items width.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ToolbarSpacer
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-toolbar-spacer
 * @public
 * @since 1.16.0
 */
@customElement({
	tag: "ui5-toolbar-spacer",
})

class ToolbarSpacer extends ToolbarItem {
	/**
	 * Spacer width
	 * @public
	 * @name sap.ui.webc.main.ToolbarSpacer.prototype.width
	 */
	@property({ type: String })
	width!: string

	get styles() {
		return this.width ? { width: this.width } : { flex: "auto" };
	}

	get ignoreSpace() {
		return this.width === undefined;
	}

	get toolbarTemplate() {
		return ToolbarSpacerTemplate;
	}

	get toolbarPopoverTemplate() {
		return ToolbarSpacerTemplate;
	}
}

ToolbarSpacer.define();

export default ToolbarSpacer;
