import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isEnter,
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
		 * @type {sap.ui.webcomponents.main.IBreadcrumbsItem[]}
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
		 * The last item contains only plain text and is not a link.
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
		 * Holds the number of items in the overflow.
		 *
		 * @type {Integer}
		 * @defaultvalue 0
		 * @private
		 */
		_overflowSize: {
			type: Integer,
			noAttribute: true,
			defaultValue: 0,
		},

	},
	events: /** @lends  sap.ui.webcomponents.main.Breadcrumbs.prototype */ {

		/**
		 * Fires when a <code>BreadcrumbsItem</code> is clicked.
		 *
		 * @event sap.ui.webcomponents.main.Breadcrumbs#item-click
		 * @param {HTMLElement} item The clicked item.
		 * @public
		 */
		"item-click": {
			detail: {
				item: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * Enables users to navigate between items by providing a list of links to previous steps in the user's navigation path.
 * It helps the user to be aware of their location within the application and allows faster navigation.
 * <br><br>
 * The last three steps can be accessed as links directly, while the remaining links prior to them are available
 * in a drop-down menu.
 * <br><br>
 * You can choose the type of separator to be used from a number of predefined options.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-breadcrumbs</code> provides advanced keyboard handling.
 * <br>
 * <ul>
 * <li>[F4, ALT+UP, ALT+DOWN, SPACE, ENTER] - If the dropdown arrow is focused - opens/closes the drop-down.</li>
 * <li>[SPACE, ENTER] - Activates the focused item and triggers the <code>item-click</code> event.</li>
 * <li>[ESC] - Closes the drop-down.</li>
 * <li>[LEFT] - If the drop-down is closed - navigates one item to the left.</li>
 * <li>[RIGHT] - If the drop-down is closed - navigates one item to the right.</li>
 * <li>[UP] - If the drop-down is open - moves focus to the next item.</li>
 * <li>[DOWN] - If the drop-down is open - moves focus to the previous item.</li>
 * <li>[HOME] - Navigates to the first item.</li>
 * <li>[END] - Navigates to the last item.</li>
 * </ul>
 * <br>
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Breadcrumbs
 * @extends UI5Element
 * @tagname ui5-breadcrumbs
 * @appenddocs BreadcrumbsItem
 * @public
 * @since 1.0.0-rc.15
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
		this._dropdownArrowLinkWidth = 0;

		this._labelFocusAdaptor = {
			id: `${this._id}-labelWrapper`,
			getlabelWrapper: this.getCurrentLocationLabelWrapper.bind(this),
			set _tabIndex(value) {
				const wrapper = this.getlabelWrapper();
				wrapper && wrapper.setAttribute("tabindex", value);
			},
			get _tabIndex() {
				const wrapper = this.getlabelWrapper();
				return (wrapper) ? wrapper.getAttribute("tabindex") : undefined;
			},
		};
	}

	onInvalidation(changeInfo) {
		if (changeInfo.reason === "childchange") {
			const itemIndex = this.getSlottedNodes("items").indexOf(changeInfo.child),
				isInOverflow = itemIndex < this._overflowSize;
			if (isInOverflow) {
				// the content of an overflowing item has changed
				// => need to render the item outside the overflow to obtain its new width
				// => lower-down the <code>_overfowSize</code> to exclude that item from the overflow
				this._overflowSize = itemIndex;
			}
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
		const items = this._links;

		if (!this._isOverflowEmpty) {
			items.unshift(this._dropdownArrowLink);
		}

		if (this._endsWithCurrentLocationLabel) {
			items.push(this._labelFocusAdaptor);
		}
		return items;
	}

	_onfocusin(event) {
		const target = event.target,
			labelWrapper = this.getCurrentLocationLabelWrapper(),
			currentItem = (target === labelWrapper) ? this._labelFocusAdaptor : target;

		this._itemNavigation.setCurrentItem(currentItem);
	}

	_onkeydown(event) {
		const isDropdownArrowFocused = this._isDropdownArrowFocused;

		if (isShow(event) && isDropdownArrowFocused && !this._isOverflowEmpty) {
			event.preventDefault();
			this._toggleRespPopover();
			return;
		}
		if (isSpace(event) && isDropdownArrowFocused && !this._isOverflowEmpty && !this._isPickerOpen) {
			event.preventDefault();
			return;
		}
		if ((isEnter(event) || isSpace(event)) && this._isCurrentLocationLabelFocused) {
			this._onLabelPress();
		}
	}

	_onkeyup(event) {
		if (this._isDropdownArrowFocused && isSpace(event) && !this._isOverflowEmpty && !this._isPickerOpen) {
			this._openRespPopover();
		}
	}

	/**
	 * Caches the space required to render the content
	 * @private
	 */
	_cacheWidths() {
		const map = this._breadcrumbItemWidths,
			items = this.getSlottedNodes("items"),
			label = this._currentLocationLabel;

		for (let i = this._overflowSize; i < items.length; i++) {
			const item = items[i],
				link = this.shadowRoot.querySelector(`.ui5-breadcrumbs-link-wrapper #${item._id}-link`);
			map.set(item, this._getElementWidth(link) || 0);
		}

		if (this._endsWithCurrentLocationLabel && label) {
			const item = items[items.length - 1];
			map.set(item, this._getElementWidth(label));
		}

		if (!this._isOverflowEmpty) {
			this._dropdownArrowLinkWidth = this._getElementWidth(this._dropdownArrowLink);
		}
	}

	_updateOverflow() {
		const items = this.getSlottedNodes("items"),
			availableWidth = this.shadowRoot.querySelector(".ui5-breadcrumbs-root").offsetWidth;
		let requiredWidth = this._getTotalContentWidth(),
			overflowSize = 0;

		if (requiredWidth > availableWidth) {
			// need to show the component that opens the overflow
			requiredWidth += this._dropdownArrowLinkWidth;
		}

		while ((requiredWidth > availableWidth) && (overflowSize < this._maxAllowedOverflowSize)) {
			const itemToOverflow = items[overflowSize];
			let itemWidth = 0;

			if (this._isItemVisible(itemToOverflow)) {
				itemWidth = this._breadcrumbItemWidths.get(itemToOverflow) || 0;
			}

			// move the item to the overflow
			requiredWidth -= itemWidth;
			overflowSize++;
		}

		this._overflowSize = overflowSize;

		// if overflow was emptied while picker was open => close redundant popup
		if (this._isOverflowEmpty && this._isPickerOpen) {
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
		if (element) {
			return Math.ceil(element.getBoundingClientRect().width);
		}
	}

	_getTotalContentWidth() {
		const items = this.getSlottedNodes("items"),
			widthsMap = this._breadcrumbItemWidths,
			totalLinksWidth = items.reduce((sum, link) => sum + widthsMap.get(link), 0);

		return totalLinksWidth;
	}

	_onLinkPress(event) {
		const link = event.target,
			items = this.getSlottedNodes("items"),
			item = items.find(x => `${x._id}-link` === link.id);
		this.fireEvent("item-click", { item });
	}

	_onLabelPress() {
		const items = this.getSlottedNodes("items"),
			item = items[items.length - 1];
		this.fireEvent("item-click", { item });
	}

	_onOverflowListItemSelect(event) {
		const listItem = event.detail.item,
			items = this.getSlottedNodes("items"),
			item = items.find(x => `${x._id}-li` === listItem.id);

		window.open(item.href, item.target || "_self", "noopener,noreferrer");
		this.responsivePopover.close();
		this.fireEvent("item-click", { item });
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
		this.responsivePopover.showAt(this._dropdownArrowLink);
	}

	_isItemVisible(item) {
		return !item.hidden && this._hasVisibleContent(item);
	}

	_hasVisibleContent(item) {
		// the check is not complete but may be extended in the future if needed to cover
		// cases becides the standard (UX-recommended) ones
		return item.innerText || Array.from(item.children).some(child => !child.hidden);
	}

	getCurrentLocationLabelWrapper() {
		return this.shadowRoot.querySelector(".ui5-breadcrumbs-current-location > span");
	}

	get _endsWithCurrentLocationLabel() {
		return this.design === BreadcrumbsDesign.Standard;
	}

	get _currentLocationText() {
		const items = this.getSlottedNodes("items");
		if (this._endsWithCurrentLocationLabel && items.length > 1) {
			const item = items[items.length - 1];
			if (this._isItemVisible(item)) {
				return item.innerText;
			}
		}
		return "";
	}

	get _currentLocationLabel() {
		return this.shadowRoot.querySelector(".ui5-breadcrumbs-current-location ui5-label");
	}

	get _isDropdownArrowFocused() {
		return this._dropdownArrowLink._tabIndex === "0";
	}

	get _isCurrentLocationLabelFocused() {
		const label = this.getCurrentLocationLabelWrapper();
		return label && label.tabIndex === 0;
	}

	/**
	 * Returns the maximum allowed count of items in the overflow
	 * with respect to the UX requirement to never overflow the last visible item
	 */
	get _maxAllowedOverflowSize() {
		const items = this.getSlottedNodes("items").filter(item => this._isItemVisible(item));
		// all items except tha last visible one are allowed to overflow by UX requirement
		return items.length - 1;
	}

	/**
	 * Getter for the interactive element that opens the overflow
	 * @private
	 */
	get _dropdownArrowLink() {
		return this.shadowRoot.querySelector(".ui5-breadcrumbs-dropdown-arrow-link-wrapper ui5-link");
	}

	/**
	 * Getter for the list of abstract breadcrumb items to be rendered as list-items inside the overflow
	 */
	get _overflowItemsData() {
		return this.getSlottedNodes("items")
			.slice(0, this._overflowSize)
			.filter(item => this._isItemVisible(item))
			.reverse();
	}

	/**
	 * Getter for the list of abstract breadcrumb items to be rendered as links outside the overflow
	 */
	get _linksData() {
		const items = this.getSlottedNodes("items").slice(this._overflowSize);

		if (this._endsWithCurrentLocationLabel) {
			items.pop();
		}

		return items.filter(item => this._isItemVisible(item));
	}

	/**
	 * Getter for the list of links corresponding to the abstract breadcrumb items
	 */
	get _links() {
		return Array.from(this.shadowRoot.querySelectorAll(".ui5-breadcrumbs-link-wrapper ui5-link"));
	}

	get _isOverflowEmpty() {
		return this._overflowItemsData.length === 0;
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

	get _dropdownArrowAccessibleNameText() {
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
