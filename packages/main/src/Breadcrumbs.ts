import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isEnter,
	isSpace,
	isShow,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import BreadcrumbsDesign from "./types/BreadcrumbsDesign.js";
import BreadcrumbsSeparatorStyle from "./types/BreadcrumbsSeparatorStyle.js";
import BreadcrumbsItem from "./BreadcrumbsItem.js";
import {
	BREADCRUMB_ITEM_POS,
	BREADCRUMBS_ARIA_LABEL,
	BREADCRUMBS_OVERFLOW_ARIA_LABEL,
	BREADCRUMBS_CANCEL_BUTTON,
	// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";
import Link from "./Link.js";
import type { LinkClickEventDetail } from "./Link.js";
import Label from "./Label.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import type { SelectionChangeEventDetail } from "./List.js";
import StandardListItem from "./StandardListItem.js";
import Icon from "./Icon.js";
import Button from "./Button.js";

// Templates
import BreadcrumbsTemplate from "./generated/templates/BreadcrumbsTemplate.lit.js";
import BreadcrumbsPopoverTemplate from "./generated/templates/BreadcrumbsPopoverTemplate.lit.js";

// Styles
import breadcrumbsCss from "./generated/themes/Breadcrumbs.css.js";
import breadcrumbsPopoverCss from "./generated/themes/BreadcrumbsPopover.css.js";

type BreadcrumbsItemClickEventDetail = {
	item: BreadcrumbsItem;
	altKey: boolean;
	ctrlKey: boolean;
	metaKey: boolean;
	shiftKey: boolean;
}

type FocusAdaptor = ITabbable & {
	getlabelWrapper: () => Element | null;
}

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
 * @alias sap.ui.webc.main.Breadcrumbs
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-breadcrumbs
 * @appenddocs BreadcrumbsItem
 * @public
 * @since 1.0.0-rc.15
 */
@customElement("ui5-breadcrumbs")
@languageAware

/**
 * Fires when a <code>BreadcrumbsItem</code> is clicked.
 * <b>Note:</b> You can prevent browser location change by calling <code>event.preventDefault()</code>.
 *
 * @event sap.ui.webc.main.Breadcrumbs#item-click
 * @allowPreventDefault
 * @param {HTMLElement} item The clicked item.
 * @param {Boolean} altKey Returns whether the "ALT" key was pressed when the event was triggered.
 * @param {Boolean} ctrlKey Returns whether the "CTRL" key was pressed when the event was triggered.
 * @param {Boolean} metaKey Returns whether the "META" key was pressed when the event was triggered.
 * @param {Boolean} shiftKey Returns whether the "SHIFT" key was pressed when the event was triggered.
 * @public
 */
@event("item-click", {
	detail: {
		item: { type: HTMLElement },
		altKey: { type: Boolean },
		ctrlKey: { type: Boolean },
		metaKey: { type: Boolean },
		shiftKey: { type: Boolean },
	},
})
class Breadcrumbs extends UI5Element {
	/**
	 * Defines the visual indication and behavior of the breadcrumbs.
	 * Available options are <code>Standard</code> (by default) and <code>NoCurrentPage</code>.
	 * <br><br>
	 * <b>Note:</b> The <code>Standard</code> breadcrumbs show the current page as the last item in the trail.
	 * The last item contains only plain text and is not a link.
	 *
	 * @type {sap.ui.webc.main.types.BreadcrumbsDesign}
	 * @name sap.ui.webc.main.Breadcrumbs.prototype.design
	 * @defaultvalue "Standard"
	 * @public
	*/
	@property({ type: BreadcrumbsDesign, defaultValue: BreadcrumbsDesign.Standard })
	design!: BreadcrumbsDesign;

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
	 * @type {sap.ui.webc.main.types.BreadcrumbsSeparatorStyle}
	 * @name sap.ui.webc.main.Breadcrumbs.prototype.separatorStyle
	 * @defaultvalue "Slash"
	 * @public
	 */
	@property({ type: BreadcrumbsSeparatorStyle, defaultValue: BreadcrumbsSeparatorStyle.Slash })
	separatorStyle!: BreadcrumbsSeparatorStyle;

	/**
	 * Holds the number of items in the overflow.
	 *
	 * @type {sap.ui.webc.base.types.Integer}
	 * @defaultvalue 0
	 * @private
	 */
	@property({ validator: Integer, noAttribute: true, defaultValue: 0 })
	_overflowSize!: number;

	/**
	 * Defines the component items.
	 *
	 * <br><br>
	 * <b>Note:</b> Use the <code>ui5-breadcrumbs-item</code> component to define the desired items.
	 * @type {sap.ui.webc.main.IBreadcrumbsItem[]}
	 * @name sap.ui.webc.main.Breadcrumbs.prototype.default
	 * @slot items
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<BreadcrumbsItem>;

	_itemNavigation: ItemNavigation
	_onResizeHandler: () => void;

	// maps items to their widths
	_breadcrumbItemWidths = new WeakMap<BreadcrumbsItem, number>();
	// the width of the interactive element that opens the overflow
	_dropdownArrowLinkWidth = 0;
	responsivePopover?: ResponsivePopover;
	_labelFocusAdaptor: FocusAdaptor;
	static i18nBundle: I18nBundle;

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

		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Horizontal,
			getItemsCallback: () => this._getFocusableItems(),
		});

		this._onResizeHandler = this._updateOverflow.bind(this);

		this._labelFocusAdaptor = {
			id: `${this._id}-labelWrapper`,
			getlabelWrapper: this.getCurrentLocationLabelWrapper.bind(this),
			set _tabIndex(value: string) {
				const wrapper = this.getlabelWrapper();
				wrapper && wrapper.setAttribute("tabindex", value);
			},
			get _tabIndex() {
				const wrapper = this.getlabelWrapper();
				return wrapper?.getAttribute("tabindex") || "";
			},
		};
	}

	onInvalidation(changeInfo: ChangeInfo) {
		if (changeInfo.reason === "childchange") {
			const itemIndex = this._getItems().indexOf(changeInfo.child as BreadcrumbsItem),
				isInOverflow = itemIndex < this._overflowSize;
			if (isInOverflow) {
				// the content of an overflowing item has changed
				// => need to render the item outside the overflow to obtain its new width
				// => lower-down the <code>_overfowSize</code> to exclude that item from the overflow
				this._overflowSize = itemIndex;
			}
		}
	}

	_getItems() {
		return this.getSlottedNodes("items") as Array<BreadcrumbsItem>;
	}

	onBeforeRendering() {
		this._preprocessItems();
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
		const items: Array<ITabbable> = this._links;

		if (!this._isOverflowEmpty) {
			items.unshift(this._dropdownArrowLink);
		}

		if (this._endsWithCurrentLocationLabel) {
			items.push(this._labelFocusAdaptor);
		}
		return items;
	}

	_onfocusin(e: FocusEvent) {
		const target = e.target,
			labelWrapper = this.getCurrentLocationLabelWrapper(),
			currentItem = (target === labelWrapper) ? this._labelFocusAdaptor : target as Link;

		this._itemNavigation.setCurrentItem(currentItem);
	}

	_onkeydown(e: KeyboardEvent) {
		const isDropdownArrowFocused = this._isDropdownArrowFocused;

		if (isShow(e) && isDropdownArrowFocused && !this._isOverflowEmpty) {
			e.preventDefault();
			this._toggleRespPopover();
			return;
		}
		if (isSpace(e) && isDropdownArrowFocused && !this._isOverflowEmpty && !this._isPickerOpen) {
			e.preventDefault();
			return;
		}
		if ((isEnter(e) || isSpace(e)) && this._isCurrentLocationLabelFocused) {
			this._onLabelPress(e);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (this._isDropdownArrowFocused && isSpace(e) && !this._isOverflowEmpty && !this._isPickerOpen) {
			this._openRespPopover();
		}
	}

	/**
	 * Caches the space required to render the content
	 * @private
	 */
	_cacheWidths() {
		const map = this._breadcrumbItemWidths,
			items = this._getItems(),
			label = this._currentLocationLabel;

		for (let i = this._overflowSize; i < items.length; i++) {
			const item = items[i],
				link = this.shadowRoot!.querySelector<HTMLElement>(`#${item._id}-link-wrapper`)!;
			map.set(item, this._getElementWidth(link));
		}

		if (items.length && this._endsWithCurrentLocationLabel && label) {
			const item = items[items.length - 1];

			map.set(item, this._getElementWidth(label));
		}

		if (!this._isOverflowEmpty) {
			const arrow = this.shadowRoot!.querySelector<HTMLElement>(".ui5-breadcrumbs-dropdown-arrow-link-wrapper")!;
			this._dropdownArrowLinkWidth = this._getElementWidth(arrow);
		}
	}

	_updateOverflow() {
		const items = this._getItems(),
			availableWidth = this.shadowRoot!.querySelector<HTMLElement>(".ui5-breadcrumbs-root")!.offsetWidth;
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
			this.responsivePopover!.close();
		}

		// if the last focused link has done into the overflow =>
		// ensure the first visible link is focusable
		const focusableItems = this._getFocusableItems();
		if (!focusableItems.some(x => x._tabIndex === "0")) {
			this._itemNavigation.setCurrentItem(focusableItems[0]);
		}
	}

	_getElementWidth(element: HTMLElement) {
		if (element) {
			return Math.ceil(element.getBoundingClientRect().width);
		}

		return 0;
	}

	_getTotalContentWidth() {
		const items = this._getItems(),
			widthsMap = this._breadcrumbItemWidths,
			totalLinksWidth = items.reduce((sum, link) => sum + widthsMap.get(link)!, 0);

		return totalLinksWidth;
	}

	_onLinkPress(e: CustomEvent<LinkClickEventDetail>) {
		const link = e.target as Link,
			items = this._getItems(),
			item = items.find(x => `${x._id}-link` === link.id),
			{
				altKey,
				ctrlKey,
				metaKey,
				shiftKey,
			} = e.detail;

		if (!this.fireEvent("item-click", {
			item,
			altKey,
			ctrlKey,
			metaKey,
			shiftKey,
		}, true)) {
			e.preventDefault();
		}
	}

	_onLabelPress(e: MouseEvent | KeyboardEvent) {
		const items = this._getItems(),
			item = items[items.length - 1],
			{
				altKey,
				ctrlKey,
				metaKey,
				shiftKey,
			} = e;

		this.fireEvent<BreadcrumbsItemClickEventDetail>("item-click", {
			item,
			altKey,
			ctrlKey,
			metaKey,
			shiftKey,
		});
	}

	_onOverflowListItemSelect(e: CustomEvent<SelectionChangeEventDetail>) {
		const listItem = e.detail.selectedItems[0],
			items = this._getItems(),
			item = items.find(x => `${x._id}-li` === listItem.id)!;

		if (this.fireEvent("item-click", { item }, true)) {
			window.open(item.href, item.target || "_self", "noopener,noreferrer");
			this.responsivePopover!.close();
		}
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	async _toggleRespPopover() {
		this.responsivePopover = await this._respPopover();

		if (this._isPickerOpen) {
			this._closeRespPopover();
		} else {
			this._openRespPopover();
		}
	}

	_closeRespPopover() {
		this.responsivePopover && this.responsivePopover.close();
	}

	async _openRespPopover() {
		this.responsivePopover = await this._respPopover();
		this.responsivePopover.showAt(this._dropdownArrowLink);
	}

	_isItemVisible(item: BreadcrumbsItem) {
		return !item.hidden && this._hasVisibleContent(item);
	}

	_hasVisibleContent(item: BreadcrumbsItem) {
		// the check is not complete but may be extended in the future if needed to cover
		// cases besides the standard (UX-recommended) ones
		return item.innerText || Array.from(item.children).some(child => !(child as HTMLElement).hidden);
	}

	_preprocessItems() {
		this.items.forEach(item => {
			item._getRealDomRef = () => this.getDomRef()!.querySelector(`[data-ui5-stable*=${item.stableDomRef}]`)!;
		});
	}

	_getItemPositionText(position: number, size: number) {
		return Breadcrumbs.i18nBundle.getText(BREADCRUMB_ITEM_POS as I18nText, position, size);
	}

	_getItemAccessibleName(item: BreadcrumbsItem, position: number, size: number) {
		const positionText = this._getItemPositionText(position, size);
		const itemsText = item.textContent || "";

		// innerText is needed as it is no longer read out when label is set
		let text = "";
		if (item.accessibleName) {
			text = `${itemsText.trim()} ${item.accessibleName} ${positionText}`;
		} else {
			text = `${itemsText.trim()} ${positionText}`;
		}

		return text;
	}

	getCurrentLocationLabelWrapper() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-breadcrumbs-current-location > span");
	}

	get _visibleItems() {
		return this._getItems()
			.slice(this._overflowSize)
			.filter(i => this._isItemVisible(i));
	}

	get _endsWithCurrentLocationLabel() {
		return this.design === BreadcrumbsDesign.Standard;
	}

	get _currentLocationText() {
		const items = this._getItems();
		if (this._endsWithCurrentLocationLabel && items.length) {
			const item = items[items.length - 1];
			if (this._isItemVisible(item)) {
				return item.innerText;
			}
		}
		return "";
	}

	get _currentLocationLabel() {
		return this.shadowRoot!.querySelector<Label>(".ui5-breadcrumbs-current-location [ui5-label]");
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
		const items = this._getItems().filter(item => this._isItemVisible(item));
		// all items except tha last visible one are allowed to overflow by UX requirement
		return items.length - 1;
	}

	/**
	 * Getter for the interactive element that opens the overflow
	 * @private
	 */
	get _dropdownArrowLink() {
		return this.shadowRoot!.querySelector<Link>(".ui5-breadcrumbs-dropdown-arrow-link-wrapper [ui5-link]")!;
	}

	/**
	 * Getter for the list of abstract breadcrumb items to be rendered as list-items inside the overflow
	 */
	get _overflowItemsData() {
		return this._getItems()
			.slice(0, this._overflowSize)
			.filter(item => this._isItemVisible(item))
			.reverse();
	}

	/**
	 * Getter for the list of abstract breadcrumb items to be rendered as links outside the overflow
	 */
	get _linksData() {
		const items = this._visibleItems;
		const itemsCount = items.length; // get size before removing of current location

		if (this._endsWithCurrentLocationLabel) {
			items.pop();
		}

		return items
			.map((item, index) => {
				item._accessibleNameText = this._getItemAccessibleName(item, index + 1, itemsCount);
				return item;
			});
	}

	/**
	 * Getter for accessible name of the current location. Includes the position of the current location and the size of the breadcrumbs
	 */
	get _currentLocationAccName() {
		const items = this._visibleItems;

		const positionText = this._getItemPositionText(items.length, items.length);
		const lastItem = items[items.length - 1];

		if (!lastItem) {
			return positionText;
		}

		const lastItemText = lastItem.textContent || "";

		if (lastItem.accessibleName) {
			return `${lastItemText.trim()} ${lastItem.accessibleName} ${positionText}`;
		}

		return `${lastItemText.trim()} ${positionText}`;
	}

	/**
	 * Getter for the list of links corresponding to the abstract breadcrumb items
	 */
	get _links() {
		return Array.from(this.shadowRoot!.querySelectorAll<Link>(".ui5-breadcrumbs-link-wrapper [ui5-link]"));
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
		return Breadcrumbs.i18nBundle.getText(BREADCRUMBS_ARIA_LABEL as I18nText);
	}

	get _dropdownArrowAccessibleNameText() {
		return Breadcrumbs.i18nBundle.getText(BREADCRUMBS_OVERFLOW_ARIA_LABEL as I18nText);
	}

	get _cancelButtonText() {
		return Breadcrumbs.i18nBundle.getText(BREADCRUMBS_CANCEL_BUTTON as I18nText);
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
			Button,
		];
	}

	static async onDefine() {
		Breadcrumbs.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Breadcrumbs.define();

export default Breadcrumbs;
