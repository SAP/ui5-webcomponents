import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ToolbarSpacerTemplate from "./generated/templates/ToolbarSpacerTemplate.lit.js";

import ToolbarItem from "./ToolbarItem.js";
import { registerToolbarItem } from "./ToolbarRegistry.js";

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
 * @abstract
 * @since 1.17.0
 * @public
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
		return this.width === "";
	}

	get hasFlexibleWidth() {
		return this.width === "";
	}

	static get toolbarTemplate() {
		return ToolbarSpacerTemplate;
	}

	static get toolbarPopoverTemplate() {
		return ToolbarSpacerTemplate;
	}

	get isInteractive() {
		return false;
	}
}

registerToolbarItem(ToolbarSpacer);

ToolbarSpacer.define();

export default ToolbarSpacer;
