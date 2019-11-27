import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { isSpace, isEscape } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import StandardListItem from "@ui5/webcomponents/dist/StandardListItem.js";
import List from "@ui5/webcomponents/dist/List.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/icons/search.js";
import "@ui5/webcomponents-icons/dist/icons/bell.js";
import "@ui5/webcomponents-icons/dist/icons/overflow.js";
import "@ui5/webcomponents-icons/dist/icons/grid.js";

// Template
import ShellBarTemplate from "./generated/templates/ShellBarTemplate.lit.js";

// Styles
import styles from "./generated/themes/ShellBar.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-shellbar",
	properties: /** @lends  sap.ui.webcomponents.fiori.ShellBar.prototype */ {

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
		 * <br><b>Note:</b> By default the co-pilot is displayed as static SVG.
		 * If you need an animated co-pilot, you can import the <code>"@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js"</code> module as add-on feature.
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

		/**
		 * @private
		 */
		showBlockLayer: {
			type: Boolean,
		},

		_itemsInfo: {
			type: Object,
		},

		_actionList: {
			type: Object,
		},

		_searchField: {
			type: Object,
		},

		_header: {
			type: Object,
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

		this._itemsInfo = [];
		this._isInitialRendering = true;
		this._focusedItem = null;

		// marks if preventDefault() is called in item's press handler
		this._defaultItemPressPrevented = false;

		const that = this;

		this._actionList = {
			itemPress: event => {
				const popover = this.shadowRoot.querySelector(".ui5-shellbar-overflow-popover");

				if (!this._defaultItemPressPrevented) {
					popover.close();
				}

				this._defaultItemPressPrevented = false;
			},
		};

		this._header = {
			press: event => {
				const menuPopover = this.shadowRoot.querySelector(".ui5-shellbar-menu-popover");

				if (this.menuItems.length) {
					menuPopover.openBy(this.shadowRoot.querySelector(".ui5-shellbar-menu-button"));
				}
			},
		};

		this._itemNav = new ItemNavigation(this);

		this._itemNav.getItemsCallback = () => {
			const items = that._itemsInfo.filter(info => {
				const isVisible = info.classes.indexOf("ui5-shellbar-hidden-button") === -1;
				const isSet = info.classes.indexOf("ui5-shellbar-invisible-button") === -1;
				return isVisible && isSet;
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
				const mappingItem = items.find(item => {
					return item.id === stateItem.id;
				});

				const clone = JSON.parse(JSON.stringify(stateItem));
				clone._tabIndex = mappingItem ? mappingItem._tabIndex : "-1";
				clone.press = stateItem.press;

				return clone;
			});

			that._updateItemsInfo(newItems);
		};

		this._searchField = {
			left: 0,
			focusout: event => {
				this.showBlockLayer = false;
			},
		};

		this._handleResize = event => {
			this.shadowRoot.querySelector(".ui5-shellbar-overflow-popover").close();
			this._overflowActions();
		};
	}

	_menuItemPress(event) {
		this.fireEvent("menuItemClick", {
			item: event.detail.item,
		});
	}

	_logoPress(event) {
		this.fireEvent("logoClick", {
			targetRef: this.shadowRoot.querySelector(".ui5-shellbar-logo"),
		});
	}

	_coPilotPress(event) {
		this.fireEvent("coPilotClick", {
			targetRef: this.shadowRoot.querySelector(".ui5-shellbar-coPilot"),
		});
	}

	onBeforeRendering() {
		const animationsOn = getAnimationMode() === AnimationMode.Full;
		const coPilotAnimation = getFeature("CoPilotAnimation");
		this.coPilot = coPilotAnimation && animationsOn ? coPilotAnimation : { animated: false };

		this._hiddenIcons = this._itemsInfo.filter(info => {
			const isHidden = (info.classes.indexOf("ui5-shellbar-hidden-button") !== -1);
			const isSet = info.classes.indexOf("ui5-shellbar-invisible-button") === -1;
			const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;

			return isHidden && isSet && !isOverflowIcon;
		});
	}

	onAfterRendering() {
		this._overflowActions();

		if (this._focusedItem) {
			this._focusedItem._tabIndex = "0";
		}
	}

	/**
	 * Closes the overflow area.
	 * Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event
	 * @public
	 */
	closeOverflow() {
		const popover = this.shadowRoot.querySelector(".ui5-shellbar-overflow-popover");

		if (popover) {
			popover.close();
		}
	}

	_handleBarBreakpoints() {
		const width = this.getBoundingClientRect().width;
		const breakpoints = ShellBar.FIORI_3_BREAKPOINTS;

		const size = breakpoints.find(bp1 => width < bp1) || ShellBar.FIORI_3_BREAKPOINTS[ShellBar.FIORI_3_BREAKPOINTS.length - 1];
		const mappedSize = ShellBar.FIORI_3_BREAKPOINTS_MAP[size];

		if (this.breakpointSize !== mappedSize) {
			this.breakpointSize = mappedSize;
		}

		return mappedSize;
	}

	_handleSizeS() {
		const hasIcons = this.showNotifications || this.showProductSwitch || this.searchField.length || this.items.length;

		const newItems = this._getAllItems(hasIcons).map(info => {
			const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;
			const isImageIcon = info.classes.indexOf("ui5-shellbar-image-button") !== -1;
			const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.profile);

			return Object.assign({}, info, {
				classes: `${info.classes} ${shouldStayOnScreen ? "" : "ui5-shellbar-hidden-button"} ui5-shellbar-button`,
				style: `order: ${shouldStayOnScreen ? 1 : -1}`,
			});
		});

		this._updateItemsInfo(newItems);
	}

	_handleActionsOverflow() {
		const rightContainerRect = this.shadowRoot.querySelector(".ui5-shellbar-overflow-container-right").getBoundingClientRect();
		const icons = this.shadowRoot.querySelectorAll(".ui5-shellbar-button:not(.ui5-shellbar-overflow-button):not(.ui5-shellbar-invisible-button)");
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
				itemsByPriority[i].classes = `${itemsByPriority[i].classes} ui5-shellbar-hidden-button`;
				itemsByPriority[i].style = `order: -1`;
			} else {
				focusableItems.push(itemsByPriority[i]);
			}
		}

		this._focusedItem = this._findInitiallyFocusedItem(focusableItems);

		return itemsByPriority;
	}

	_findInitiallyFocusedItem(items) {
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

		const focusedItem = items.find(item => {
			return (item.classes.indexOf("ui5-shellbar-invisible-button") === -1)
				&& (item.classes.indexOf("ui5-shellbar-overflow-button") === -1)
				&& (item.classes.indexOf("ui5-shellbar-hidden-button") === -1);
		});

		return focusedItem;
	}

	_overflowActions() {
		const size = this._handleBarBreakpoints();

		if (size === "S") {
			return this._handleSizeS();
		}

		const newItems = this._handleActionsOverflow();
		this._updateItemsInfo(newItems);
	}

	_toggleActionPopover() {
		const popover = this.shadowRoot.querySelector(".ui5-shellbar-overflow-popover");
		const overflowButton = this.shadowRoot.querySelector(".ui5-shellbar-overflow-button");
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
		const searchButton = this.shadowRoot.querySelector(".ui5-shellbar-search-button");

		if (this.showBlockLayer) {
			this.showBlockLayer = false;

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
		const overflowButton = this.shadowRoot.querySelector(".ui5-shellbar-overflow-button");
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

		this.showBlockLayer = true;

		setTimeout(() => {
			const inputSlot = searchField.children[0];

			if (inputSlot) {
				inputSlot.assignedNodes()[0].focus();
			}
		}, 100);
	}

	_handleCustomActionPress(event) {
		const refItemId = event.target.getAttribute("data-ui5-external-action-item-id");
		const actions = this.shadowRoot.querySelectorAll(".ui5-shellbar-custom-item");
		let elementIndex = [].indexOf.apply(actions, [event.target]);

		if (this.searchField.length) {
			elementIndex += 1;
		}

		this._itemNav.currentIndex = elementIndex;

		if (refItemId) {
			const shellbarItem = this.items.find(item => {
				return item.shadowRoot.querySelector(`#${refItemId}`);
			});

			const prevented = !shellbarItem.fireEvent("itemClick", { targetRef: event.target }, true);

			this._defaultItemPressPrevented = prevented;
		}
	}

	_handleOverflowPress(event) {
		this._toggleActionPopover();
	}

	_handleNotificationsPress(event) {
		this.fireEvent("notificationsClick", {
			targetRef: this.shadowRoot.querySelector(".ui5-shellbar-bell-button"),
		});
	}

	_handleProfilePress(event) {
		this.fireEvent("profileClick", {
			targetRef: this.shadowRoot.querySelector(".ui5-shellbar-image-button"),
		});
	}

	_handleProductSwitchPress(event) {
		this.fireEvent("productSwitchClick", {
			targetRef: this.shadowRoot.querySelector(".ui5-shellbar-button-product-switch"),
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
				icon: "search",
				text: "Search",
				classes: `${this.searchField.length ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-search-button ui5-shellbar-button`,
				priority: 4,
				domOrder: this.searchField.length ? (++domOrder) : -1,
				style: `order: ${this.searchField.length ? 1 : -10}`,
				id: `${this._id}-item-${1}`,
				press: this._handleSearchIconPress.bind(this),
				_tabIndex: "-1",
			},
			...this.items.map((item, index) => {
				return {
					icon: item.icon,
					id: item._id,
					refItemid: item._id,
					text: item.text,
					classes: "ui5-shellbar-custom-item ui5-shellbar-button",
					priority: 1,
					domOrder: (++domOrder),
					style: `order: ${2}`,
					show: true,
					press: this._handleCustomActionPress.bind(this),
					_tabIndex: "-1",
				};
			}),
			{
				icon: "bell",
				text: "Notifications",
				classes: `${this.showNotifications ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-bell-button ui5-shellbar-button`,
				priority: 3,
				style: `order: ${this.showNotifications ? 3 : -10}`,
				id: `${this._id}-item-${2}`,
				show: this.showNotifications,
				domOrder: this.showNotifications ? (++domOrder) : -1,
				press: this._handleNotificationsPress.bind(this),
				_tabIndex: "-1",
			},
			{
				icon: "overflow",
				text: "Overflow",
				classes: `${showOverflowButton ? "" : "ui5-shellbar-hidden-button"} ui5-shellbar-overflow-button-shown ui5-shellbar-overflow-button ui5-shellbar-button`,
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
				classes: `${this.profile ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-image-button ui5-shellbar-button`,
				priority: 4,
				subclasses: "ui5-shellbar-image-buttonImage",
				style: `order: ${this.profile ? 5 : -10};`,
				subStyles: `${this.profile ? `background-image: url(${this.profile})` : ""}`,
				id: `${this._id}-item-${3}`,
				domOrder: this.profile ? (++domOrder) : -1,
				show: this.profile,
				press: this._handleProfilePress.bind(this),
				_tabIndex: "-1",
			},
			{
				icon: "grid",
				text: "Product Switch",
				classes: `${this.showProductSwitch ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-button ui5-shellbar-button-product-switch`,
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

	_updateItemsInfo(newItems) {
		const isDifferent = JSON.stringify(this._itemsInfo) !== JSON.stringify(newItems);
		if (isDifferent) {
			this._itemsInfo = newItems;
		}
	}

	get classes() {
		return {
			wrapper: {
				"ui5-shellbar-root": true,
				"ui5-shellbar-with-searchfield": this.searchField.length,
			},
			button: {
				"ui5-shellbar-menu-button--interactive": !!this.menuItems.length,
				"ui5-shellbar-menu-button": true,
			},
		};
	}

	get styles() {
		return {
			searchField: {
				[getRTL() ? "left" : "right"]: this._searchField.right,
				"top": `${parseInt(this._searchField.top)}px`,
			},
		};
	}

	get interactiveLogo() {
		return this.breakpointSize === "S";
	}

	get showArrowDown() {
		return this.primaryTitle || (this.logo && this.interactiveLogo);
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
