import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import { getRTL } from "@ui5/webcomponents-base/src/Configuration.js";
import URI from "@ui5/webcomponents-base/src/types/URI.js";
import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Function from "@ui5/webcomponents-base/src/types/Function.js";
import ResizeHandler from "@ui5/webcomponents-base/src/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/src/delegate/ItemNavigation.js";
import { isSpace, isEscape } from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import StandardListItem from "./StandardListItem.js";
import List from "./List.js";
import Icon from "./Icon.js";
import Popover from "./Popover.js";

// Template
import ShellBarRenderer from "./build/compiled/ShellBarRenderer.lit.js";
import ShellBarTemplateContext from "./ShellBarTemplateContext.js";

// Styles
import styles from "./themes/ShellBar.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

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
			type: URI,
			defaultValue: null,
		},

		/**
		 * Defines the <code>primaryTitle</code>.
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
		 * <b>Note:</b> On smaller screen width, the <code>secondaryTitle</code> would be hidden.
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
		 * Defines URI of the profile action.
		 * If no URI is set - profile will be excluded from actions.
		 * @type {URI}
		 * @public
		 */
		profile: {
			type: URI,
			defaultValue: "",
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

		_breakpointSize: {
			type: String,
		},

		_itemsInfo: {
			type: Object,
			deepEqual: true,
		},

		_actionList: {
			type: Object,
		},

		_showBlockLayer: {
			type: Boolean,
		},
		_searchField: {
			type: Object,
		},

		_header: {
			type: Object,
		},

		_logoPress: {
			type: Function,
		},

		_coPilotPress: {
			type: Function,
		},

		_menuItemPress: {
			type: Function,
		},
	},

	slots: /** @lends  sap.ui.webcomponents.main.ShellBar.prototype */ {
		/**
		 * Defines the <code>ui5-shellbar</code> aditional items.
		 * </br></br>
		 * <b>Note:</b>
		 * You can use the &nbsp;&lt;ui5-shellbar-item>&lt;/ui5-shellbar-item>.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		items: {
			type: HTMLElement,
			multiple: true,
		},

		/**
		 * Defines the items displayed in menu after a click on the primary title.
		 * </br></br>
		 * <b>Note:</b>
		 * You can use the &nbsp;&lt;ui5-li>&lt;/ui5-li> and its ancestors.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @since 0.10
		 * @public
		 */
		menuItems: {
			type: HTMLElement,
			multiple: true,
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
		 * Defines a <code>ui5-icon</code> in the bar that will be placed in the beginning.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		icon: {
			type: HTMLElement,
		},
	},
	defaultSlot: "items",
	events: /** @lends sap.ui.webcomponents.main.ShellBar.prototype */ {
		/**
		 *
		 * Fired, when the notification icon is pressed.
		 *
		 *
		 * @event
		 * @param {HTMLElement} targetRef dom ref of the clicked element
		 * @public
		 */
		notificationsPress: {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the profile icon is pressed.
		 *
		 * @event
		 * @param {HTMLElement} targetRef dom ref of the clicked element
		 * @public
		 */
		profilePress: {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the product switch icon is pressed.
		 *
		 * @event
		 * @param {HTMLElement} targetRef dom ref of the clicked element
		 * @public
		 */
		productSwitchPress: {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the logo is pressed.
		 *
		 * @event
		 * @param {HTMLElement} targetRef dom ref of the clicked element
		 * @since 0.10
		 * @public
		 */
		logoPress: {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the co pilot is pressed.
		 *
		 * @event
		 * @param {HTMLElement} targetRef dom ref of the clicked element
		 * @since 0.10
		 * @public
		 */
		coPilotPress: {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when a menu item is selected
		 *
		 * @event
		 * @param {HTMLElement} item dom ref of the clicked list item
		 * @since 0.10
		 * @public
		 */
		menuItemPress: {
			detail: {
				item: { type: HTMLElement },
			},
		},
	},
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

	static get renderer() {
		return ShellBarRenderer;
	}

	static get calculateTemplateContext() {
		return ShellBarTemplateContext.calculate;
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

		this._itemsInfo = [];
		this._isInitialRendering = true;
		this._focussedItem = null;

		// marks if preventDefault() is called in item's press handler
		this._defaultItemPressPrevented = false;

		const that = this;

		this._actionList = {
			itemPress: event => {
				const popover = this.shadowRoot.querySelector(".sapWCShellBarOverflowPopover");

				if (!this._defaultItemPressPrevented) {
					popover.close();
				}

				this._defaultItemPressPrevented = false;
			},
		};

		this._header = {
			press: event => {
				const menuPopover = this.shadowRoot.querySelector(".sapWCShellBarMenuPopover");

				if (this.menuItems.length) {
					menuPopover.openBy(this.shadowRoot.querySelector(".sapWCShellBarMenuButton"));
				}
			},
		};

		this._menuItemPress = event => {
			this.fireEvent("menuItemPress", {
				item: event.detail.item,
			});
		};

		this._itemNav = new ItemNavigation(this);

		this._itemNav.getItemsCallback = () => {
			const items = that._itemsInfo.filter(info => {
				const isVisible = info.classes.indexOf("sapWCShellBarHiddenIcon") === -1;
				const isSet = info.classes.indexOf("sapWCShellBarUnsetIcon") === -1;

				if (isVisible && isSet) {
					return true;
				}

				return false;
			}).sort((item1, item2) => {
				if (item1.domOrder < item2.domOrder) {
					return -1;
				}

				if (item1.domOrder > item2.domOrder) {
					return 1;
				}

				return 0;
			});

			this._itemNav.rowSize = items.length;

			return items.map(item => {
				const clone = JSON.parse(JSON.stringify(item));
				clone.press = item.press;

				return clone;
			});
		};

		this._itemNav.setItemsCallback = items => {
			const newItems = that._itemsInfo.map(stateItem => {
				const mappingItem = items.filter(item => {
					return item.id === stateItem.id;
				})[0];

				const clone = JSON.parse(JSON.stringify(stateItem));
				clone._tabIndex = mappingItem ? mappingItem._tabIndex : "-1";
				clone.press = stateItem.press;

				return clone;
			});

			that._itemsInfo = newItems;
		};

		this._delegates.push(this._itemNav);

		this._searchField = {
			left: 0,
			focusout: event => {
				this._showBlockLayer = false;
			},
		};

		this._handleResize = event => {
			this.shadowRoot.querySelector(".sapWCShellBarOverflowPopover").close();
			this._overflowActions();
		};

		this._logoPress = event => {
			this.fireEvent("logoPress", {
				targetRef: this.shadowRoot.querySelector(".sapWCShellBarLogo"),
			});
		};

		this._coPilotPress = event => {
			this.fireEvent("coPilotPress", {
				targetRef: this.shadowRoot.querySelector(".ui5-shellbar-coPilot"),
			});
		};
	}

	onBeforeRendering() {
		const size = this._handleBarBreakpoints();
		const searchField = this.shadowRoot.querySelector(`#${this._id}-searchfield-wrapper`);

		if (size !== "S") {
			this._itemNav.init();
		}

		if (this.searchField && searchField) {
			const inputSlot = searchField.children[0];

			if (inputSlot) {
				inputSlot.assignedNodes()[0]._customClasses = ["sapWCShellBarSearchFieldElement"];
			}
		}
	}

	onAfterRendering() {
		this._overflowActions();

		if (this._focussedItem) {
			this._focussedItem._tabIndex = "0";
		}
	}

	/**
	 * Closes the overflow area.
	 * Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event
	 * @public
	 */
	closeOverflow() {
		const popover = this.shadowRoot.querySelector(".sapWCShellBarOverflowPopover");

		if (popover) {
			popover.close();
		}
	}

	_handleBarBreakpoints() {
		const width = this.getBoundingClientRect().width;
		const breakpoints = ShellBar.FIORI_3_BREAKPOINTS;

		const size = breakpoints.filter(bp1 => width < bp1)[0] || ShellBar.FIORI_3_BREAKPOINTS[ShellBar.FIORI_3_BREAKPOINTS.length - 1];
		const mappedSize = ShellBar.FIORI_3_BREAKPOINTS_MAP[size];

		if (this._breakpointSize !== mappedSize) {
			this._breakpointSize = mappedSize;
		}

		return mappedSize;
	}

	_handleSizeS() {
		const hasIcons = this.showNotifications || this.showProductSwitch || this.searchField || this.items.length;

		this._itemsInfo = this._getAllItems(hasIcons).map(info => {
			const isOverflowIcon = info.classes.indexOf("sapWCShellBarOverflowIcon") !== -1;
			const isImageIcon = info.classes.indexOf("sapWCShellBarImageButton") !== -1;
			const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.profile);

			return Object.assign({}, info, {
				classes: `${info.classes} ${shouldStayOnScreen ? "" : "sapWCShellBarHiddenIcon"} sapWCShellBarIconButton`,
				style: `order: ${shouldStayOnScreen ? 1 : -1}`,
			});
		});
	}

	_handleActionsOverflow() {
		const rightContainerRect = this.shadowRoot.querySelector(".sapWCShellBarOverflowContainerRight").getBoundingClientRect();
		const icons = this.shadowRoot.querySelectorAll(".sapWCShellBarIconButton:not(.sapWCShellBarOverflowIcon):not(.sapWCShellBarUnsetIcon)");
		const isRTL = getRTL();

		let overflowCount = [].filter.call(icons, icon => {
			const iconRect = icon.getBoundingClientRect();

			if (isRTL) {
				return (iconRect.left + iconRect.width) > (rightContainerRect.left + rightContainerRect.width);
			}

			return iconRect.left < rightContainerRect.left;
		});

		overflowCount = overflowCount.length;

		const items = this._getAllItems(!!overflowCount);

		items.map(item => {
			this._itemsInfo.forEach(stateItem => {
				if (stateItem.id === item.id) {
					item._tabIndex = stateItem._tabIndex;
				}
			});

			return item;
		});

		const itemsByPriority = items.sort((item1, item2) => {
			if (item1.priority > item2.priority) {
				return 1;
			}

			if (item1.priority < item2.priority) {
				return -1;
			}

			return 0;
		});

		const focusableItems = [];

		for (let i = 0; i < itemsByPriority.length; i++) {
			if (i < overflowCount) {
				itemsByPriority[i].classes = `${itemsByPriority[i].classes} sapWCShellBarHiddenIcon`;
				itemsByPriority[i].style = `order: -1`;
			} else {
				focusableItems.push(itemsByPriority[i]);
			}
		}

		this._focussedItem = this._findInitiallyFocussedItem(focusableItems);

		return itemsByPriority;
	}

	_findInitiallyFocussedItem(items) {
		items.sort((item1, item2) => {
			const order1 = parseInt(item1.style.split("order: ")[1]);
			const order2 = parseInt(item2.style.split("order: ")[1]);

			if (order1 === order2) {
				return 0;
			}

			if (order1 < order2) {
				return -1;
			}

			return 1;
		});

		const focussedItem = items.filter(item => {
			return (item.classes.indexOf("sapWCShellBarUnsetIcon") === -1)
				&& (item.classes.indexOf("sapWCShellBarOverflowIcon") === -1)
				&& (item.classes.indexOf("sapWCShellBarHiddenIcon") === -1);
		})[0];

		return focussedItem;
	}

	_overflowActions() {
		const size = this._handleBarBreakpoints();

		if (size === "S") {
			return this._handleSizeS();
		}

		const items = this._handleActionsOverflow();
		this._itemsInfo = items;
	}

	_toggleActionPopover() {
		const popover = this.shadowRoot.querySelector(".sapWCShellBarOverflowPopover");
		const overflowButton = this.shadowRoot.querySelector(".sapWCShellBarOverflowIcon");
		popover.openBy(overflowButton);
	}

	onkeydown(event) {
		if (isEscape(event)) {
			return this._handleEscape(event);
		}

		if (isSpace(event)) {
			event.preventDefault();
		}
	}

	_handleEscape() {
		const searchButton = this.shadowRoot.querySelector(".sapWCShellBarSearchIcon");

		if (this._showBlockLayer) {
			this._showBlockLayer = false;

			setTimeout(() => {
				searchButton.focus();
			}, 0);
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	_handleSearchIconPress(event) {
		const searchField = this.shadowRoot.querySelector(`#${this._id}-searchfield-wrapper`);
		const triggeredByOverflow = event.target.tagName.toLowerCase() === "ui5-li";
		const overflowButton = this.shadowRoot.querySelector(".sapWCShellBarOverflowIcon");
		const overflowButtonRect = overflowButton.getBoundingClientRect();
		const isRTL = getRTL();
		let right = "";

		if (isRTL) {
			right = `${(triggeredByOverflow ? overflowButton.offsetLeft : event.target.offsetLeft) + overflowButtonRect.width}px`;
		} else {
			right = `calc(100% - ${triggeredByOverflow ? overflowButton.offsetLeft : event.target.offsetLeft}px)`;
		}

		this._searchField = Object.assign({}, this._searchField, {
			"right": right,
		});

		this._showBlockLayer = true;

		setTimeout(() => {
			const inputSlot = searchField.children[0];

			if (inputSlot) {
				inputSlot.assignedNodes()[0].focus();
			}
		}, 100);
	}

	_handleCustomActionPress(event) {
		const refItemId = event.target.getAttribute("data-ui5-external-action-item-id");
		const actions = this.shadowRoot.querySelectorAll(".sapWCShellBarItemCustomAction");
		let elementIndex = [].indexOf.apply(actions, [event.target]);

		if (this.searchField) {
			elementIndex += 1;
		}

		this._itemNav.currentIndex = elementIndex;

		if (refItemId) {
			const shellbarItem = this.items.filter(item => {
				return item.shadowRoot.querySelector(`#${refItemId}`);
			})[0];

			const prevented = !shellbarItem.fireEvent("press", { targetRef: event.target }, true);

			this._defaultItemPressPrevented = prevented;
		}
	}

	_handleOverflowPress(event) {
		this._toggleActionPopover();
	}

	_handleNotificationsPress(event) {
		this.fireEvent("notificationsPress", {
			targetRef: this.shadowRoot.querySelector(".sapWCShellBarBellIcon"),
		});
	}

	_handleProfilePress(event) {
		this.fireEvent("profilePress", {
			targetRef: this.shadowRoot.querySelector(".sapWCShellBarImageButton"),
		});
	}

	_handleProductSwitchPress(event) {
		this.fireEvent("productSwitchPress", {
			targetRef: this.shadowRoot.querySelector(".sapWCShellBarIconProductSwitch"),
		});
	}

	/**
	 * Returns all items that will be placed in the right of the bar as icons / dom elements.
	 * @param {Boolean} showOverflowButton Determines if overflow button should be visible (not overflowing)
	 */
	_getAllItems(showOverflowButton) {
		let domOrder = -1;

		const items = [
			{
				src: "sap-icon://search",
				text: "Search",
				classes: `${this.searchField ? "" : "sapWCShellBarUnsetIcon"} sapWCShellBarSearchIcon sapWCShellBarIconButton`,
				priority: 4,
				domOrder: this.searchField ? (++domOrder) : -1,
				style: `order: ${this.searchField ? 1 : -10}`,
				id: `${this._id}-item-${1}`,
				press: this._handleSearchIconPress.bind(this),
				_tabIndex: "-1",
			},
			...this.items.map((item, index) => {
				return {
					src: item.src,
					id: item._id,
					refItemid: item._id,
					text: item.text,
					classes: "sapWCShellBarItemCustomAction sapWCShellBarIconButton",
					priority: 1,
					domOrder: (++domOrder),
					style: `order: ${2}`,
					show: true,
					press: this._handleCustomActionPress.bind(this),
					_tabIndex: "-1",
				};
			}),
			{
				src: "sap-icon://bell",
				text: "Notifications",
				classes: `${this.showNotifications ? "" : "sapWCShellBarUnsetIcon"} sapWCShellBarBellIcon sapWCShellBarIconButton`,
				priority: 3,
				style: `order: ${this.showNotifications ? 3 : -10}`,
				id: `${this._id}-item-${2}`,
				show: this.showNotifications,
				domOrder: this.showNotifications ? (++domOrder) : -1,
				press: this._handleNotificationsPress.bind(this),
				_tabIndex: "-1",
			},
			{
				src: "sap-icon://overflow",
				text: "Overflow",
				classes: `${showOverflowButton ? "" : "sapWCShellBarHiddenIcon"} sapWCOverflowButtonShown sapWCShellBarOverflowIcon sapWCShellBarIconButton`,
				priority: 5,
				order: 4,
				style: `order: ${showOverflowButton ? 4 : -1}`,
				domOrder: showOverflowButton ? (++domOrder) : -1,
				id: `${this.id}-item-${5}`,
				press: this._handleOverflowPress.bind(this),
				_tabIndex: "-1",
				show: true,
			},
			{
				text: "Person",
				classes: `${this.profile ? "" : "sapWCShellBarUnsetIcon"} sapWCShellBarImageButton sapWCShellBarIconButton`,
				priority: 4,
				subclasses: "sapWCShellBarImageButtonImage",
				style: `order: ${this.profile ? 5 : -10};`,
				subStyles: `${this.profile ? `background-image: url(${this.profile})` : ""}`,
				id: `${this._id}-item-${3}`,
				domOrder: this.profile ? (++domOrder) : -1,
				show: this.profile,
				press: this._handleProfilePress.bind(this),
				_tabIndex: "-1",
			},
			{
				src: "sap-icon://grid",
				text: "Product Switch",
				classes: `${this.showProductSwitch ? "" : "sapWCShellBarUnsetIcon"} sapWCShellBarIconButton sapWCShellBarIconProductSwitch`,
				priority: 2,
				style: `order: ${this.showProductSwitch ? 6 : -10}`,
				id: `${this._id}-item-${4}`,
				show: this.showProductSwitch,
				domOrder: this.showProductSwitch ? (++domOrder) : -1,
				press: this._handleProductSwitchPress.bind(this),
				_tabIndex: "-1",
			},
		];
		return items;
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

Bootstrap.boot().then(_ => {
	ShellBar.define();
});

export default ShellBar;
