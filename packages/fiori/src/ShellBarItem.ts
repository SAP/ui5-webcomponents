import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

type ShellBarItemClickEventDetail = {
	targetRef: HTMLElement,
};

/**
 * Interface for components that may be slotted inside `ui5-shellbar` as items
 * @public
 */

/**
 * @class
 * The `ui5-shellbar-item` represents a custom item, that
 * might be added to the `ui5-shellbar`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
@customElement("ui5-shellbar-item")
/**
 * Fired, when the item is pressed.
 * @allowPreventDefault
 * @param {HTMLElement} targetRef DOM ref of the clicked element
 * @public
 */
@event<ShellBarItemClickEventDetail>("click", {
	detail: {
		targetRef: { type: HTMLElement },
	},
})

class ShellBarItem extends UI5Element {
	/**
	 * Defines the name of the item's icon.
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines the item text.
     *
     * **Note:** The text is only displayed inside the overflow popover list view.
	 * @default undefined
	 * @public
	 */
	@property()
	text = "";

	/**
	 * Defines the count displayed in the top-right corner.
	 * @default undefined
	 * @since 1.0.0-rc.6
	 * @public
	 */
	@property()
	count?: string;

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}

	fireClickEvent(e: MouseEvent) {
		return this.fireEvent<ShellBarItemClickEventDetail>("click", {
			targetRef: (e.target as HTMLElement),
		}, true);
	}
}

ShellBarItem.define();

export default ShellBarItem;

export type { ShellBarItemClickEventDetail };
