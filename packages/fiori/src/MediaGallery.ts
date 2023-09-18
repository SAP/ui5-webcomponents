import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import type { CarouselNavigateEventDetail } from "@ui5/webcomponents/dist/Carousel.js";
import Carousel from "@ui5/webcomponents/dist/Carousel.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import MediaGalleryItem from "./MediaGalleryItem.js";
import MediaGalleryItemLayout from "./types/MediaGalleryItemLayout.js";
import MediaGalleryLayout from "./types/MediaGalleryLayout.js";
import MediaGalleryMenuHorizontalAlign from "./types/MediaGalleryMenuHorizontalAlign.js";
import MediaGalleryMenuVerticalAlign from "./types/MediaGalleryMenuVerticalAlign.js";

// Styles
import MediaGalleryCss from "./generated/themes/MediaGallery.css.js";

// Template
import MediaGalleryTemplate from "./generated/templates/MediaGalleryTemplate.lit.js";

type MediaGallerySelectionChangeEventDetail = {
	item: MediaGalleryItem;
}

// The allowed number of thumbnail columns on each size
// (relevant when <code>showAllThumbnails</code> is enabled)
const COLUMNS_COUNT: Record<string, number> = {
	"S": 1,
	"M": 2,
	"L": 3,
	"XL": 4,
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-media-gallery</code> component allows the user to browse through multimedia items. Currently,
 * the supported items are images and videos. The items should be defined using the <code>ui5-media-gallery-item</code>
 * component.
 *
 * The items are initially displayed as thumbnails. When the user selects a thumbnail, the corresponding item
 * is displayed in larger size.
 * <br>
 * The component is responsive by default and adjusts the position of the menu with respect to viewport size,
 * but the application is able to further customize the layout via the provided API.
 *
* <h3>Keyboard Handling</h3>
 * The <code>ui5-media-gallery</code> provides advanced keyboard handling.
 * <br>
 * When the thumbnails menu is focused the following keyboard
 * shortcuts allow the user to navigate through the thumbnail items:
 * <br>
 *
 * <ul>
 * <li>[UP/DOWN] - Navigates up and down the items</li>
 * <li>[HOME] - Navigates to first item</li>
 * <li>[END] - Navigates to the last item</li>
 * <li>[SPACE/ENTER] - Select an item</li>
 * </ul>
 * <br>
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents-fiori/dist/MediaGallery";</code>
 * <br>
 * <code>import "@ui5/webcomponents-fiori/dist/MediaGalleryItem";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.MediaGallery
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-media-gallery
 * @appenddocs sap.ui.webc.fiori.MediaGalleryItem
 * @public
 * @since 1.1.0
 */
@customElement({
	tag: "ui5-media-gallery",
	renderer: litRender,
	styles: [MediaGalleryCss],
	template: MediaGalleryTemplate,
	staticAreaTemplate: MediaGalleryTemplate,
	dependencies: [
		MediaGalleryItem,
		Button,
		Carousel,
	],
})

/**
 * Fired when selection is changed by user interaction.
 *
 * @event sap.ui.webc.fiori.MediaGallery#selection-change
 * @param {HTMLElement} item the selected item.
 * @public
 */
@event("selection-change", {
	detail: {
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the thumbnails overflow button is clicked.
 *
 * @event sap.ui.webc.fiori.MediaGallery#overflow-click
 * @public
 */
@event("overflow-click")

/**
 * Fired when the display area is clicked.<br>
 * The display area is the central area that contains
 * the enlarged content of the currently selected item.
 *
 * @event sap.ui.webc.fiori.MediaGallery#display-area-click
 * @public
 */
@event("display-area-click")

class MediaGallery extends UI5Element {
	/**
	 * If set to <code>true</code>, all thumbnails are rendered in a scrollable container.
	 * If <code>false</code>, only up to five thumbnails are rendered, followed by
	 * an overflow button that shows the count of the remaining thumbnails.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.MediaGallery.prototype.showAllThumbnails
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	showAllThumbnails!: boolean;

	/**
	 * If enabled, a <code>display-area-click</code> event is fired
	 * when the user clicks or taps on the display area.
	 * <br>
	 * The display area is the central area that contains
	 * the enlarged content of the currently selected item.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.MediaGallery.prototype.interactiveDisplayArea
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	interactiveDisplayArea!: boolean;

	/**
	 * Determines the layout of the component.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>Auto</code></li>
	 * <li><code>Vertical</code></li>
	 * <li><code>Horizontal</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.fiori.types.MediaGalleryLayout}
	 * @name sap.ui.webc.fiori.MediaGallery.prototype.layout
	 * @defaultvalue "Auto"
	 * @public
	 */
	@property({ type: MediaGalleryLayout, defaultValue: MediaGalleryLayout.Auto })
	layout!: `${MediaGalleryLayout}`;

	/**
	 * Determines the horizontal alignment of the thumbnails menu
	 * vs. the central display area.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>Left</code></li>
	 * <li><code>Right</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.fiori.types.MediaGalleryMenuHorizontalAlign}
	 * @name sap.ui.webc.fiori.MediaGallery.prototype.menuHorizontalAlign
	 * @defaultvalue "Left"
	 * @public
	 */
	@property({ type: MediaGalleryMenuHorizontalAlign, defaultValue: MediaGalleryMenuHorizontalAlign.Left })
	menuHorizontalAlign!: `${MediaGalleryMenuHorizontalAlign}`;

	/**
	 * Determines the vertical alignment of the thumbnails menu
	 * vs. the central display area.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>Top</code></li>
	 * <li><code>Bottom</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.fiori.types.MediaGalleryMenuVerticalAlign}
	 * @name sap.ui.webc.fiori.MediaGallery.prototype.menuVerticalAlign
	 * @defaultvalue "Bottom"
	 * @public
	 */
	@property({ type: MediaGalleryMenuVerticalAlign, defaultValue: MediaGalleryMenuVerticalAlign.Bottom })
	menuVerticalAlign!: `${MediaGalleryMenuVerticalAlign}`;

	/**
	 * Determines the actual applied layout type
	 * (esp. needed when the app did not specify a fixed layout type
	 * but selected <code>Auto</code> layout type).
	 * <br><br>
	 * Possible values are:
	 * <ul>
	 * <li><code>Vertical</code></li>
	 * <li><code>Horizontal</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.fiori.types.MediaGalleryLayout}
	 * @defaultvalue "Vertical"
	 * @private
	 */
	@property({ type: MediaGalleryLayout, defaultValue: MediaGalleryLayout.Vertical })
	effectiveLayout!: `${MediaGalleryLayout}`;

	/**
	 * Defines the current media query size.
	 *
	 * @private
	 */
	@property()
	mediaRange!: string;

	/**
	 * The number of items in the overflow.
	 *
	 * @private
	 */
	@property({ validator: Integer, noAttribute: true, defaultValue: 0 })
	_overflowSize!: number;

	/**
	 * Defines the component items.
	 *
	 * <br><br>
	 * <b>Note:</b> Only one selected item is allowed.
	 *
	 * <br><br>
	 * <b>Note:</b> Use the <code>ui5-media-gallery-item</code> component to define the desired items.
	 *
	 * @type {sap.ui.webc.fiori.IMediaGalleryItem[]}
	 * @name sap.ui.webc.fiori.MediaGallery.prototype.default
	 * @slot items
	 * @public
	 */
	@slot({
		type: HTMLElement,
		individualSlots: true,
		invalidateOnChildChange: true,
		"default": true,
	})
	items!: Array<MediaGalleryItem>;

	_itemNavigation: ItemNavigation;
	_onResize: () => void;
	_selectedItem?: MediaGalleryItem;

	constructor() {
		super();
		this._onResize = this._updateLayout.bind(this);

		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Auto,
			getItemsCallback: () => this._getFocusableItems(),
		});
	}

	onEnterDOM() {
		!isPhone() && ResizeHandler.register(this, this._onResize);
	}

	onExitDOM() {
		!isPhone() && ResizeHandler.deregister(this, this._onResize);
	}

	onAfterRendering() {
		this._updateLayout();
		this._updateSelection();
	}

	_updateSelection() {
		let itemToSelect = this.items.find(item => item.selected);
		if (!itemToSelect || !this._isSelectableItem(itemToSelect)) {
			itemToSelect = this._findSelectableItem();
		}
		if (itemToSelect && itemToSelect !== this._selectedItem) {
			this._selectItem(itemToSelect);
		}
	}

	_isSelectableItem(this: void, item: MediaGalleryItem) {
		return !item.disabled && !item.hidden;
	}

	_findSelectableItem() {
		return this.items.find(this._isSelectableItem);
	}

	_updateMediaRange(width: number) {
		this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, width);
	}

	_updateLayout() {
		const rootNode = this.getDomRef()!,
			height = rootNode.offsetHeight,
			width = rootNode.offsetWidth;

		if (!width || !height || isPhone()) {
			return;
		}

		this._updateMediaRange(width);
		this.effectiveLayout = this._infereffectiveLayout();
		this._overflowSize = this._calculateOverflowSize(width, height);

		this._toggleDisplaySquareSize(this._shouldHaveSquareDisplay);
		this._toggleMainItem9x16size(this._shouldHaveWideDisplay);
	}

	_calculateOverflowSize(width: number, height: number) {
		const marginSize = MediaGallery.THUMBNAIL_MARGIN;
		let columnHeight,
			columnsCount;

		if (this.showAllThumbnails) {
			return 0;
		}

		if (this.effectiveLayout === MediaGalleryLayout.Horizontal) {
			columnHeight = height - marginSize;
			columnsCount = this.showAllThumbnails ? COLUMNS_COUNT[this.mediaRange] : 1;
		} else {
			columnHeight = width - (marginSize * 2); // column is flexed to appear as a row in this case
			columnsCount = 1;
		}
		return this._getOverflowSize(columnHeight, columnsCount);
	}

	_toggleDisplaySquareSize(enable: boolean) {
		this._display!.style.width = ""; // restore default width

		if (enable) {
			const marginSize = MediaGallery.THUMBNAIL_MARGIN,
				width = this._display!.offsetWidth;

			let availableHeight = this.getDomRef()!.offsetHeight - (2 * marginSize);
			if (this.effectiveLayout === MediaGalleryLayout.Vertical) {
				availableHeight -= (MediaGallery.THUMBNAIL_HEIGHT + marginSize);
			}

			if (width > availableHeight) {
				// set to square
				this._display!.style.width = `${availableHeight}px`;
			}
		}
	}

	_toggleMainItem9x16size(enable: boolean) {
		if (!this._mainItem) {
			return;
		}
		const width = this._mainItem.offsetWidth,
			contentHeight = enable ? `${(width / 16) * 9}px` : "";

		this._mainItem.contentHeight = contentHeight;
	}

	_infereffectiveLayout() {
		if (this.layout === MediaGalleryLayout.Auto) {
			return (this._isPhoneSize) ? MediaGalleryLayout.Vertical
				: MediaGalleryLayout.Horizontal;
		}
		return this.layout;
	}

	_getMaxAllowedThumbnailsInColumn(columnHeight: number) {
		let maxAllowedItems = Math.floor(columnHeight / MediaGallery.THUMBNAIL_HEIGHT);
		if (!this.showAllThumbnails) {
			maxAllowedItems = Math.min(maxAllowedItems, 5);
		}
		return maxAllowedItems;
	}

	_getOverflowSize(columnHeight: number, columnsCount: number) {
		const maxAlowedThumbnailsInColumn = this._getMaxAllowedThumbnailsInColumn(columnHeight),
			overflowSize = Math.max(0, this.items.length - maxAlowedThumbnailsInColumn * columnsCount);
		if (overflowSize === this.items.length || overflowSize === 0) {
			return overflowSize;
		}
		return overflowSize + 1; // overflow 1 extra item to make room for overflow btn as well
	}

	_getFocusableItems() {
		if (!this._showThumbnails) {
			return [];
		}

		const items: Array<ITabbable> = this._visibleItems.filter(item => !item.disabled);

		if (this._overflowBtn) {
			items.push(this._overflowBtn);
		}
		return items;
	}

	_selectItem(item: MediaGalleryItem, userInteraction = false) {
		if (item === this._selectedItem) {
			return;
		}
		this._selectedItem = item;

		this._updateSelectedFlag(item);
		this._itemNavigation.setCurrentItem(item);

		if (userInteraction) {
			this.fireEvent<MediaGallerySelectionChangeEventDetail>("selection-change", { item });
		}

		if (isPhone()) {
			this._selectItemOnPhone(item);
		} else {
			this._displayContent(item);
		}
	}

	_updateSelectedFlag(itemToSelect: MediaGalleryItem) {
		this.items.forEach(next => { next.selected = false; });
		itemToSelect.selected = true;
	}

	_selectItemOnPhone(item: MediaGalleryItem) {
		const selectableItemIndex = this._selectableItems.indexOf(item),
			carousel = this._carousel;
		carousel && carousel.navigateTo(selectableItemIndex);
	}

	_displayContent(item: MediaGalleryItem) {
		let clone;
		const mainItem = this._mainItem,
			oldContent = mainItem!._content,
			newContent = item._content;

		mainItem!._thumbnailDesign = false;
		oldContent && oldContent.remove();

		if (newContent) {
			clone = newContent.cloneNode(true);
			mainItem!.layout = item.layout;
			mainItem!.appendChild(clone);
		}
	}

	_onThumbnailClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const item = target.closest<MediaGalleryItem>("[ui5-media-gallery-item]")!;

		if (item.disabled) {
			return;
		}
		if (item !== this._selectedItem) {
			this._selectItem(item, true /* userInteraction */);
		}
	}

	_onOverflowBtnClick() {
		this.fireEvent("overflow-click");
	}

	_onDisplayAreaClick() {
		if (!this.interactiveDisplayArea) {
			return;
		}

		this.fireEvent("display-area-click");
	}

	_onCarouselNavigate(e: CustomEvent<CarouselNavigateEventDetail>) {
		const selectedIndex = e.detail.selectedIndex,
			item = this._selectableItems[selectedIndex];

		this.fireEvent<MediaGallerySelectionChangeEventDetail>("selection-change", { item });
	}

	get _mainItemTabIndex() {
		return this.interactiveDisplayArea ? 0 : undefined;
	}

	get _selectableItems() {
		return this.items.filter(this._isSelectableItem);
	}

	get _carousel() {
		return this.shadowRoot!.querySelector<Carousel>("[ui5-carousel]");
	}

	get _display() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-media-gallery-display");
	}

	get _mainItem() {
		return this.shadowRoot!.querySelector<MediaGalleryItem>(".ui5-media-gallery-display [ui5-media-gallery-item]");
	}

	get _overflowBtn() {
		return this.shadowRoot!.querySelector<Button>(".ui5-media-gallery-overflow [ui5-button]");
	}

	get _visibleItems() {
		const visibleItemsCount = this.items.length - this._overflowSize;
		return this.items.slice(0, visibleItemsCount);
	}

	get _isPhonePlatform() {
		return isPhone();
	}

	get _showThumbnails() {
		return !isPhone();
	}

	get _showOverflowBtn() {
		return this._overflowSize > 0;
	}

	get _isPhoneSize() {
		return this.mediaRange === "S";
	}

	get _mainItemHasWideLayout() {
		return this._mainItem && (this._mainItem.layout === MediaGalleryItemLayout.Wide);
	}

	get _shouldHaveWideDisplay() {
		return !!this._mainItemHasWideLayout
			&& this.showAllThumbnails
			&& (this.effectiveLayout === MediaGalleryLayout.Horizontal);
	}

	get _shouldHaveSquareDisplay() {
		// by default it should be square
		// with the only exception when a wide 9*16 item should be displayed
		return !this._shouldHaveWideDisplay;
	}

	static get THUMBNAIL_HEIGHT() {
		return 80; // px
	}

	static get THUMBNAIL_MARGIN() {
		return 16; // px
	}
}

MediaGallery.define();

export default MediaGallery;

export type { MediaGallerySelectionChangeEventDetail };
