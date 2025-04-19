var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Search_1;
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { isUp, isDown, isEnter, isBackSpace, isDelete, isEscape, isTabNext, isPageUp, isPageDown, isHome, isEnd, isRight, isTabPrevious, } from "@ui5/webcomponents-base/dist/Keys.js";
import SearchTemplate from "./SearchTemplate.js";
import SearchCss from "./generated/themes/Search.css.js";
import SearchField from "./SearchField.js";
import { StartsWith, StartsWithPerTerm } from "@ui5/webcomponents/dist/Filters.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { SEARCH_CANCEL_BUTTON, SEARCH_SUGGESTIONS } from "./generated/i18n/i18n-defaults.js";
import { i18n } from "@ui5/webcomponents-base/dist/decorators.js";
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
let Search = Search_1 = class Search extends SearchField {
    constructor() {
        super();
        /**
         * Indicates whether a loading indicator should be shown in the popup.
         * @default false
         * @public
         */
        this.loading = false;
        /**
         * Defines whether the value will be autcompleted to match an item.
         * @default false
         * @public
         */
        this.noTypeahead = false;
        /**
         * Indicates whether the items picker is open.
         * @public
         */
        this.open = false;
        // The typed in value.
        this._typedInValue = "";
        this._matchedPerTerm = false;
        this._valueBeforeOpen = this.getAttribute("value") || "";
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
        if (isPhone() && this.open) {
            const item = this._getFirstMatchingItem(this.value);
            this._proposedItem = item;
            this._deselectItems();
            if (item && this._performItemSelectionOnMobile) {
                item.selected = true;
            }
        }
        this._flattenItems.forEach(item => {
            item.highlightText = this._typedInValue;
        });
        this._shouldAutocomplete = false;
    }
    onAfterRendering() {
        const innerInput = this.nativeInput;
        if (this._performTextSelection && innerInput && innerInput.value !== this._innerValue) {
            innerInput.value = this._innerValue || "";
        }
        if (this._performTextSelection && this._typedInValue.length && this.value.length) {
            innerInput?.setSelectionRange(this._typedInValue.length, this.value.length);
        }
        this._performTextSelection = false;
        if (!this.collapsed) {
            this.style.setProperty("--search_width", `${this.getBoundingClientRect().width}px`);
        }
    }
    _handleMobileInput(e) {
        this.value = e.target.value;
        this._performItemSelectionOnMobile = this._shouldPerformSelectionOnMobile(e);
        this.fireDecoratorEvent("input");
    }
    _shouldPerformSelectionOnMobile(e) {
        const eventType = e.detail.inputType;
        const allowedEventTypes = [
            "deleteWordBackward",
            "deleteWordForward",
            "deleteSoftLineBackward",
            "deleteSoftLineForward",
            "deleteEntireSoftLine",
            "deleteHardLineBackward",
            "deleteHardLineForward",
            "deleteByDrag",
            "deleteByCut",
            "deleteContent",
            "deleteContentBackward",
            "deleteContentForward",
            "historyUndo",
        ];
        return !this.noTypeahead && !allowedEventTypes.includes(eventType || "");
    }
    _handleTypeAhead(item) {
        const originalValue = item.text || "";
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
        return StartsWith(str, this._flattenItems.filter(item => !this._isGroupItem(item)), "text");
    }
    _startsWithPerTermMatchingItems(str) {
        return StartsWithPerTerm(str, this._flattenItems.filter(item => !this._isGroupItem(item)), "text");
    }
    _isGroupItem(item) {
        return item.hasAttribute("ui5-search-item-group");
    }
    _deselectItems() {
        this._flattenItems.forEach(item => {
            item.selected = false;
        });
    }
    _handleDown(e) {
        if (this.open) {
            e.preventDefault();
            this._handleArrowDown();
        }
    }
    _handleArrowDown() {
        const firstListItem = this._getItemsList()?.getSlottedNodes("items")[0];
        if (this.open) {
            this._deselectItems();
            this.value = this._typedInValue || this.value;
            this._innerValue = this.value;
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
    _handleInnerClick() {
        if (isPhone()) {
            this.open = true;
        }
    }
    _handleSearchIconPress() {
        if (isPhone()) {
            this.open = true;
        }
        else {
            super._handleSearchIconPress();
        }
    }
    _handleEnter() {
        const prevented = !this.fireDecoratorEvent("search", { item: this._proposedItem });
        if (prevented) {
            return;
        }
        const innerInput = this.nativeInput;
        if (this._matchedPerTerm) {
            this.value = this._proposedItem?.text || this.value;
            this._innerValue = this.value;
            this._typedInValue = this.value;
            this._matchedPerTerm = false;
        }
        innerInput.setSelectionRange(this.value.length, this.value.length);
        this.open = false;
    }
    _onMobileInputKeydown(e) {
        if (isEnter(e)) {
            this.value = this.mobileInput?.value || this.value;
            this._handleEnter();
            this.blur();
        }
    }
    _handleSearchEvent() {
        this.fireDecoratorEvent("search", { item: this._proposedItem });
    }
    _handleEscape() {
        this.value = this._typedInValue || this.value;
        this._innerValue = this.value;
    }
    _handleInput(e) {
        super._handleInput(e);
        this.open = !isPhone() && (e.currentTarget.value.length > 0) && this._popoupHasAnyContent();
    }
    _popoupHasAnyContent() {
        return this.items.length > 0 || this.illustration.length > 0 || this.messageArea.length > 0 || this.loading || this.action.length > 0;
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
            if (isPhone()) {
                this.open = false;
            }
            return;
        }
        this.value = item.text;
        this._innerValue = this.value;
        this._typedInValue = this.value;
        this.open = false;
        this.focus();
    }
    _onkeydown(e) {
        super._onkeydown(e);
        if (this.loading) {
            return;
        }
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
    _onfocusout() {
        super._onfocusout();
        if (this._matchedPerTerm) {
            this.value = this._typedInValue;
            this._innerValue = this._typedInValue;
        }
        this._matchedPerTerm = false;
    }
    _onFocusOutSearch(e) {
        const target = e.relatedTarget;
        if (this._getPicker().contains(target) || this.contains(target)) {
            return;
        }
        this.open = false;
    }
    _handleBeforeClose(e) {
        if (e.detail.escPressed) {
            this.focus();
        }
    }
    _handleCancel() {
        this._handleClose();
        this.value = this._valueBeforeOpen;
        this.fireDecoratorEvent("input");
    }
    _handleClose() {
        this.open = false;
        this.fireDecoratorEvent("close");
    }
    _handleBeforeOpen() {
        if (isPhone() && this.mobileInput) {
            this.mobileInput.value = this.value;
        }
    }
    _handleOpen() {
        this._valueBeforeOpen = this.value;
        this.fireDecoratorEvent("open");
    }
    _handleActionKeydown(e) {
        if (isUp(e)) {
            this._flattenItems[this._flattenItems.length - 1].focus();
        }
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
        return this.action[0];
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
    get mobileInput() {
        const domRef = this.shadowRoot;
        return domRef ? domRef.querySelector(`[ui5-input]`) : null;
    }
    get cancelButtonText() {
        return Search_1.i18nBundle.getText(SEARCH_CANCEL_BUTTON);
    }
    get suggestionsText() {
        return Search_1.i18nBundle.getText(SEARCH_SUGGESTIONS);
    }
    get scopeSelect() {
        const domRef = this.shadowRoot;
        return domRef ? domRef.querySelector(`[ui5-select]`) : null;
    }
};
__decorate([
    property({ type: Boolean })
], Search.prototype, "loading", void 0);
__decorate([
    property({ type: Boolean })
], Search.prototype, "noTypeahead", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Search.prototype, "items", void 0);
__decorate([
    slot()
], Search.prototype, "action", void 0);
__decorate([
    slot()
], Search.prototype, "illustration", void 0);
__decorate([
    slot()
], Search.prototype, "messageArea", void 0);
__decorate([
    property({ type: Boolean })
], Search.prototype, "open", void 0);
__decorate([
    property({ noAttribute: true })
], Search.prototype, "_innerValue", void 0);
__decorate([
    property({ type: Boolean })
], Search.prototype, "_performItemSelectionOnMobile", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], Search, "i18nBundle", void 0);
Search = Search_1 = __decorate([
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