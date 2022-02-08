import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Carousel from "@ui5/webcomponents/dist/Carousel.js";
import MediaGalleryItem from "./MediaGalleryItem.js";
import MediaGalleryItemLayout from "./types/MediaGalleryItemLayout.js";
import MediaGalleryLayout from "./types/MediaGalleryLayout.js";
import MediaGalleryMenuHorizontalAlign from "./types/MediaGalleryMenuHorizontalAlign.js";
import MediaGalleryMenuVerticalAlign from "./types/MediaGalleryMenuVerticalAlign.js";

// Template
import MediaGalleryTemplate from "./generated/templates/MediaGalleryTemplate.lit.js";

// Styles
import MediaGalleryCss from "./generated/themes/MediaGallery.css.js";

// The allowed number of thumbnail columns on each size
// (relevant when <code>showAllThumbnails</code> is enabled)
const COLUMNS_COUNT = {
	"S": 1,
	"M": 2,
	"L": 3,
	"XL": 4,
};

/**
 * @public
 */
const metadata = {
	tag: "ui5-media-gallery",
	managedSlots: true,
	slots: /** @lends  sap.ui.webcomponents.fiori.MediaGallery.prototype */ {
		/**
		 * Defines the component items.
		 *
		 * <br><br>
		 * <b>Note:</b> Only one selected item is allowed.
		 *
		 * <br><br>
		 * <b>Note:</b> Use the <code>ui5-media-gallery-item</code> component to define the desired items.
		 *
		 * @type {sap.ui.webcomponents.fiori.IMediaGalleryItem[]}
		 * @slot items
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			individualSlots: true,
			invalidateOnChildChange: true,
		},
	},
	properties: /** @lends  sap.ui.webcomponents.fiori.MediaGallery.prototype */ {
		/**
		 * If set to <code>true</code>, all thumbnails are rendered in a scrollable container.
		 * If <code>false</code>, only up to five thumbnails are rendered, followed by
		 * an overflow button that shows the count of the remaining thumbnails.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showAllThumbnails: {
			type: Boolean,
		},

		/**
		 * If enabled, a <code>display-area-click</code> event is fired
		 * when the user clicks or taps on the display area.
		 * <br>
		 * The display area is the central area that contains
		 * the enlarged content of the currently selected item.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		interactiveDisplayArea: {
			type: Boolean,
		},

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
		 * @type {MediaGalleryLayout}
		 * @defaultvalue "Auto"
		 * @public
		 */
		layout: {
			type: MediaGalleryLayout,
			defaultValue: "Auto",
		},

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
		 * @type {MediaGalleryMenuHorizontalAlign}
		 * @defaultvalue "Left"
		 * @public
		 */
		menuHorizontalAlign: {
			type: MediaGalleryMenuHorizontalAlign,
			defaultValue: MediaGalleryMenuHorizontalAlign.Left,
		},

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
		 * @type {MediaGalleryMenuVerticalAlign}
		 * @defaultvalue "Bottom"
		 * @public
		 */
		menuVerticalAlign: {
			type: MediaGalleryMenuVerticalAlign,
			defaultValue: MediaGalleryMenuVerticalAlign.Bottom,
		},

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
		 * @type {MediaGalleryLayout}
		 * @defaultvalue "Vertical"
		 * @private
		 */
		effectiveLayout: {
			type: MediaGalleryLayout,
			defaultValue: "Vertical",
		},

		/**
		 * Defines the current media query size.
		 *
		 * @private
		 */
		mediaRange: {
			type: String,
		},

		/**
		 * The number of items in the overflow.
		 *
		 * @private
		 */
		_overflowSize: {
			type: Integer,
			noAttribute: true,
			defaultValue: 0,
		},
	},
	events: /** @lends  sap.ui.webcomponents.fiori.MediaGallery.prototype */ {
		/**
		 * Fired when selection is changed by user interaction.
		 *
		 * @event sap.ui.webcomponents.fiori.MediaGallery#selection-change
		 * @param {HTMLElement} item the selected item.
		 * @public
		 */
		 "selection-change": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the thumbnails overflow button is clicked.
		 *
		 * @event sap.ui.webcomponents.fiori.MediaGallery#overflow-click
		 * @public
		 */
		"overflow-click": {},

		/**
		 * Fired when the display area is clicked.<br>
		 * The display area is the central area that contains
		 * the enlarged content of the currently selected item.
		 *
		 * @event sap.ui.webcomponents.fiori.MediaGallery#display-area-click
		 * @public
		 */
		"display-area-click": {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui-media-gallery</code> component allows the user to browse through multimedia items. Currently,
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
 * <li>[SPACE/ENTER] - Select an item
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
 * @alias sap.ui.webcomponents.fiori.MediaGallery
 * @extends UI5Element
 * @tagname ui5-media-gallery
 * @appenddocs MediaGalleryItem
 * @public
 * @since 1.1.0
 */
class MediaGallery extends UI5Element {
	constructor() {
		super();
		this._onResize = this._updateLayout.bind(this);
		this._selectedItem = null;
		this._initItemNavigation();
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

	_initItemNavigation() {
		if (!this._itemNavigation) {
			this._itemNavigation = new ItemNavigation(this, {
				navigationMode: NavigationMode.Auto,
				getItemsCallback: () => this._getFocusableItems(),
			});
		}
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

	_isSelectableItem(item) {
		return !item.disabled && !item.hidden;
	}

	_findSelectableItem() {
		return this.items.find(this._isSelectableItem);
	}

	_updateMediaRange(width) {
		this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, width);
	}

	_updateLayout() {
		const rootNode = this.getDomRef(),
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

	_calculateOverflowSize(width, height) {
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

	_toggleDisplaySquareSize(enable) {
		this._display.style.width = ""; // restore default width

		if (enable) {
			const marginSize = MediaGallery.THUMBNAIL_MARGIN,
				width = this._display.offsetWidth;

			let availableHeight = this.getDomRef().offsetHeight - (2 * marginSize);
			if (this.effectiveLayout === MediaGalleryLayout.Vertical) {
				availableHeight -= (MediaGallery.THUMBNAIL_HEIGHT + marginSize);
			}

			if (width > availableHeight) {
				// set to square
				this._display.style.width = `${availableHeight}px`;
			}
		}
	}

	_toggleMainItem9x16size(enable) {
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

	_getMaxAllowedThumbnailsInColumn(columnHeight) {
		let maxAllowedItems = Math.floor(columnHeight / MediaGallery.THUMBNAIL_HEIGHT);
		if (!this.showAllThumbnails) {
			maxAllowedItems = Math.min(maxAllowedItems, 5);
		}
		return maxAllowedItems;
	}

	_getOverflowSize(columnHeight, columnsCount) {
		const maxAlowedThumbnailsInColumn = this._getMaxAllowedThumbnailsInColumn(columnHeight),
			overflowSize = Math.max(0, this.items.length - maxAlowedThumbnailsInColumn * columnsCount);
		return (overflowSize > 0) ? overflowSize + 1 : 0; // make room for overflow btn as well
	}

	_getFocusableItems() {
		if (!this._showThumbnails) {
			return [];
		}

		const items = this._visibleItems.filter(item => !item.disabled);

		if (this._overflowBtn) {
			items.push(this._overflowBtn);
		}
		return items;
	}

	_selectItem(item, userInteraction) {
		if (item === this._selectedItem) {
			return;
		}
		this._selectedItem = item;

		this._updateSelectedFlag(item);
		this._itemNavigation.setCurrentItem(item);

		if (userInteraction) {
			this.fireEvent("selection-change", { item });
		}

		if (isPhone()) {
			this._selectItemOnPhone(item);
		} else {
			this._displayContent(item);
		}
	}

	_updateSelectedFlag(itemToSelect) {
		this.items.forEach(next => { next.selected = false; });
		itemToSelect.selected = true;
	}

	_selectItemOnPhone(item) {
		const selectableItemIndex = this._selectableItems.indexOf(item),
			carousel = this._carousel;
		carousel && carousel.navigateTo(selectableItemIndex);
	}

	_displayContent(item) {
		let clone;
		const mainItem = this._mainItem,
			oldContent = mainItem._content,
			newContent = item._content;

		mainItem._thumbnailDesign = false;
		oldContent && oldContent.remove();

		if (newContent) {
			clone = newContent.cloneNode(true);
			mainItem.layout = item.layout;
			mainItem.appendChild(clone);
		}
	}

	_onThumbnailClick(event) {
		const item = event.target.closest("ui5-media-gallery-item");

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

	_onDisplayAreaClick(event) {
		if (!this.interactiveDisplayArea) {
			return;
		}

		this.fireEvent("display-area-click");
	}

	_onCarouselNavigate(event) {
		const selectedIndex = event.detail.selectedIndex,
			item = this._selectableItems[selectedIndex];

		this.fireEvent("selection-change", { item });
	}

	get _mainItemTabIndex() {
		return this.interactiveDisplayArea ? 0 : undefined;
	}

	get _selectableItems() {
		return this.items.filter(this._isSelectableItem);
	}

	get _carousel() {
		return this.shadowRoot.querySelector("[ui5-carousel]");
	}

	get _display() {
		return this.shadowRoot.querySelector(".ui5-media-gallery-display");
	}

	get _mainItem() {
		return this.shadowRoot.querySelector(".ui5-media-gallery-display [ui5-media-gallery-item]");
	}

	get _overflowBtn() {
		return this.shadowRoot.querySelector(".ui5-media-gallery-overflow [ui5-button]");
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
		return this._mainItemHasWideLayout
			&& this.showAllThumbnails
			&& (this.effectiveLayout === MediaGalleryLayout.Horizontal);
	}

	get _shouldHaveSquareDisplay() {
		// by default it should be square
		// with the only exception when a wide 9*16 item should be displayed
		return !this._shouldHaveWideDisplay;
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return MediaGalleryTemplate;
	}

	static get staticAreaTemplate() {
		return MediaGalleryTemplate;
	}

	static get styles() {
		return [MediaGalleryCss];
	}

	static get staticAreaStyles() {
		return null;
	}

	static get dependencies() {
		return [
			MediaGalleryItem,
			Button,
			Carousel,
		];
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
