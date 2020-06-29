import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResponsivePopover from "./ResponsivePopover.js";
import SideNavigationTemplate from "./generated/templates/SideNavigationTemplate.lit.js";
import SideNavigationItemPopoverContentTemplate from "./generated/templates/SideNavigationItemPopoverContentTemplate.lit.js";

// Styles
import SideNavigationCss from "./generated/themes/SideNavigation.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-side-navigation",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.SideNavigation.prototype */ {
		/**
		 * Defines whether the <code>ui5-side-navigation</code> is expanded or collapsed.
		 *
		 * @public
		 * @type {Boolean}
		 * @defaultvalue false
		 */
		collapsed: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.SideNavigation.prototype */ {
		/**
		 * Defines the items in the <code>ui5-side-navigation</code>.
		 *
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},

		/**
		 * Defines the fixed items in the bottom of the <code>ui5-side-navigation</code>.
		 *
		 * @public
		 */
		fixedItems: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.SideNavigation.prototype */ {
		/**
		 * Fired when the selection has changed via user interaction
		 *
		 * @event sap.ui.webcomponents.main.SideNavigation#selection-change
		 * @param {HTMLElement} item the clicked item.
		 * @public
		 */
		"selection-change": {
			item: {
				type: HTMLElement,
			},
		},
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
 * For the <code>ui5-side-navigation</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/SideNavigation.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SideNavigation
 * @extends UI5Element
 * @tagname ui5-side-navigation
 * @public
 */
class SideNavigation extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return SideNavigationCss;
	}

	static get template() {
		return SideNavigationTemplate;
	}

	static get staticAreaTemplate() {
		return SideNavigationItemPopoverContentTemplate;
	}

	static async onDefine() {
		await Promise.all([
			ResponsivePopover.define(),
		]);
	}

	onBeforeRendering() {
		this.items.forEach(item => {
			item._collapsed = this.collapsed;

			return item;
		});

		this.fixedItems.forEach(item => {
			item._collapsed = this.collapsed;

			return item;
		});
	}

	handleItemClick(event) {
		const currentItems = this.fixedItems.concat(this.items);

		currentItems.map(item => {
			item.selected = item === event.target;

			return item;
		});

		this.fireEvent("selectionChange", {
			selectedItem: event.target,
		});

		if (this.collapsed) {
			this.openPicker(event.target);
		}
	}

	getMiddleFocusHelper() {
		return this.getDomRef().querySelector(".ui5-sn-middle-focus-helper");
	}

	_focusOtherList() {
		this.getMiddleFocusHelper().focus();
	}

	focusNext(event) {
		const eventTarget = event.target;
		const isFixedItems = eventTarget.slot === "fixedItems";
		let currentItems = Array.from(this.querySelectorAll(`ui5-side-navigation-item${isFixedItems ? "[slot='fixedItems']" : ":not([slot])"}`));

		if (eventTarget.expandable && eventTarget.expanded) {
			eventTarget.items[0].focus();
		} else if (currentItems.indexOf(eventTarget) > -1 && currentItems.indexOf(eventTarget) < currentItems.length - 1) {
			if (currentItems[currentItems.indexOf(eventTarget) + 1].getClientRects().length === 0) {
				currentItems = isFixedItems ? this.fixedItems : this.items;
			}
			const nextItem = currentItems[currentItems.indexOf(eventTarget) + 1];

			if (nextItem) {
				nextItem.focus();
			}
		}
	}

	focusPrevious(event) {
		const eventTarget = event.target;
		const isFixedItems = eventTarget.slot === "fixedItems";
		let currentItems = Array.from(this.querySelectorAll(`ui5-side-navigation-item${isFixedItems ? "[slot='fixedItems']" : ":not([slot])"}`));

		if (eventTarget.expandable && eventTarget.expanded) {
			const _prevItem = currentItems[currentItems.indexOf(eventTarget) - 1];

			if (_prevItem) {
				_prevItem.focus();
			}
		} else if (currentItems.indexOf(eventTarget) > 0) {
			if (currentItems[currentItems.indexOf(eventTarget) - 1].getClientRects().length === 0) {
				currentItems = isFixedItems ? this.fixedItems : this.items;
			}

			currentItems[currentItems.indexOf(eventTarget) - 1].focus();
		}
	}

	async getPicker() {
		return (await this.getStaticAreaItemDomRef()).querySelector("ui5-responsive-popover");
	}

	async openPicker(opener) {
		const responsivePopover = await this.getPicker();

		responsivePopover.open(opener);
	}

	async closePicker() {
		const responsivePopover = await this.getPicker();

		responsivePopover.close();
	}
}

SideNavigation.define();

export default SideNavigation;
