import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	isLeft,
	isRight,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import {
	isPhone,
	isTablet,
	isDesktop,
} from "@ui5/webcomponents-base/dist/Device.js";
import {
	getI18nBundle,
} from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import List from "./List.js";
import StandardListItem from "./StandardListItem.js";
import Icon from "./Icon.js";
import staticAreaMenuTemplate from "./generated/templates/MenuTemplate.lit.js";
import {
	MENU_BACK_BUTTON_ARIA_LABEL,
	MENU_CLOSE_BUTTON_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import staticAreaMenuCss from "./generated/themes/Menu.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-menu",
	properties: /** @lends sap.ui.webcomponents.main.Menu.prototype */ {
		/**
		 * Defines the header text of the menu (displayed on mobile).
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		 headerText: {
			type: String,
		},

		/**
		 * Defines if the menu is sub-menu (not first-level).
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		_isSubMenu: {
			type: Boolean,
			noAttribute: true,
		},

		/**
		 * Stores parent menu item (if there is such).
		 * @type {object}
		 * @private
		 */
		 _parentMenuItem: {
			type: Object,
		},

		/**
		 * Stores menu item that have sub-menu opened.
		 * @type {object}
		 * @private
		 */
		 _openedSubMenuItem: {
			type: Object,
		},

		/**
		 * Stores id of a list item that opened sub-menu.
		 * @type {string}
		 * @private
		 */
		 _subMenuOpenerId: {
			type: String,
		},

		/**
		 * Defines the currently available menu items.
		 * (in case of non-phone devices these are the items of the menu,
		 * but for phone devices the items of the currently opened sub-menu
		 * will be populated here)
		 * @type {array}
		 * @private
		 */
		 _currentItems: {
			type: Object,
			multiple: true,
		},

		/**
		 * Stores a list of parent menu items for each sub-menu (on phone).
		 * @type {array}
		 * @private
		 */
		 _parentItemsStack: {
			type: Object,
			multiple: true,
		},

		/**
		 * Stores a responsive popover when it is opened.
		 * @type {object}
		 * @private
		 */
		_popover: {
			type: Object,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Menu.prototype */ {
		/**
		 * Defines the items of this component.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-menu-item</code> for the intended design.
		 *
		 * @type {sap.ui.webcomponents.main.IMenuItem[]}
		 * @slot items
		 * @public
		 */
		 "default": {
			propertyName: "items",
			type: HTMLElement,
			invalidateOnChildChange: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Menu.prototype */ {
		/**
		 * Fired when an item is being clicked.
		 *
		 * @event sap.ui.webcomponents.main.Menu#item-click
		 * @param {object} item The currently clicked menu item.
		 * @param {string} text The text of the currently clicked menu item.
		 * @public
		 */
		 "item-click": {
			detail: {
				item: {
					type: Object,
				},
				text: {
					type: String,
				},
			},
		 },
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-menu</code> component represents a hierarchical menu structure.
 *
 * <h3>Usage</h3>
 *
 * <code>ui5-menu</code> contains <code>ui5-menu-item</code> components.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * <h3>Keyboard Handling</h3>
 *
 * The <code>ui5-menu</code> provides advanced keyboard handling.
 * The user can use the following keyboard shortcuts in order to navigate trough the tree:
 * <ul>
 * <li><code>Arrow Up</code> / <code>Arrow Down</code> - Navigates up and down the menu items that are currently visible.</li>
 * <li><code>Arrow Right</code>, <code>Space</code> or <code>Enter</code> - Opens a sub-menu if there are menu items nested
 * in the currently clicked menu item.</li>
 * <li><code>Arrow Left</code> or <code>Escape</code> - Closes the currently opened sub-menu.</li>
 * </ul>
 * Note: if the text ditrection is set to Right-to-left (RTL), <code>Arrow Right</code> and <code>Arrow Left</code> functionality is swapped.
 * <br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Menu.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Menu
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-menu
 * @appenddocs MenuItem
 * @since 1.3.0
 * @public
 */
class Menu extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get staticAreaStyles() {
		return staticAreaMenuCss;
	}

	static get staticAreaTemplate() {
		return staticAreaMenuTemplate;
	}

	static get dependencies() {
		return [
			ResponsivePopover,
			Button,
			List,
			StandardListItem,
			Icon,
		];
	}

	static async onDefine() {
		Menu.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get itemsWithChildren() {
		return !!this._currentItems.filter(item => item.item.items.length).length;
	}

	get itemsWithIcon() {
		return !!this._currentItems.filter(item => item.item.icon !== "").length;
	}

	get isRtl() {
		return this.effectiveDir === "rtl";
	}

	get placementType() {
		const placement = this.isRtl ? "Left" : "Right";
		return this._isSubMenu ? placement : "Bottom";
	}

	get verticalAlign() {
		return this._isSubMenu ? "Top" : "Bottom";
	}

	get labelBack() {
		return Menu.i18nBundle.getText(MENU_BACK_BUTTON_ARIA_LABEL);
	}

	get labelClose() {
		return Menu.i18nBundle.getText(MENU_CLOSE_BUTTON_ARIA_LABEL);
	}

	get isPhone() {
		return isPhone();
	}

	get isSubMenuOpened() {
		return !!this._parentMenuItem;
	}

	get menuHeaderTextPhone() {
		return this.isSubMenuOpened ? this._parentMenuItem.text : this.headerText;
	}

	onBeforeRendering() {
		!isPhone() && this._prepareCurrentItems(this.items);

		const itemsWithChildren = this.itemsWithChildren;
		const itemsWithIcon = this.itemsWithIcon;

		this._currentItems.forEach(item => {
			item.item._siblingsWithChildren = itemsWithChildren;
			item.item._siblingsWithIcon = itemsWithIcon;
		});
	}

	/**
	 * Shows the Menu near the opener element.
	 * @param {HTMLElement} opener the element that the popover is shown at
	 * @public
	 */
	async showAt(opener) {
		if (isPhone()) {
			this._prepareCurrentItems(this.items);
			this._parentItemsStack = [];
		}
		if (!this._isSubMenu) {
			this._parentMenuItem = undefined;
		}
		await this._getPopover();
		this._popover.initialFocus = "";
		for (let index = 0; index < this._currentItems.length; index++) {
			if (!this._currentItems[index].item.disabled) {
				this._popover.initialFocus = `${this._id}-menu-item-${index}`;
				break;
			}
		}
		this._popover.showAt(opener);
	}

	/**
	 * Closes the Menu.
	 * @public
	 */
	close() {
		if (Object.keys(this._popover).length) {
			if (isPhone()) {
				this._parentItemsStack = [];
			}
			this._popover.close();
			this._popover.resetFocus();
		}
	}

	async _getPopover() {
		this._popover = (await this.getStaticAreaItemDomRef()).querySelector("[ui5-responsive-popover]");
		return this._popover;
	}

	_beforePopoverClose() {
		if (Object.keys(this._openedSubMenuItem).length) {
			this._openedSubMenuItem._preventSubMenuClose = false;
			this._closeItemSubMenu(this._openedSubMenuItem);
		}
	}

	_navigateBack() {
		const parentMenuItem = this._parentItemsStack.pop();

		this.focus();
		if (parentMenuItem) {
			this._prepareCurrentItems(parentMenuItem.parentElement.items);
			this._parentMenuItem = this._parentItemsStack.length ? this._parentItemsStack[this._parentItemsStack.length - 1] : undefined;
		}
	}

	_prepareCurrentItems(items) {
		this._currentItems = items.map((item, index) => {
			return {
				item,
				position: index + 1,
				ariaHasPopup: item.hasChildren ? "menu" : undefined,
			};
		});
	}

	_createSubMenu(item, openerId) {
		const subMenu = document.createElement(this.constructor.getMetadata().getTag());
		const fragment = document.createDocumentFragment();

		subMenu._isSubMenu = true;
		subMenu.setAttribute("id", `submenu-${openerId}`);
		subMenu._parentMenuItem = item;
		const subItems = item.children;
		let clonedItem,
			idx;
		for (idx = 0; idx < subItems.length; idx++) {
			clonedItem = subItems[idx].cloneNode(true);
			fragment.appendChild(clonedItem);
		}
		subMenu.appendChild(fragment);
		this.staticAreaItem.shadowRoot.querySelector(".ui5-menu-submenus").appendChild(subMenu);
		item._subMenu = subMenu;
	}

	_openItemSubMenu(item, opener, actionId) {
		item._subMenu.showAt(opener);
		item._preventSubMenuClose = true;
		this._openedSubMenuItem = item;
		this._subMenuOpenerId = actionId;
	}

	_closeItemSubMenu(item, forceClose) {
		if (Object.keys(item).length) {
			if (forceClose) {
				item._preventSubMenuClose = false;
				this._closeSubMenuPopover(item._subMenu, true);
			} else {
				setTimeout(() => this._closeSubMenuPopover(item._subMenu), 0);
			}
		}
	}

	_closeSubMenuPopover(subMenu, forceClose) {
		if (subMenu && Object.keys(subMenu).length) {
			const parentItem = subMenu._parentMenuItem;

			if (forceClose || !parentItem._preventSubMenuClose) {
				subMenu.close();
				subMenu.remove();
				parentItem._subMenu = {};
				this._openedSubMenuItem = {};
				this._subMenuOpenerId = "";
			}
		}
	}

	_prepareSubMenuDesktopTablet(item, opener, actionId) {
		if (actionId !== this._subMenuOpenerId || (item && item.hasChildren)) {
			// close opened sub-menu if there is any opened
			this._closeItemSubMenu(this._openedSubMenuItem, true);
		}
		if (item && item.hasChildren) {
			// create new sub-menu
			this._createSubMenu(item, actionId);
			this._openItemSubMenu(item, opener, actionId);
		}
		if (this._parentMenuItem) {
			this._parentMenuItem._preventSubMenuClose = true;
		}
	}

	_prepareSubMenuPhone(item) {
		this._prepareCurrentItems(item.items);
		this._parentMenuItem = item;
		this._parentItemsStack.push(item);
	}

	_itemMouseOver(event) {
		if (isDesktop()) {
			// respect mouseover only on desktop
			const opener = event.target;
			const item = opener.associatedItem;
			const hoverId = opener.getAttribute("id");

			opener.focus();
			this._prepareSubMenuDesktopTablet(item, opener, hoverId);
		}
	}

	_itemMouseOut(event) {
		if (isDesktop()) {
			// respect mouseover only on desktop
			const item = event.target.associatedItem;

			if (item && item.hasChildren && item._subMenu) {
				// try to close the sub-menu
				item._preventSubMenuClose = false;
				this._closeItemSubMenu(item);
			}
		}
	}

	_itemKeyDown(event) {
		const isMenuClose = this.isRtl ? isRight(event) : isLeft(event);
		const isMenuOpen = this.isRtl ? isLeft(event) : isRight(event);

		if (isEnter(event)) {
			event.preventDefault();
		}
		if (isMenuOpen) {
			const opener = event.target;
			const item = opener.associatedItem;
			const hoverId = opener.getAttribute("id");

			item.hasChildren && this._prepareSubMenuDesktopTablet(item, opener, hoverId);
		} else if (isMenuClose && this._isSubMenu && this._parentMenuItem) {
			this._parentMenuItem.parentElement._closeItemSubMenu(this._parentMenuItem, true);
		}
	}

	_itemClick(event) {
		const opener = event.detail.item;
		const item = opener.associatedItem;
		const actionId = opener.getAttribute("id");

		if (!item.hasChildren) {
			// click on an item that doesn't have sub-items fires an "item-click" event
			if (!this._isSubMenu) {
				if (isPhone()) {
					this._parentMenuItem = undefined;
				}
				// fire event if the click is on top-level menu item
				this.fireEvent("item-click", {
					"item": item,
					"text": item.text,
				});
				this._popover.close();
			} else {
				// find top-level menu and redirect event to it
				let parentMenu = item.parentElement;
				while (parentMenu._parentMenuItem) {
					parentMenu._parentMenuItem._preventSubMenuClose = false;
					this._closeItemSubMenu(parentMenu._parentMenuItem);
					parentMenu = parentMenu._parentMenuItem.parentElement;
				}
				parentMenu._itemClick(event);
			}
		} else if (isPhone()) {
			// prepares and opens sub-menu on phone
			this._prepareSubMenuPhone(item);
		} else if (isTablet()) {
			// prepares and opens sub-menu on tablet
			this._prepareSubMenuDesktopTablet(item, opener, actionId);
		}
	}
}

Menu.define();

export default Menu;
