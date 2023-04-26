import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ToolbarPriority from "./types/ToolbarPriority.js";

import ToolbarItemTemplate from "./generated/templates/ToolbarItemTemplate.lit.js";

@customElement({
	tag: "ui5-tb-item",
	languageAware: true,
	renderer: litRender,
	template: ToolbarItemTemplate,
})

/**
 * @class
 * The <code>ui5-tb-item</code> represents an abstract action,
 * used in the <code>ui5-toolbar</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias ToolbarItem
 * @extends UI5Element
 * @public
 */
class ToolbarItem extends UI5Element {
	/**
	 * When set, the button will be always part of the overflow part of the toolbar.
	 * @public
	 * @defaultvalue ToolbarStyling.Default,
	 */
	@property({ type: ToolbarPriority })
	priority!: string;

	@property({ type: Integer })
	width!: number;

	/**
	 * When set, the button will not be visible in the toolbar
	 * @private
	 */
	@property({ type: Boolean })
	hidden!: boolean;

	get ignoreSpace() {
		return false;
	}

	get toolbarTemplate() {
		return ToolbarItemTemplate;
	}

	get toolbarPopoverTemplate() {
		return ToolbarItemTemplate;
	}
}

ToolbarItem.define();

export default ToolbarItem;
