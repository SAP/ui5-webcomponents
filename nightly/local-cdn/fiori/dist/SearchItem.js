var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SearchItem_1;
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import SearchItemTemplate from "./SearchItemTemplate.js";
import SearchItemCss from "./generated/themes/SearchItem.css.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { SEARCH_ITEM_DELETE_BUTTON } from "./generated/i18n/i18n-defaults.js";
import { i18n } from "@ui5/webcomponents-base/dist/decorators.js";
// @ts-expect-error
import encodeXML from "@ui5/webcomponents-base/dist/sap/base/security/encodeXML.js";
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search-item` is a list item, used for displaying search suggestions
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SearchItem.js";`
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @since 2.9.0
 * @experimental
 */
let SearchItem = SearchItem_1 = class SearchItem extends ListItemBase {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the search item is selected.
         * @default false
         * @public
         */
        this.selected = false;
        /**
         * Defines whether the search item is deletable.
         * @default false
         * @public
         */
        this.deletable = false;
        this.highlightText = "";
        this._markupText = "";
    }
    _onfocusin(e) {
        super._onfocusin(e);
        this.selected = true;
    }
    _onfocusout() {
        this.selected = false;
    }
    _onDeleteButtonClick() {
        this.fireDecoratorEvent("delete");
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        // bold the matched text
        this._markupText = this.highlightText ? generateHighlightedMarkup((this.text || ""), this.highlightText) : encodeXML(this.text || "");
    }
    get _deleteButtonTooltip() {
        return SearchItem_1.i18nBundle.getText(SEARCH_ITEM_DELETE_BUTTON);
    }
};
__decorate([
    property()
], SearchItem.prototype, "text", void 0);
__decorate([
    property()
], SearchItem.prototype, "description", void 0);
__decorate([
    property()
], SearchItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], SearchItem.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], SearchItem.prototype, "deletable", void 0);
__decorate([
    property()
], SearchItem.prototype, "scopeName", void 0);
__decorate([
    property()
], SearchItem.prototype, "highlightText", void 0);
__decorate([
    slot()
], SearchItem.prototype, "image", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], SearchItem, "i18nBundle", void 0);
SearchItem = SearchItem_1 = __decorate([
    customElement({
        tag: "ui5-search-item",
        languageAware: true,
        renderer: jsxRenderer,
        template: SearchItemTemplate,
        styles: [
            ListItemBase.styles,
            SearchItemCss,
        ],
    })
    /**
     * Fired when delete button is pressed.
     *
     * @public
     */
    ,
    event("delete")
], SearchItem);
SearchItem.define();
export default SearchItem;
//# sourceMappingURL=SearchItem.js.map