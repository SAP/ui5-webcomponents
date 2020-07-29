import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import StandardListItem from "@ui5/webcomponents/dist/StandardListItem.js";
import List from "@ui5/webcomponents/dist/List.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/icons/search.js";
import "@ui5/webcomponents-icons/dist/icons/bell.js";
import "@ui5/webcomponents-icons/dist/icons/overflow.js";
import "@ui5/webcomponents-icons/dist/icons/grid.js";

import {
	SHELLBAR_LABEL,
	SHELLBAR_LOGO,
	SHELLBAR_COPILOT,
	SHELLBAR_NOTIFICATIONS,
	SHELLBAR_PROFILE,
	SHELLBAR_PRODUCTS,
	SHELLBAR_SEARCH,
	SHELLBAR_OVERFLOW,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import ShellBarTemplate from "./generated/templates/ShellBarTemplate.lit.js";
import ShellBarPopoverTemplate from "./generated/templates/ShellBarPopoverTemplate.lit.js";

// Styles
import styles from "./generated/themes/ShellBar.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-shellbar",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.fiori.ShellBar.prototype */ {

		/**
		 * Defines the <code>primaryTitle</code>.
		 * <br><br>
		 * <b>Note:</b> The <code>primaryTitle</code> would be hidden on S screen size (less than approx. 700px).
		 * @type {string}
		 * @defaultvalue ""
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
		 * @defaultvalue ""
		 * @public
		 */
		secondaryTitle: {
			type: String,
		},

		/**
		 * Defines the <code>notificationCount</code>,
		 * displayed in the notification icon top-right corner.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		notificationCount: {
			type: String,
		},

		/**
		 * Defines, if the notification icon would be displayed.
		 * @type {boolean}
		 * @defaultvalue false
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
		showSearchField: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		coPilotActive: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		withLogo: {
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

		_menuPopoverItems: {
			type: String,
			multiple: true,
		},
		_menuPopoverExpanded: {
			type: Boolean,
			noAttribute: true,
		},
		_overflowPopoverExpanded: {
			type: Boolean,
			noAttribute: true,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.fiori.ShellBar.prototype */ {
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
		 * You can pass <code>ui5-avatar</code> to set the profile image/icon.
		 * If no profile slot is set - profile will be excluded from actions.
		 * @type {HTMLElement}
		 * @slot
		 * @since 1.0.0-rc.6
		 * @public
		 */
		profile: {
			type: HTMLElement,
		},

		/**
		 * Defines the logo of the <code>ui5-shellbar</code>.
		 * For example, you can use <code>ui5-avatar</code> or <code>img</code> elements as logo.
		 * @type {HTMLElement}
		 * @slot
		 * @since 1.0.0-rc.8
		 * @public
		 */
		logo: {
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
	events: /** @lends sap.ui.webcomponents.fiori.ShellBar.prototype */ {
		/**
		 *
		 * Fired, when the notification icon is activated.
		 *
		 *
		 * @event sap.ui.webcomponents.fiori.ShellBar#notifications-click
		 * @param {HTMLElement} targetRef dom ref of the activated element
		 * @public
		 */
		"notifications-click": {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the profile slot is present.
		 *
		 * @event sap.ui.webcomponents.fiori.ShellBar#profile-click
		 * @param {HTMLElement} targetRef dom ref of the activated element
		 * @public
		 */
		"profile-click": {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the product switch icon is activated.
		 * <b>Note:</b> You can prevent closing of oveflow popover by calling <code>event.preventDefault()</code>.
		 *
		 * @event sap.ui.webcomponents.fiori.ShellBar#product-switch-click
		 * @param {HTMLElement} targetRef dom ref of the activated element
		 * @public
		 */
		"product-switch-click": {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the logo is activated.
		 *
		 * @event sap.ui.webcomponents.fiori.ShellBar#logo-click
		 * @param {HTMLElement} targetRef dom ref of the activated element
		 * @since 0.10
		 * @public
		 */
		"logo-click": {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when the co pilot is activated.
		 *
		 * @event sap.ui.webcomponents.fiori.ShellBar#co-pilot-click
		 * @param {HTMLElement} targetRef dom ref of the activated element
		 * @since 0.10
		 * @public
		 */
		"co-pilot-click": {
			detail: {
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired, when a menu item is activated
		 * <b>Note:</b> You can prevent closing of oveflow popover by calling <code>event.preventDefault()</code>.
		 *
		 * @event sap.ui.webcomponents.fiori.ShellBar#menu-item-click
		 * @param {HTMLElement} item dom ref of the activated list item
		 * @since 0.10
		 * @public
		 */
		"menu-item-click": {
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
 * and includes numerous built-in features, such as: logo, profile image/icon, title, search field, notifications and so on.
 * <br><br>
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents-fiori/dist/ShellBar";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.ShellBar
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

	static get staticAreaTemplate() {
		return ShellBarPopoverTemplate;
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

		this._actionList = {
			itemPress: event => {
				if (!this._defaultItemPressPrevented) {
					this.overflowPopover.close();
				}

				this._defaultItemPressPrevented = false;
			},
		};

		this.menuItemsObserver = new MutationObserver(() => {
			this._updateClonedMenuItems();
		});

		this._header = {
			press: async () => {
				this._updateClonedMenuItems();

				if (this.hasMenuItems) {
					this.updateStaticAreaItemContentDensity();
					const menuPopover = await this._getMenuPopover();
					menuPopover.openBy(this.shadowRoot.querySelector(".ui5-shellbar-menu-button"));
				}
			},
		};

		this._searchField = {
			left: 0,
		};

		this._handleResize = async event => {
			await this._getResponsivePopover();
			this.overflowPopover.close();
			this._overflowActions();
		};

		this.i18nBundle = getI18nBundle("@ui5/webcomponents-fiori");
	}

	_menuItemPress(event) {
		this.fireEvent("menu-item-click", {
			item: event.detail.item,
		}, true);
	}

	_logoPress() {
		this.fireEvent("logo-click", {
			targetRef: this.shadowRoot.querySelector(".ui5-shellbar-logo"),
		});
	}

	_menuPopoverBeforeOpen() {
		this._menuPopoverExpanded = true;
	}

	_menuPopoverAfterClose() {
		this._menuPopoverExpanded = false;
	}

	_overflowPopoverBeforeOpen() {
		this._overflowPopoverExpanded = true;
	}

	_overflowPopoverAfterClose() {
		this._overflowPopoverExpanded = false;
	}

	_logoKeyup(event) {
		if (isSpace(event)) {
			this._logoPress();
		}
	}

	_logoKeydown(event) {
		if (isSpace(event)) {
			event.preventDefault();
			return;
		}

		if (isEnter(event)) {
			this._logoPress();
		}
	}

	_fireCoPilotClick() {
		this.fireEvent("co-pilot-click", {
			targetRef: this.shadowRoot.querySelector(".ui5-shellbar-coPilot"),
		});
	}

	_coPilotClick() {
		this._fireCoPilotClick();
	}

	_coPilotKeydown(event) {
		if (isSpace(event)) {
			this.coPilotActive = true;
			event.preventDefault();
			return;
		}

		if (isEnter(event)) {
			this.coPilotActive = true;
			this._fireCoPilotClick();
		}
	}

	_coPilotKeyup(event) {
		if (isSpace(event)) {
			this._fireCoPilotClick();
		}
		this.coPilotActive = false;
	}

	onBeforeRendering() {
		const animationsOn = getAnimationMode() === AnimationMode.Full;
		const coPilotAnimation = getFeature("CoPilotAnimation");
		this.coPilot = coPilotAnimation && animationsOn ? coPilotAnimation : { animated: false };
		this.withLogo = this.hasLogo;

		this._hiddenIcons = this._itemsInfo.filter(info => {
			const isHidden = (info.classes.indexOf("ui5-shellbar-hidden-button") !== -1);
			const isSet = info.classes.indexOf("ui5-shellbar-invisible-button") === -1;
			const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;

			return isHidden && isSet && !isOverflowIcon;
		});

		this._observeMenuItems();
	}

	onAfterRendering() {
		this._overflowActions();
	}

	/**
	 * Closes the overflow area.
	 * Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event
	 * @public
	 */
	closeOverflow() {
		if (this.overflowPopover) {
			this.overflowPopover.close();
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
			const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.hasProfile);

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
		const isRTL = this.effectiveDir === "rtl";

		let overflowCount = [].filter.call(icons, icon => {
			const iconRect = icon.getBoundingClientRect();

			if (isRTL) {
				return (iconRect.left + iconRect.width) > (rightContainerRect.left + rightContainerRect.width);
			}

			return iconRect.left < rightContainerRect.left;
		});

		overflowCount = overflowCount.length;

		const items = this._getAllItems(!!overflowCount);

		const itemsByPriority = items.sort((item1, item2) => {
			if (item1.priority > item2.priority) {
				return 1;
			}

			if (item1.priority < item2.priority) {
				return -1;
			}

			return 0;
		});

		for (let i = 0; i < itemsByPriority.length; i++) {
			if (i < overflowCount) {
				itemsByPriority[i].classes = `${itemsByPriority[i].classes} ui5-shellbar-hidden-button`;
				itemsByPriority[i].style = `order: -1`;
			}
		}

		return itemsByPriority;
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
		const overflowButton = this.shadowRoot.querySelector(".ui5-shellbar-overflow-button");
		this.updateStaticAreaItemContentDensity();
		this.overflowPopover.openBy(overflowButton);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
	}

	onExitDOM() {
		this.menuItemsObserver.disconnect();
		ResizeHandler.deregister(this, this._handleResize);
	}

	_handleSearchIconPress(event) {
		this.showSearchField = !this.showSearchField;

		if (!this.showSearchField) {
			return;
		}

		const searchField = this.shadowRoot.querySelector(`#${this._id}-searchfield-wrapper`);
		const triggeredByOverflow = event.target.tagName.toLowerCase() === "ui5-li";
		const overflowButton = this.shadowRoot.querySelector(".ui5-shellbar-overflow-button");
		const overflowButtonRect = overflowButton.getBoundingClientRect();
		const isRTL = this.effectiveDir === "rtl";
		let right = "";

		if (isRTL) {
			right = `${(triggeredByOverflow ? overflowButton.offsetLeft : event.target.offsetLeft) + overflowButtonRect.width}px`;
		} else {
			right = `calc(100% - ${triggeredByOverflow ? overflowButton.offsetLeft : event.target.offsetLeft}px)`;
		}

		this._searchField = Object.assign({}, this._searchField, {
			"right": right,
		});


		const inputSlot = searchField.children[0];
		const input = inputSlot && inputSlot.assignedNodes()[0];

		// update the state immediately
		if (input) {
			input.focused = true;
		}

		// move the focus later
		setTimeout(() => {
			if (input) {
				input.focus();
			}
		}, 100);
	}

	_handleCustomActionPress(event) {
		const refItemId = event.target.getAttribute("data-ui5-external-action-item-id");

		if (refItemId) {
			const shellbarItem = this.items.find(item => {
				return item.shadowRoot.querySelector(`#${refItemId}`);
			});

			const prevented = !shellbarItem.fireEvent("item-click", { targetRef: event.target }, true);

			this._defaultItemPressPrevented = prevented;
		}
	}

	_handleOverflowPress(event) {
		this._toggleActionPopover();
	}

	_handleNotificationsPress(event) {
		const notificationIconRef = this.shadowRoot.querySelector(".ui5-shellbar-bell-button");

		this._defaultItemPressPrevented = !this.fireEvent("notifications-click", {
			targetRef: notificationIconRef.classList.contains("ui5-shellbar-hidden-button") ? event.target : notificationIconRef,
		}, true);
	}

	_handleProfilePress(event) {
		this.fireEvent("profile-click", {
			targetRef: this.shadowRoot.querySelector(".ui5-shellbar-image-button"),
		});
	}

	_handleProductSwitchPress(event) {
		const buttonRef = this.shadowRoot.querySelector(".ui5-shellbar-button-product-switch");

		this._defaultItemPressPrevented = !this.fireEvent("product-switch-click", {
			targetRef: buttonRef.classList.contains("ui5-shellbar-hidden-button") ? event.target : buttonRef,
		}, true);
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
			},
			...this.items.map((item, index) => {
				return {
					icon: item.icon,
					id: item._id,
					count: item.count || undefined,
					refItemid: item._id,
					text: item.text,
					classes: "ui5-shellbar-custom-item ui5-shellbar-button",
					priority: 1,
					domOrder: (++domOrder),
					style: `order: ${2}`,
					show: true,
					press: this._handleCustomActionPress.bind(this),
					custom: true,
					title: item.title,
					stableDomRef: item.stableDomRef,
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
				show: true,
			},
			{
				text: "Person",
				classes: `${this.hasProfile ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-image-button ui5-shellbar-button`,
				priority: 4,
				style: `order: ${this.hasProfile ? 5 : -10};`,
				profile: true,
				id: `${this._id}-item-${3}`,
				domOrder: this.hasProfile ? (++domOrder) : -1,
				show: this.hasProfile,
				press: this._handleProfilePress.bind(this),
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

	_updateClonedMenuItems() {
		this._menuPopoverItems = [];

		this.menuItems.forEach(item => {
			// clone the menuItem and remove the slot="menuItems",
			// otherwise would not be slotted in the internal ui5-li
			const clonedItem = item.cloneNode(true);
			clonedItem.removeAttribute("slot");

			this._menuPopoverItems.push(clonedItem);
		});
	}

	_observeMenuItems() {
		this.menuItems.forEach(item => {
			this.menuItemsObserver.observe(item, {
				characterData: true,
				childList: true,
				subtree: true,
				attributes: true,
			});
		});
	}

	async _getResponsivePopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.overflowPopover = staticAreaItem.querySelector(".ui5-shellbar-overflow-popover");
		this.menuPopover = staticAreaItem.querySelector(".ui5-shellbar-menu-popover");
	}

	async _getMenuPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector(".ui5-shellbar-menu-popover");
	}

	isIconHidden(name) {
		const itemInfo = this._itemsInfo.find(item => item.icon === name);

		if (!itemInfo) {
			return false;
		}

		return itemInfo.classes.indexOf("ui5-shellbar-hidden-button") !== -1;
	}

	get classes() {
		return {
			wrapper: {
				"ui5-shellbar-root": true,
				"ui5-shellbar-with-searchfield": this.searchField.length,
			},
			button: {
				"ui5-shellbar-menu-button--interactive": this.hasMenuItems,
				"ui5-shellbar-menu-button": true,
			},
			items: {
				notification: {
					"ui5-shellbar-hidden-button": this.isIconHidden("bell"),
				},
				product: {
					"ui5-shellbar-hidden-button": this.isIconHidden("grid"),
				},
				search: {
					"ui5-shellbar-hidden-button": this.isIconHidden("search"),
				},
				overflow: {
					"ui5-shellbar-hidden-button": this.isIconHidden("overflow"),
				},
			},
		};
	}

	get styles() {
		return {
			searchField: {
				[this.effectiveDir === "rtl" ? "left" : "right"]: this._searchField.right,
				"top": `${parseInt(this._searchField.top)}px`,
			},
			items: {
				notification: {
					"order": this.isIconHidden("bell") ? "-1" : "3",
				},
				overflow: {
					"order": this.isIconHidden("overflow") ? "-1" : "4",
				},
				profile: {
					"order": this.hasProfile ? "5" : "-1",
				},
				product: {
					"order": this.isIconHidden("grid") ? "-1" : "6",
				},
			},
		};
	}

	get customItemsInfo() {
		return this._itemsInfo.filter(itemInfo => !!itemInfo.custom);
	}

	get nonFocusableLogo() {
		return this.breakpointSize === "S" && this.hasMenuItems;
	}

	get hasFocusableLogo() {
		return this.hasLogo && !this.nonFocusableLogo;
	}

	get hasNonFocusableLogo() {
		return this.hasLogo && this.nonFocusableLogo;
	}

	get hasLogo() {
		return !!this.logo.length;
	}

	get showArrowDown() {
		return this.primaryTitle || this.hasInteractvieLogo;
	}

	get popoverHorizontalAlign() {
		return this.effectiveDir === "rtl" ? "Left" : "Right";
	}

	get hasSearchField() {
		return !!this.searchField.length;
	}

	get hasProfile() {
		return !!this.profile.length;
	}

	get hasMenuItems() {
		return this.menuItems.length > 0;
	}

	get menuBtnHasPopup() {
		return this.hasMenuItems ? true : undefined;
	}

	get menuBtnTabindex() {
		return this.hasMenuItems ? "0" : "-1";
	}

	get menuPopoverExpanded() {
		return this.hasMenuItems ? this._menuPopoverExpanded : undefined;
	}

	get _shellbarText() {
		return this.i18nBundle.getText(SHELLBAR_LABEL);
	}

	get _logoText() {
		return this.i18nBundle.getText(SHELLBAR_LOGO);
	}

	get _copilotText() {
		return this.i18nBundle.getText(SHELLBAR_COPILOT);
	}

	get _notificationsText() {
		return this.i18nBundle.getText(SHELLBAR_NOTIFICATIONS, this.notificationCount);
	}

	get _profileText() {
		return this.i18nBundle.getText(SHELLBAR_PROFILE);
	}

	get _productsText() {
		return this.i18nBundle.getText(SHELLBAR_PRODUCTS);
	}

	get _searchText() {
		return this.i18nBundle.getText(SHELLBAR_SEARCH);
	}

	get _overflowText() {
		return this.i18nBundle.getText(SHELLBAR_OVERFLOW);
	}

	get accInfo() {
		return {
			notifications: {
				"title": this._notificationsText,
			},
			profile: {
				"title": this._profileText,
			},
			products: {
				"title": this._productsText,
			},
			search: {
				"ariaExpanded": this.showSearchField,
				"title": this._searchText,
			},
			overflow: {
				"title": this._overflowText,
				"ariaHaspopup": true,
				"ariaExpanded": this._overflowPopoverExpanded,
			},
		};
	}

	static async onDefine() {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents-fiori"),
			Button.define(),
			List.define(),
			Popover.define(),
			StandardListItem.define(),
		]);
	}
}

ShellBar.define();

export default ShellBar;
