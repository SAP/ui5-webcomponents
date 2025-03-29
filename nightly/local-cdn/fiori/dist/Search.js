var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import SearchPopupMode from "@ui5/webcomponents/dist/types/SearchPopupMode.js";
import { isUp, isDown, isEnter, isBackSpace, isDelete, isEscape, isTabNext, isPageUp, isPageDown, isHome, isEnd, isRight, isTabPrevious, } from "@ui5/webcomponents-base/dist/Keys.js";
import SearchTemplate from "./SearchTemplate.js";
import SearchCss from "./generated/themes/Search.css.js";
import SearchField from "./SearchField.js";
import { StartsWith, StartsWithPerTerm } from "@ui5/webcomponents/dist/Filters.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search` is an input with suggestions, used for user search.
 *
 * The `ui5-search` consists of several elements parts:
 * - Scope - displays a select in the beggining of the component, used for filtering results by their scope.
 * - Input field - for user input value
 * - Clear button - gives the possibility for deleting the entered value
 * - Search button - a primary button for performing search, when the user has entered a search term
 * - Expand/Collapse button - when there is no search term, the search button behaves as an expand/collapse button for the `ui5-search` component
 * - Suggestions - a list with available search suggestions
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/fiori/dist/Search.js";`
 *
 * @constructor
 * @extends SearchField
 * @public
 * @since 2.9.0
 * @experimental
 */
let Search = class Search extends SearchField {
    constructor() {
        super();
        /**
         * Defines the visualisation mode of the search component.
         *
         * @default "List"
         * @public
         */
        this.popupMode = "List";
        /**
         * Defines whether the value will be autcompleted to match an item.
         * @default false
         * @public
         */
        this.noTypeahead = false;
        /**
         * Defines the header text to be placed in the search suggestions popup.
         * @public
         */
        this.headerText = "";
        /**
         * Defines the subheader text to be placed in the search suggestions popup.
         * @public
         */
        this.subheaderText = "";
        /**
         * Defines whether the popup footer action button is shown.
         * Note: The footer action button is displayed only when the `popupMode` is set to `List`.
         * @default false
         * @public
         */
        this.showPopupAction = false;
        /**
         * Defines the popup footer action button text.
         * @public
         */
        this.popupActionText = "";
        /**
         * Indicates whether the items picker is open.
         * @public
         */
        this.open = false;
        /**
         * Defines the inner stored value of the component.
         *
         * **Note:** The property is updated upon typing.
         * @default ""
         * @private
         */
        this._innerValue = "";
        // The typed in value.
        this._typedInValue = "";
        this._matchedPerTerm = false;
        this._openPickerOnInput = false;
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        const innerInput = this.nativeInput;
        const autoCompletedChars = innerInput && (innerInput.selectionEnd - innerInput.selectionStart);
        // If there is already a selection the autocomplete has already been performed
        if (this._shouldAutocomplete && !autoCompletedChars) {
            const item = this._getFirstMatchingItem(this.value);
            this._proposedItem = item;
            if (item) {
                this._handleTypeAhead(item);
                this._deselectItems();
                item.selected = true;
            }
            else {
                this._typedInValue = this.value;
            }
        }
        else {
            this._typedInValue = this.value;
        }
        this._flattenItems.forEach(item => {
            item.highlightText = this._typedInValue;
        });
        this._shouldAutocomplete = false;
    }
    onAfterRendering() {
        const innerInput = this.nativeInput;
        if (this._performTextSelection && innerInput.value !== this._innerValue) {
            innerInput.value = this._innerValue;
        }
        if (this._performTextSelection && this._typedInValue.length && this.value.length) {
            innerInput.setSelectionRange(this._typedInValue.length, this.value.length);
        }
        this._performTextSelection = false;
        this.style.setProperty("--search_width", `${this.getBoundingClientRect().width}px`);
    }
    _handleTypeAhead(item) {
        const originalValue = item.headingText || "";
        let displayValue = originalValue;
        if (!originalValue.toLowerCase().startsWith(this.value.toLowerCase())) {
            this._matchedPerTerm = true;
            displayValue = `${this.value} - ${originalValue}`;
        }
        else {
            this._matchedPerTerm = false;
        }
        this._typedInValue = this.value;
        this._innerValue = displayValue;
        this._performTextSelection = true;
        this.value = displayValue;
    }
    _startsWithMatchingItems(str) {
        return StartsWith(str, this._flattenItems.filter(item => !this._isGroupItem(item)), "headingText");
    }
    _startsWithPerTermMatchingItems(str) {
        return StartsWithPerTerm(str, this._flattenItems.filter(item => !this._isGroupItem(item)), "headingText");
    }
    _isGroupItem(item) {
        return item.hasAttribute("ui5-search-item-group");
    }
    _deselectItems() {
        this._flattenItems.forEach(item => {
            item.selected = false;
        });
    }
    async _handleDown(e) {
        if (this.open) {
            e.preventDefault();
            await this._handleArrowDown();
        }
    }
    async _handleArrowDown() {
        const firstListItem = this._getItemsList()?.getSlottedNodes("items")[0];
        const focusRef = firstListItem && this._isGroupItem(firstListItem) ? firstListItem.getFocusDomRef() : firstListItem;
        if (this.open) {
            this._deselectItems();
            firstListItem && focusRef && this._getItemsList()?._itemNavigation.setCurrentItem(focusRef);
            this.value = this._typedInValue || this.value;
            this._innerValue = this.value;
            // wait item navigation to apply correct tabindex
            await renderFinished();
            firstListItem?.focus();
        }
    }
    _handleRight(e) {
        if (this._matchedPerTerm) {
            e.preventDefault();
            this.value = this._typedInValue;
            this._innerValue = this._typedInValue;
            this._proposedItem = undefined;
        }
    }
    _handleEnter() {
        const prevented = !this.fireDecoratorEvent("search", { item: this._proposedItem });
        if (prevented) {
            return;
        }
        const innerInput = this.nativeInput;
        if (this._matchedPerTerm) {
            this.value = this._proposedItem?.headingText || this.value;
            this._innerValue = this.value;
            this._typedInValue = this.value;
            this._matchedPerTerm = false;
        }
        innerInput.setSelectionRange(this.value.length, this.value.length);
        this.open = false;
        this._openPickerOnInput = true;
    }
    _handleSearchEvent() {
        this.fireDecoratorEvent("search", { item: this._proposedItem });
    }
    _handleEscape() {
        this.value = this._typedInValue || this.value;
        this._innerValue = this.value;
        this._openPickerOnInput = true;
    }
    _handleInput(e) {
        super._handleInput(e);
        if (!this._openPickerOnInput) {
            return;
        }
        this.open = true;
        this._openPickerOnInput = false;
    }
    _onFooterButtonKeyDown(e) {
        if (isUp(e)) {
            this._flattenItems[this._flattenItems.length - 1].focus();
        }
        if (isTabPrevious(e)) {
            this._getItemsList().focus();
        }
    }
    _onItemKeydown(e) {
        const isFirstItem = this._flattenItems[0] === e.target;
        const isLastItem = this._flattenItems[this._flattenItems.length - 1] === e.target;
        const isArrowUp = isUp(e);
        const isArrowDown = isDown(e);
        const isTab = isTabNext(e);
        e.preventDefault();
        if (isFirstItem && isArrowUp) {
            this.nativeInput?.focus();
            this._shouldAutocomplete = true;
        }
        if ((isLastItem && isArrowDown) || isTab) {
            this._getFooterButton()?.focus();
        }
    }
    _onItemClick(e) {
        const item = e.detail.item;
        const prevented = !this.fireDecoratorEvent("search", { item });
        if (prevented) {
            return;
        }
        this.value = item.headingText;
        this._innerValue = this.value;
        this._typedInValue = this.value;
        this.open = false;
        this._openPickerOnInput = true;
        this.focus();
    }
    _onkeydown(e) {
        super._onkeydown(e);
        this._shouldAutocomplete = !this.noTypeahead
            && !(isBackSpace(e) || isDelete(e) || isEscape(e) || isUp(e) || isDown(e) || isTabNext(e) || isEnter(e) || isPageUp(e) || isPageDown(e) || isHome(e) || isEnd(e) || isEscape(e));
        if (isRight(e)) {
            this._handleRight(e);
        }
        if (isDown(e)) {
            this._handleDown(e);
        }
        if (isEscape(e)) {
            this._handleEscape();
        }
    }
    _onfocusin() {
        super._onfocusin();
        if (this._openPickerOnInput) {
            return;
        }
        // prevent opening of empty picker on List Mode
        if (this.popupMode === SearchPopupMode.List && !this.items.length) {
            return;
        }
        this.open = true;
    }
    _onfocusout() {
        super._onfocusout();
        if (this._matchedPerTerm) {
            this.value = this._typedInValue;
            this._innerValue = this._typedInValue;
        }
        this._matchedPerTerm = false;
    }
    _onFocusOutSearch() {
        if (!this.matches(":focus-within")) {
            this.open = false;
        }
    }
    _handleClose() {
        this.open = false;
        this.fireDecoratorEvent("close");
    }
    _handleOpen() {
        this.fireDecoratorEvent("open");
    }
    _onFooterButtonClick() {
        this.fireDecoratorEvent("popup-action-press");
    }
    _getFirstMatchingItem(current) {
        if (!this._flattenItems.length || !current) {
            return;
        }
        const startsWithMatches = this._startsWithMatchingItems(current);
        const partialMatches = this._startsWithPerTermMatchingItems(current);
        if (!startsWithMatches.length) {
            return partialMatches[0] ?? undefined;
        }
        if (!partialMatches.length) {
            return startsWithMatches[0];
        }
        return this._flattenItems.indexOf(startsWithMatches[0]) <= this._flattenItems.indexOf(partialMatches[0])
            ? startsWithMatches[0]
            : partialMatches[0];
    }
    _getPicker() {
        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    _getItemsList() {
        return this._getPicker().querySelector(".ui5-search-list");
    }
    _getFooterButton() {
        return this._getPicker().querySelector(".ui5-search-footer-button");
    }
    get _flattenItems() {
        return this.getSlottedNodes("items").flatMap(item => {
            return this._isGroupItem(item) ? [item, ...item.items] : [item];
        });
    }
    get nativeInput() {
        const domRef = this.getDomRef();
        return domRef ? domRef.querySelector(`input`) : null;
    }
    get _showIllustration() {
        return !!this.illustration && this.popupMode === SearchPopupMode.Illustration;
    }
    get _showLoading() {
        return this.popupMode === SearchPopupMode.Loading;
    }
    get _showHeader() {
        return !!this.headerText;
    }
    get _showFooter() {
        return !!this.showPopupAction && this.popupMode === SearchPopupMode.List;
    }
};
__decorate([
    property()
], Search.prototype, "popupMode", void 0);
__decorate([
    property({ type: Boolean })
], Search.prototype, "noTypeahead", void 0);
__decorate([
    property()
], Search.prototype, "headerText", void 0);
__decorate([
    property()
], Search.prototype, "subheaderText", void 0);
__decorate([
    property({ type: Boolean })
], Search.prototype, "showPopupAction", void 0);
__decorate([
    property()
], Search.prototype, "popupActionText", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Search.prototype, "items", void 0);
__decorate([
    slot()
], Search.prototype, "illustration", void 0);
__decorate([
    property({ type: Boolean })
], Search.prototype, "open", void 0);
__decorate([
    property({ noAttribute: true })
], Search.prototype, "_innerValue", void 0);
Search = __decorate([
    customElement({
        tag: "ui5-search",
        languageAware: true,
        renderer: jsxRenderer,
        template: SearchTemplate,
        styles: [
            SearchField.styles,
            SearchCss,
        ],
    })
    /**
     * Fired when load more button is pressed.
     *
     * @public
     */
    ,
    event("popup-action-press")
    /**
     * Fired when the popup is opened.
     *
     * @public
     */
    ,
    event("open")
    /**
     * Fired when the popup is closed.
     *
     * @public
     */
    ,
    event("close")
], Search);
Search.define();
export default Search;
//# sourceMappingURL=Search.js.map