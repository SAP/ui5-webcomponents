import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

import OverflowItemTemplate from "./generated/templates/OverflowItemTemplate.lit.js";

@customElement({
	tag: "ui5-overflow-item",
	languageAware: true,
	renderer: litRender,
	template: OverflowItemTemplate,
})

/**
 * @class
 * The <code>ui5-overflow-button</code> represents an abstract action,
 * used in the <code>ui5-overflow-toolbar</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias OverflowItem
 * @extends UI5Element
 * @public
 */
class OverflowItem extends UI5Element {
	/**
	 * When set, the button will be always part of the overflow.
	 * @public
	 */
	@property({ type: Boolean })
	alwaysOverflow!: boolean;

	/**
	 * When set, the button will not be visible in the overflow toolbar
	 * @private
	 */
	@property({ type: Boolean })
	hidden!: boolean;

	/**
	 * Returns Promise to the DOM ref of the overflow button.
	 *
	 * @public
	 * @async
	 * @returns {Promise}
	 */
	// @ts-ignore
	async getDomRef(): Promise<HTMLElement | undefined> {
		const parentElement: any = this.parentElement!;
		return (await parentElement.getActionDOMRefByID(this.id)); // eslint-disable-line
	}

	get overflowToolbarTemplate() {
		return OverflowItemTemplate;
	}

	get overflowPopoverTemplate() {
		return OverflowItemTemplate;
	}
}

OverflowItem.define();

export default OverflowItem;
