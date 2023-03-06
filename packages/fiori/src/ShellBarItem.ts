import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

type ShellBarItemClickEventDetail = {
	targetRef: HTMLElement,
};

/**
 * @class
 * The <code>ui5-shellbar-item</code> represents a custom item, that
 * might be added to the <code>ui5-shellbar</code>.
 * <br><br>
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents-fiori/dist/ShellBarItem";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.ShellBarItem
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-shellbar-item
 * @implements sap.ui.webc.fiori.IShellBarItem
 * @public
 */
@customElement("ui5-shellbar-item")
/**
 * Fired, when the item is pressed.
 *
 * @event sap.ui.webc.fiori.ShellBarItem#click
 * @allowPreventDefault
 * @param {HTMLElement} targetRef DOM ref of the clicked element
 * @public
 * @native
 */
@event("click", {
	detail: {
		targetRef: { type: HTMLElement },
	},
})

class ShellBarItem extends UI5Element {
	/**
	 * Defines the name of the item's icon.
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.fiori.ShellBarItem.prototype.icon
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines the item text.
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.fiori.ShellBarItem.prototype.text
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines the count displayed in the top-right corner.
	 * @type {string}
	 * @defaultValue ""
	 * @name sap.ui.webc.fiori.ShellBarItem.prototype.count
	 * @since 1.0.0-rc.6
	 * @public
	 */
	@property()
	count!: string;

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
