var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MediaGallery_1;
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Carousel from "@ui5/webcomponents/dist/Carousel.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import MediaGalleryItem from "./MediaGalleryItem.js";
import MediaGalleryItemLayout from "./types/MediaGalleryItemLayout.js";
import MediaGalleryLayout from "./types/MediaGalleryLayout.js";
// Styles
import MediaGalleryCss from "./generated/themes/MediaGallery.css.js";
// Template
import MediaGalleryTemplate from "./MediaGalleryTemplate.js";
// The allowed number of thumbnail columns on each size
// (relevant when `showAllThumbnails` is enabled)
const COLUMNS_COUNT = {
    "S": 1,
    "M": 2,
    "L": 3,
    "XL": 4,
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-media-gallery` component allows the user to browse through multimedia items. Currently,
 * the supported items are images and videos. The items should be defined using the `ui5-media-gallery-item`
 * component.
 *
 * The items are initially displayed as thumbnails. When the user selects a thumbnail, the corresponding item
 * is displayed in larger size.
 *
 * The component is responsive by default and adjusts the position of the menu with respect to viewport size,
 * but the application is able to further customize the layout via the provided API.
 *
 * ### Keyboard Handling
 * The `ui5-media-gallery` provides advanced keyboard handling.
 *
 * When the thumbnails menu is focused the following keyboard
 * shortcuts allow the user to navigate through the thumbnail items:
 *
 * - [Up] or [Down] - Navigates up and down the items
 * - [Home] - Navigates to first item
 * - [End] - Navigates to the last item
 * - [Space], [Enter] - Selects an item
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/MediaGallery.js";`
 *
 * `import "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.1.0
 */
let MediaGallery = MediaGallery_1 = class MediaGallery extends UI5Element {
    constructor() {
        super();
        /**
         * If set to `true`, all thumbnails are rendered in a scrollable container.
         * If `false`, only up to five thumbnails are rendered, followed by
         * an overflow button that shows the count of the remaining thumbnails.
         * @default false
         * @public
         */
        this.showAllThumbnails = false;
        /**
         * If enabled, a `display-area-click` event is fired
         * when the user clicks or taps on the display area.
         *
         * The display area is the central area that contains
         * the enlarged content of the currently selected item.
         * @default false
         * @public
         */
        this.interactiveDisplayArea = false;
        /**
         * Determines the layout of the component.
         * @default "Auto"
         * @public
         */
        this.layout = "Auto";
        /**
         * Determines the horizontal alignment of the thumbnails menu
         * vs. the central display area.
         * @default "Left"
         * @public
         */
        this.menuHorizontalAlign = "Left";
        /**
         * Determines the vertical alignment of the thumbnails menu
         * vs. the central display area.
         * @default "Bottom"
         * @public
         */
        this.menuVerticalAlign = "Bottom";
        /**
         * Determines the actual applied layout type
         * (esp. needed when the app did not specify a fixed layout type
         * but selected `Auto` layout type).
         * @default "Vertical"
         * @private
         */
        this.effectiveLayout = "Vertical";
        /**
         * Defines the current media query size.
         * @private
         */
        this.mediaRange = "S";
        /**
         * The number of items in the overflow.
         * @private
         */
        this._overflowSize = 0;
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
        if (this.items.length === 0) {
            this._selectedItem = undefined;
            if (this._mainItem) {
                const oldContent = this._mainItem.displayedContent;
                oldContent?.remove();
            }
            return;
        }
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
        const rootNode = this.getDomRef(), height = rootNode.offsetHeight, width = rootNode.offsetWidth;
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
        const marginSize = MediaGallery_1.THUMBNAIL_MARGIN;
        let columnHeight, columnsCount;
        if (this.showAllThumbnails) {
            return 0;
        }
        if (this.effectiveLayout === MediaGalleryLayout.Horizontal) {
            columnHeight = height - marginSize;
            columnsCount = this.showAllThumbnails ? COLUMNS_COUNT[this.mediaRange] : 1;
        }
        else {
            columnHeight = width - (marginSize * 2); // column is flexed to appear as a row in this case
            columnsCount = 1;
        }
        return this._getOverflowSize(columnHeight, columnsCount);
    }
    _toggleDisplaySquareSize(enable) {
        this._display.style.width = ""; // restore default width
        if (enable) {
            const marginSize = MediaGallery_1.THUMBNAIL_MARGIN, width = this._display.offsetWidth;
            let availableHeight = this.getDomRef().offsetHeight - (2 * marginSize);
            if (this.effectiveLayout === MediaGalleryLayout.Vertical) {
                availableHeight -= (MediaGallery_1.THUMBNAIL_HEIGHT + marginSize);
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
        const width = this._mainItem.offsetWidth, contentHeight = enable ? `${(width / 16) * 9}px` : "";
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
        let maxAllowedItems = Math.floor(columnHeight / MediaGallery_1.THUMBNAIL_HEIGHT);
        if (!this.showAllThumbnails) {
            maxAllowedItems = Math.min(maxAllowedItems, 5);
        }
        return maxAllowedItems;
    }
    _getOverflowSize(columnHeight, columnsCount) {
        const maxAlowedThumbnailsInColumn = this._getMaxAllowedThumbnailsInColumn(columnHeight), overflowSize = Math.max(0, this.items.length - maxAlowedThumbnailsInColumn * columnsCount);
        if (overflowSize === this.items.length || overflowSize === 0) {
            return overflowSize;
        }
        return overflowSize + 1; // overflow 1 extra item to make room for overflow btn as well
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
    _selectItem(item, userInteraction = false) {
        if (item === this._selectedItem) {
            return;
        }
        this._selectedItem = item;
        this._updateSelectedFlag(item);
        this._itemNavigation.setCurrentItem(item);
        if (userInteraction) {
            this.fireDecoratorEvent("selection-change", { item });
        }
        if (isPhone()) {
            this._selectItemOnPhone(item);
        }
        else {
            this._displayContent(item);
        }
    }
    _updateSelectedFlag(itemToSelect) {
        this.items.forEach(next => { next.selected = false; });
        itemToSelect.selected = true;
    }
    _selectItemOnPhone(item) {
        const selectableItemIndex = this._selectableItems.indexOf(item), carousel = this._carousel;
        carousel && carousel.navigateTo(selectableItemIndex);
    }
    _displayContent(item) {
        let clone;
        const mainItem = this._mainItem, oldContent = mainItem.displayedContent, newContent = item.displayedContent;
        mainItem._thumbnailDesign = false;
        oldContent && oldContent.remove();
        if (newContent) {
            clone = newContent.cloneNode(true);
            mainItem.layout = item.layout;
            mainItem.appendChild(clone);
        }
    }
    _onThumbnailClick(e) {
        const target = e.target;
        const item = target.closest("[ui5-media-gallery-item]");
        if (item.disabled) {
            return;
        }
        if (item !== this._selectedItem) {
            this._selectItem(item, true /* userInteraction */);
        }
    }
    _onOverflowBtnClick() {
        this.fireDecoratorEvent("overflow-click");
    }
    _onDisplayAreaClick() {
        if (!this.interactiveDisplayArea) {
            return;
        }
        this.fireDecoratorEvent("display-area-click");
    }
    _onCarouselNavigate(e) {
        const selectedIndex = e.detail.selectedIndex, item = this._selectableItems[selectedIndex];
        this.fireDecoratorEvent("selection-change", { item });
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
};
__decorate([
    property({ type: Boolean })
], MediaGallery.prototype, "showAllThumbnails", void 0);
__decorate([
    property({ type: Boolean })
], MediaGallery.prototype, "interactiveDisplayArea", void 0);
__decorate([
    property()
], MediaGallery.prototype, "layout", void 0);
__decorate([
    property()
], MediaGallery.prototype, "menuHorizontalAlign", void 0);
__decorate([
    property()
], MediaGallery.prototype, "menuVerticalAlign", void 0);
__decorate([
    property()
], MediaGallery.prototype, "effectiveLayout", void 0);
__decorate([
    property()
], MediaGallery.prototype, "mediaRange", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], MediaGallery.prototype, "_overflowSize", void 0);
__decorate([
    slot({
        type: HTMLElement,
        individualSlots: true,
        invalidateOnChildChange: true,
        "default": true,
    })
], MediaGallery.prototype, "items", void 0);
MediaGallery = MediaGallery_1 = __decorate([
    customElement({
        tag: "ui5-media-gallery",
        renderer: jsxRenderer,
        styles: [MediaGalleryCss],
        template: MediaGalleryTemplate,
        dependencies: [
            MediaGalleryItem,
            Button,
            Carousel,
        ],
    })
    /**
     * Fired when selection is changed by user interaction.
     * @param {HTMLElement} item the selected item.
     * @public
     */
    ,
    event("selection-change", {
        bubbles: true,
    })
    /**
     * Fired when the thumbnails overflow button is clicked.
     * @public
     */
    ,
    event("overflow-click", {
        bubbles: true,
    })
    /**
     * Fired when the display area is clicked.
     * The display area is the central area that contains
     * the enlarged content of the currently selected item.
     * @public
     */
    ,
    event("display-area-click", {
        bubbles: true,
    })
], MediaGallery);
MediaGallery.define();
export default MediaGallery;
//# sourceMappingURL=MediaGallery.js.map