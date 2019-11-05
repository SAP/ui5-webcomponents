import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import StandardListItem from "./StandardListItem.js";
import List from "./List.js";
import Popover from "./Popover.js";
import Icon from "./Icon.js";
import "./icons/search.js";
import "./icons/bell.js";
import "./icons/overflow.js";
import "./icons/grid.js";

// Template
import ShellBarTemplate from "./generated/templates/ShellBarTemplate.lit.js";

// Styles
import styles from "./generated/themes/ShellBar.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-shellbar",
	properties: /** @lends  sap.ui.webcomponents.main.ShellBar.prototype */ {

		/**
		 * Defines the <code>logo</code> source URI.
		 * @type {string}
		 * @public
		 */
		logo: {
			type: String,
		},

		/**
		 * Defines the <code>primaryTitle</code>.
		 * <br><br>
		 * <b>Note:</b> The <code>primaryTitle</code> would be hidden on S screen size (less than approx. 700px).
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		primaryTitle: {
			type: String,
		},

		/**
		 * Defines the <code>secondaryTitle</code>.
		 * <br><br>
		 * <b>Note:</b> The <code>secondaryTitle</code> would be hidden on S and M screen sizes (less than approx. 1300px).
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		secondaryTitle: {
			type: String,
		},

		/**
		 * Defines the <code>notificationCount</code>,
		 * displayed in the notification icon top-right corner.
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		notificationCount: {
			type: String,
		},

		/**
		 * Defines the source URI of the profile action.
		 * If no source is set - profile will be excluded from actions.
		 * @type {string}
		 * @public
		 */
		profile: {
			type: String,
		},

		/**
		 * Defines, if the notification icon would be displayed.
		 * @type {boolean}
		 * @public
		 */
		showNotifications: {
			type: Boolean,
		},

		/**
		 * Defines, if the product switch icon would be displayed.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showProductSwitch: {
			type: Boolean,
		},

		/**
		 * Defines, if the product CoPilot icon would be displayed.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showCoPilot: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		breakpointSize: {
			type: String,
		},

		_hiddenIcons: {
			type: Object,
		},

		activeSearchIcon: {
			type: Boolean,
		},

		hasMenuItems: {
			type: Boolean,
		},
	},

	slots: /** @lends  sap.ui.webcomponents.main.ShellBar.prototype */ {
		/**
		 * Defines the <code>ui5-shellbar</code> aditional items.
		 * <br><br>
		 * <b>Note:</b>
		 * You can use the &nbsp;&lt;ui5-shellbar-item>&lt;/ui5-shellbar-item>.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			listenFor: { include: ["*"] },
		},

		/**
		 * Defines the items displayed in menu after a click on the primary title.
		 * <br><br>
		 * <b>Note:</b>
		 * You can use the &nbsp;&lt;ui5-li>&lt;/ui5-li> and its ancestors.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @since 0.10
		 * @public
		 */
		menuItems: {
			type: HTMLElement,
		},

		/**
		 * Defines the <code>ui5-input</code>, that will be used as a search field.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		searchField: {
			type: HTMLElement,
		},

		/**
		 * Defines a <code>ui5-button</code> in the bar that will be placed in the beginning.
		 * We encourage this slot to be used for a back or home button.
		 * It gets overstyled to match ShellBar's styling.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		startButton: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ShellBar.prototype */ {
		/**
		 *
		 * Fired, when the notification icon is activated.
		 *
		 *
		 * @event
		 * @param {HTMLElement} targetRef dom ref of the activated element
		 * @public
		 */
		notificationsClick: {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the profile icon is activated.
		 *
		 * @event
		 * @param {HTMLElement} targetRef dom ref of the activated element
		 * @public
		 */
		profileClick: {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the product switch icon is activated.
		 *
		 * @event
		 * @param {HTMLElement} targetRef dom ref of the activated element
		 * @public
		 */
		productSwitchClick: {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the logo is activated.
		 *
		 * @event
		 * @param {HTMLElement} targetRef dom ref of the activated element
		 * @since 0.10
		 * @public
		 */
		logoClick: {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the co pilot is activated.
		 *
		 * @event
		 * @param {HTMLElement} targetRef dom ref of the activated element
		 * @since 0.10
		 * @public
		 */
		coPilotClick: {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when a menu item is activated
		 *
		 * @event
		 * @param {HTMLElement} item dom ref of the activated list item
		 * @since 0.10
		 * @public
		 */
		menuItemClick: {
			detail: {
				item: { type: HTMLElement },
			},
		},
	},
	_eventHandlersByConvention: true,
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-shellbar</code> is meant to serve as an application header
 * and includes numerous built-in features, such as: logo, profile icon, title, search field, notifications and so on.
 * <br><br>
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents/dist/ShellBar";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ShellBar
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-shellbar
 * @appenddocs ShellBarItem
 * @public
 * @since 0.8.0
 */
class ShellBar extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return styles;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return ShellBarTemplate;
	}

	static get FIORI_3_BREAKPOINTS() {
		return [
			559,
			1023,
			1439,
			1919,
			10000,
		];
	}

	static get FIORI_3_BREAKPOINTS_MAP() {
		return {
			"559": "S",
			"1023": "M",
			"1439": "L",
			"1919": "XL",
			"10000": "XXL",
		};
	}

	constructor() {
		super();

		this.overflowItems = [];

		this._hiddenIcons = [];
		this._isInitialRendering = true;
		this._focusedItem = null;

		this._handleResize = event => {
			this.overflowPopover.close();
			this._handleBarBreakpoints();
		};

		this._handleRightContainerResize = event => {
			if (this.breakpointSize === "S") {
				return this._handleSizeS();
			}

			this._overflowActions();
		};
	}

	onBeforeRendering() {
		this.hasMenuItems = !!this.menuItems.length;
	}

	_actionPress(event) {
		const popover = this.overflowPopover;
		const button = event.detail.item.relatedButton;
		let prevented;

		if (button.relatedItem) {
			prevented = button.relatedItem.fireEvent("itemClick", {
				targetRef: event.detail.item,
			}, true);
		}

		if (button.handler) {
			prevented = button.handler.call(this);
		}


		if (!prevented) {
			popover.close();
		}
	}

	_titlePress(event) {
		this.menuPopover.openBy(event.target);
	}

	_menuItemPress(event) {
		this.fireEvent("menuItemClick", {
			item: event.detail.item,
		});
	}

	_logoPress() {
		this.fireEvent("logoClick", {
			targetRef: this.shadowRoot.querySelector(".ui5-shellbar-logo"),
		});
	}

	_coPilotPress() {
		this.fireEvent("coPilotClick", {
			targetRef: this.shadowRoot.querySelector(".ui5-shellbar-coPilot"),
		});
	}

	/**
	 * Closes the overflow area.
	 * Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event
	 * @public
	 */
	closeOverflow() {
		const popover = this.overflowPopover;

		if (popover) {
			popover.close();
		}
	}

	_handleBarBreakpoints() {
		const width = this.getBoundingClientRect().width;
		const breakpoints = ShellBar.FIORI_3_BREAKPOINTS;

		const size = breakpoints.filter(bp1 => width < bp1)[0] || ShellBar.FIORI_3_BREAKPOINTS[ShellBar.FIORI_3_BREAKPOINTS.length - 1];
		const mappedSize = ShellBar.FIORI_3_BREAKPOINTS_MAP[size];

		if (this.breakpointSize !== mappedSize) {
			this.breakpointSize = mappedSize;
		}

		return mappedSize;
	}

	_handleSizeS() {
		const children = this.overflowItemsParent.children;
		const showProfile = this.profile;
		const showOverflow = children.length > 2;

		[].forEach.call(children, child => {
			child.hidden = true;
		});

		showProfile && (this.profileButton.hidden = false);
		showOverflow && (this.overflowButton.hidden = false);

		this._hiddenIcons = [].filter.call(children, child => {
			return child.hidden;
		}).map(item => {
			return {
				item,
				icon: item.relatedItem ? item.relatedItem.src : item.getAttribute("icon"),
				text: item.relatedItem ? item.relatedItem.text : item.getAttribute("data-ui5-text"),
			};
		});
	}

	_toggleActionPopover() {
		this.overflowPopover.openBy(this.overflowButton);
	}

	_toggleSearchIconActiveState() {
		this.activeSearchIcon = !this.activeSearchIcon;
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
		ResizeHandler.register(this.overflowContainerRight, this._handleRightContainerResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
		ResizeHandler.deregister(this.overflowContainerRight, this._handleRightContainerResize);
	}

	_handleSearchActionClick(event) {
		const popover = this.shadowRoot.querySelector(".ui5-shellbar-search-popover");
		const opener = this.search.hidden ? this.overflowButton : this.search;

		if (this.overflowPopover.opened) {
			this.overflowPopover.close();
		}

		this.searchOpened = true;
		popover.openBy(opener);
	}

	_handleCustomActionPress(event) {
		event.target.relatedItem.fireEvent("itemClick", {
			targetRef: event.target.hidden ? event.detail.dom : event.target,
		}, true);
	}

	_handleOverflowPress() {
		this._toggleActionPopover();
	}

	_handleNotificationsPress() {
		return this.fireEvent("notificationsClick", { targetRef: this.notifications });
	}

	_handleProfilePress() {
		return this.fireEvent("profileClick", { targetRef: this.profileButton });
	}

	_handleProductSwitchPress() {
		return this.fireEvent("productSwitchClick", { targetRef: this.productSwitch });
	}

	_overflowActions() {
		const actualOverflowingChildren = [];
		const children = this.overflowItemsParent.children;

		// show all items
		[].filter.call(children, child => {
			child.hidden = false;
		});

		// check HOW MUCH items overflow
		const overflowChildren = [].filter.call(children, child => {
			const childRect = child.getBoundingClientRect();
			const parentRect = this.overflowContainerRight.getBoundingClientRect();

			if (getRTL()) {
				return (childRect.left + childRect.width) >= (parentRect.left + parentRect.width);
			}

			return childRect.left <= parentRect.left;
		});

		// hide the additional actions initially
		overflowChildren.forEach((_, index) => {
			if (this.itemsAsButtons[index]) {
				this.itemsAsButtons[index].hidden = true;

				actualOverflowingChildren.push(this.itemsAsButtons[index]);
			}
		});

		const actionsByPriority = [
			this.productSwitch,
			this.notifications,
			this.search,
		].filter(item => item);

		const itemsCountToPop = overflowChildren.length - actualOverflowingChildren.length;

		for (let i = 0; i < itemsCountToPop; i++) {
			if (actionsByPriority[i]) {
				actionsByPriority[i].hidden = true;
				actualOverflowingChildren.push(actionsByPriority[i]);
			}
		}

		this.overflowButton.hidden = !actualOverflowingChildren.length;

		this._hiddenIcons = actualOverflowingChildren.map(item => {
			return {
				item,
				icon: item.relatedItem ? item.relatedItem.src : item.getAttribute("icon"),
				text: item.relatedItem ? item.relatedItem.text : item.getAttribute("data-ui5-text"),
			};
		});
	}

	get profileButton() {
		return this.shadowRoot.querySelector(".ui5-shellbar-image-button");
	}

	get itemsAsButtons() {
		return this.shadowRoot.querySelectorAll("[data-ui5-shellbar-item-button]");
	}

	get overflowButton() {
		return this.shadowRoot.querySelector("ui5-button[icon='sap-icon://overflow'");
	}

	get productSwitch() {
		return this.shadowRoot.querySelector("ui5-button[icon='sap-icon://grid'");
	}

	get notifications() {
		return this.shadowRoot.querySelector("ui5-button[icon='sap-icon://bell'");
	}

	get search() {
		return this.shadowRoot.querySelector("ui5-button[icon='sap-icon://search'");
	}

	get overflowItemsParent() {
		return this.shadowRoot.querySelector(".ui5-shellbar-overflow-container-right-child");
	}

	get overflowContainerRight() {
		return this.shadowRoot.querySelector(".ui5-shellbar-overflow-container-right");
	}

	get overflowPopover() {
		return this.shadowRoot.querySelector(".ui5-shellbar-overflow-popover");
	}

	get menuPopover() {
		return this.shadowRoot.querySelector(".ui5-shellbar-menu-popover");
	}

	get styles() {
		return {
			profile: {
				"background-image": `url(${this.profile})`,
			},
		};
	}

	get showStandaloneLogo() {
		// if the size is S and you dont have items
		const sizeSnoItems = this.logo && ((this.breakpointSize === "S") && !this.hasMenuItems);
		// always let the logo standalone if the size is not S
		const notSizeS = this.logo && (this.breakpointSize !== "S");

		return sizeSnoItems || notSizeS;
	}

	get combineLogo() {
		return this.breakpointSize === "S" && this.logo && this.hasMenuItems;
	}

	get popoverHorizontalAlign() {
		return getRTL() ? "Left" : "Right";
	}

	get rtl() {
		return getRTL() ? "rtl" : undefined;
	}

	static async define(...params) {
		await Promise.all([
			Icon.define(),
			List.define(),
			Popover.define(),
			StandardListItem.define(),
		]);

		super.define(...params);
	}
}

ShellBar.define();

export default ShellBar;
