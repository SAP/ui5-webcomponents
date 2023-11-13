import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import CSSSize from "@ui5/webcomponents-base/dist/types/CSSSize.js";
import ToolbarSpacerTemplate from "./generated/templates/ToolbarSpacerTemplate.lit.js";

import ToolbarItem from "./ToolbarItem.js";
import type IToolbarItem from "./ToolbarItem.js";

import { registerToolbarItem } from "./ToolbarRegistry.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-toolbar-spacer</code> is an element, used for taking needed space for toolbar items to take 100% width.
 * It takes no space in calculating toolbar items width.
 *
 * @constructor
 * @extends ToolbarItem
 * @abstract
 * @since 1.17.0
 * @implements {IToolbarItem}
 * @public
 */
@customElement({
	tag: "ui5-toolbar-spacer",
})

class ToolbarSpacer extends ToolbarItem implements IToolbarItem {
	/**
	 * Defines the width of the spacer.
	 * <br><br>
	 *
	 * <b>Note:</b> all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
	 *
	 * @public
	 * @default undefined
	 */
	@property({ validator: CSSSize })
	width?: string;

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
