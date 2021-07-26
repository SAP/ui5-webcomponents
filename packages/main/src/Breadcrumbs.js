import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isSpace,
	isShow,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import BreadcrumbsDesign from "./types/BreadcrumbsDesign.js";
import BreadcrumbsSeparatorStyle from "./types/BreadcrumbsSeparatorStyle.js";
import BreadcrumbsItem from "./BreadcrumbsItem.js";
import {
	BREADCRUMBS_ARIA_LABEL,
	BREADCRUMBS_OVERFLOW_ARIA_LABEL,
	BREADCRUMBS_CANCEL_BUTTON,
} from "./generated/i18n/i18n-defaults.js";
import Link from "./Link.js";
import Label from "./Label.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Popover from "./Popover.js";
import List from "./List.js";
import StandardListItem from "./StandardListItem.js";
import Icon from "./Icon.js";

// Templates
import BreadcrumbsTemplate from "./generated/templates/BreadcrumbsTemplate.lit.js";
import BreadcrumbsPopoverTemplate from "./generated/templates/BreadcrumbsPopoverTemplate.lit.js";

// Styles
import breadcrumbsCss from "./generated/themes/Breadcrumbs.css.js";
import breadcrumbsPopoverCss from "./generated/themes/BreadcrumbsPopover.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-breadcrumbs",
	managedSlots: true,
	languageAware: true,
	slots: /** @lends sap.ui.webcomponents.main.Breadcrumbs.prototype */ {

		/**
		 * Defines the component items.
		 *
		 * <br><br>
		 * <b>Note:</b> Use the <code>ui5-breadcrumbs-item</code> component to define the desired items.
		 * @type {sap.ui.webcomponents.main.IBreadcrumbItem[]}
		 * @slot items
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			invalidateOnChildChange: true,
		},

	},
	properties: /** @lends  sap.ui.webcomponents.main.Breadcrumbs.prototype */ {

		/**
		 * Defines the visual indication and behavior of the breadcrumbs.
		 * Available options are <code>Standard</code> (by default) and <code>NoCurrentPage</code>.
		 * <br><br>
		 * <b>Note:</b> The <code>Standard</code> breadcrumbs show the current page as the last item in the trail.
		 * The last item contains only plain text and not a link.
		 *
		 * @type {BreadcrumbsDesign}
		 * @defaultvalue "Standard"
		 * @public
		*/
		design: {
			type: BreadcrumbsDesign,
			defaultValue: BreadcrumbsDesign.Standard,
		},

		/**
		 * Determines the visual style of the separator between the breadcrumb items.
		 *
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Slash</code></li>
		 * <li><code>BackSlash</code></li>
		 * <li><code>DoubleBackSlash</code></li>
		 * <li><code>DoubleGreaterThan</code></li>
		 * <li><code>DoubleSlash</code></li>
		 * <li><code>GreaterThan</code></li>
		 * </ul>
		 *
		 * @type {BreadcrumbsSeparatorStyle}
		 * @defaultvalue "Slash"
		 * @public
		 */
		separatorStyle: {
			type: BreadcrumbsSeparatorStyle,
			defaultValue: BreadcrumbsSeparatorStyle.Slash,
		},

		/**
		 * Holds the number of link-items in the overflow
		 *
		 * @type {integer}
		 * @defaultvalue 0
		 * @private
		 */
		_countItemsInOverflow: {
			type: Integer,
			noAttribute: true,
			defaultValue: 0,
		},

	},
	events: /** @lends  sap.ui.webcomponents.main.Breadcrumbs.prototype */ {

		/**
		 * Fired when a link is activated.
		 *
		 * @event sap.ui.webcomponents.main.Breadcrumbs#link-click
		 * @param {HTMLElement} link The clicked link.
		 * @public
		 */
		"link-click": {
			detail: {
				link: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * Enables users to navigate between items by providing a list of links to previous steps in the user's navigation path. The last three steps can be accessed as links directly, while the remaining links prior to them are available in a drop-down menu.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Breadcrumbs
 * @extends UI5Element
 * @tagname ui5-breadcrumbs
 * @appenddocs BreadcrumbsItem
 * @public
 * @since 1.0.0-rc.16
 */
class Breadcrumbs extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return BreadcrumbsTemplate;
	}

	static get staticAreaTemplate() {
		return BreadcrumbsPopoverTemplate;
	}

	static get styles() {
		return breadcrumbsCss;
	}

	static get staticAreaStyles() {
		return breadcrumbsPopoverCss;
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
		this._initItemNavigation();

		this._onResizeHandler = this._updateOverflow.bind(this);

		// maps items to their widths
		this._breadcrumbItemWidths = new WeakMap();
		// the width of the interactive element that opens the overflow
		this._overflowLinkWidth = 0;
	}

	onInvalidation(changeInfo) {
		if (changeInfo.reason === "childchange"
			&& this._overflowingItems.indexOf(changeInfo.child) > -1) {
			// the content of an overflowing item has changed
			// => need to update the width of the overflowing item
			// => need to render all items outside the overflow to update their widths cache
			this._countItemsInOverflow = 0;
		}
	}

	onAfterRendering() {
		this._cacheWidths();
		this._updateOverflow();
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._onResizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._onResizeHandler);
	}

	_initItemNavigation() {
		if (!this._itemNavigation) {
			this._itemNavigation = new ItemNavigation(this, {
				navigationMode: NavigationMode.Horizontal,
				getItemsCallback: () => this._getFocusableItems(),
			});
		}
	}

	/**
	 * Obtains the items for navigation via keyboard
	 * @private
	 */
	_getFocusableItems() {
		const items = this._nonOverflowingLinks,
			currentLocationLabel = this._currentLocationLabel;

		if (!this._isOverflowEmpty) {
			items.unshift(this._overflowLink);
		}
		if (currentLocationLabel) {
			items.push(currentLocationLabel);
		}
		return items;
	}

	_onfocusin(event) {
		this._itemNavigation.setCurrentItem(event.target);
	}

	_onkeydown(event) {
		if (isShow(event) && !this._isOverflowEmpty) {
			event.preventDefault();
			this._toggleRespPopover();
		}
		if (isSpace(event) && !this._isOverflowEmpty && !this._isPickerOpen) {
			event.preventDefault();
		}
	}

	_onkeyup(event) {
		if (isSpace(event) && !this._isOverflowEmpty && !this._isPickerOpen) {
			this._openRespPopover();
		}
	}

	/**
	 * Caches the space required to render the content
	 * @private
	 */
	_cacheWidths() {
		const map = this._breadcrumbItemWidths,
			links = this._nonOverflowingLinks,
			breadcrumbItems = this.getSlottedNodes("items");

		for (let i = 0; i < links.length; i++) {
			const breadcrumbItemIndex = (i + this._countItemsInOverflow),
				breadcrumbItem = breadcrumbItems[breadcrumbItemIndex];
			map.set(breadcrumbItem, this._getElementWidth(links[i]));
		}

		if (this._endsWithCurrentLocation && links.length) {
			const breadcrumbItem = breadcrumbItems[breadcrumbItems.length - 1];
			map.set(breadcrumbItem, this._getElementWidth(this._currentLocationLabel));
		}

		if (!this._isOverflowEmpty) {
			this._overflowLinkWidth = this._getElementWidth(this._overflowLink);
		}
	}

	_updateOverflow() {
		const items = this._interactiveItems.filter(item => !item.hidden),
			availableWidth = this.shadowRoot.querySelector(".ui5-breadcrumbs-root").offsetWidth;
		let requiredWidth = this._getTotalContentWidth(),
			countItemsInOverflow = 0;

		if (requiredWidth > availableWidth) {
			// need to show the overflow opener as well
			requiredWidth += this._overflowLinkWidth;
		}

		while ((requiredWidth > availableWidth) && (countItemsInOverflow < this._maxAllowedCountItemsInOverflow)) {
			const itemToOverflow = items[countItemsInOverflow],
				itemWidth = this._breadcrumbItemWidths.get(itemToOverflow) || 0;

			// move the item to the overflow
			requiredWidth -= itemWidth;
			countItemsInOverflow++;
		}

		this._countItemsInOverflow = countItemsInOverflow;

		// if overflow was emptied while picker was open => close redundant popup
		if (this._countItemsInOverflow === 0 && this._isPickerOpen) {
			this.responsivePopover.close();
		}

		// if the last focused link has done into the overflow =>
		// ensure the first visible link is focusable
		const focusableItems = this._getFocusableItems();
		if (!focusableItems.some(x => x._tabIndex === "0")) {
			this._itemNavigation.setCurrentItem(focusableItems[0]);
		}
	}

	_getElementWidth(element) {
		return Math.ceil(element.getBoundingClientRect().width);
	}

	_getTotalContentWidth() {
		const items = this._interactiveItems,
			widthsMap = this._breadcrumbItemWidths,
			totalLinksWidth = items.reduce((sum, link) => sum + widthsMap.get(link), 0);

		return totalLinksWidth + this._currentLocationTextWidth;
	}

	_getSelectedItemIndex(item) {
		return [].indexOf.call(item.parentElement.children, item);
	}

	_onLinkClick(event) {
		const link = event.target;
		this.fireEvent("link-click", { link });
	}

	_onOverflowListItemSelect(event) {
		const item = event.detail.item,
			itemIndex = this._getSelectedItemIndex(item),
			link = this._overflowingItems[itemIndex];

		window.open(link.href, link.target || "_self", "noopener,noreferrer");
		this.responsivePopover.close();
		this.fireEvent("link-click", { link });
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("[ui5-responsive-popover]");
	}

	async _toggleRespPopover() {
		this.responsivePopover = await this._respPopover();

		if (this._isPickerOpen) {
			this._closeRespPopover();
		} else {
			this._openRespPopover();
		}
	}

	async _closeRespPopover() {
		this.responsivePopover && this.responsivePopover.close();
	}

	async _openRespPopover() {
		this.responsivePopover = await this._respPopover();
		this.responsivePopover.openBy(this._overflowLink);
	}

	_isItemVisible(item) {
		return !item.hidden && this._hasVisibleContent(item);
	}

	_hasVisibleContent(item) {
		// the check is not complete but may be extended in the future if needed to cover
		// cases becides the standard (UX-recommended) ones
		return item.innerText || Array.from(item.children).some(child => !child.hidden);
	}

	/**
	 * Returns all slotted items except the item that represents the current location label
	 */
	get _interactiveItems() {
		const items = this.getSlottedNodes("items");
		if (this._endsWithCurrentLocation) {
			items.pop();
		}
		return items;
	}

	get _endsWithCurrentLocation() {
		return this.design === BreadcrumbsDesign.Standard;
	}

	get _currentLocationItem() {
		let lastItem;
		if (this._endsWithCurrentLocation) {
			const items = this.getSlottedNodes("items");
			lastItem = items[items.length - 1];
		}
		return lastItem;
	}

	get _currentLocationText() {
		const item = this._currentLocationItem;
		return (item) ? item.innerText : "";
	}

	get _currentLocationTextWidth() {
		return this._breadcrumbItemWidths.get(this._currentLocationItem) || 0;
	}

	get _currentLocationLabel() {
		return this.shadowRoot.querySelector(".ui5-breadcrumbs-current-location ui5-label");
	}

	/**
	 * Returns the maximum allowed count of items in the overflow
	 * with respect to the UX requirement to never overflow the last visible item
	 */
	get _maxAllowedCountItemsInOverflow() {
		const interactiveItems = this._interactiveItems.filter(item => this._isItemVisible(item));
		if (this._endsWithCurrentLocation) {
			// all link-items are allowed to overflow by UX requirement
			return interactiveItems.length;
		}
		// all link-items except tha last visible link are allowed to overflow by UX requirement
		return interactiveItems.length - 1;
	}

	/**
	 * Getter for the interactive element that opens the overflow
	 * @private
	 */
	get _overflowLink() {
		return this.shadowRoot.querySelector(".ui5-breadcrumbs-overflow-opener ui5-link");
	}

	/**
	 * Getter for the list of links to be rendered inside the overflow
	 */
	get _overflowingItems() {
		const indexOfLastOveflowingLink = this._indexOfLastOveflowingItem;

		if (indexOfLastOveflowingLink > -1) {
			return this._interactiveItems
				.slice(0, indexOfLastOveflowingLink + 1)
				.reverse();
		}
		return [];
	}

	/**
	 * Getter for the list of non-hidden links to be rendered inside the overflow
	 */
	get _visibleOverflowingItems() {
		return this._interactiveItems
			.filter(item => this._isItemVisible(item))
			.slice(0, this._countItemsInOverflow)
			.reverse();
	}

	get _indexOfLastOveflowingItem() {
		const visibleOverflowingItems = this._visibleOverflowingItems;
		let lastVisibleOverflowingLink;

		if (visibleOverflowingItems.length) {
			// visible links appear in reverse order in the dropdown
			// => we obtain the first item
			lastVisibleOverflowingLink = visibleOverflowingItems[0];
			return this._getSelectedItemIndex(lastVisibleOverflowingLink);
		}

		return -1;
	}

	/**
	 * Getter for the list of breadcrumb items to be rendered outside the overflow
	 */
	get _nonOverflowingItems() {
		const items = this._interactiveItems,
			indexOfLastOveflowingLink = this._indexOfLastOveflowingItem;

		// if there is at least one overflowing link
		// => extract the remaining and return as non-overflowing
		if (indexOfLastOveflowingLink > -1) {
			return items.slice(indexOfLastOveflowingLink + 1);
		}
		return items;
	}

	get _visibleNonOverflowingItems() {
		return this._nonOverflowingItems.filter(item => this._isItemVisible(item));
	}

	/**
	 * Getter for the list of links to be rendered outside the overflow
	 */
	get _nonOverflowingLinks() {
		return Array.from(this.shadowRoot.querySelectorAll(".ui5-breadcrumbs-link-wrapper ui5-link"));
	}

	get _isOverflowEmpty() {
		return this._countItemsInOverflow === 0;
	}

	get _ariaHasPopup() {
		if (!this._isOverflowEmpty) {
			return "listbox";
		}
		return undefined;
	}

	get _isPickerOpen() {
		return !!this.responsivePopover && this.responsivePopover.opened;
	}

	get _accessibleNameText() {
		return this.i18nBundle.getText(BREADCRUMBS_ARIA_LABEL);
	}

	get _overflowAccessibleNameText() {
		return this.i18nBundle.getText(BREADCRUMBS_OVERFLOW_ARIA_LABEL);
	}

	get _cancelButtonText() {
		return this.i18nBundle.getText(BREADCRUMBS_CANCEL_BUTTON);
	}

	static get dependencies() {
		return [
			BreadcrumbsItem,
			Link,
			Label,
			ResponsivePopover,
			List,
			StandardListItem,
			Icon,
		];
	}
}

Breadcrumbs.define();

export default Breadcrumbs;
