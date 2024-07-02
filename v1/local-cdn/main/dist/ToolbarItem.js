var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";
/**
 * @class
 *
 * Represents an abstract class for items, used in the `ui5-toolbar`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.17.0
 */
class ToolbarItem extends UI5Element {
    /**
    * Defines if the width of the item should be ignored in calculating the whole width of the toolbar
    * @protected
    */
    get ignoreSpace() {
        return false;
    }
    /**
     * Returns if the item contains text. Used to position the text properly inside the popover.
     * Aligned left if the item has text, default aligned otherwise.
     * @protected
     */
    get containsText() {
        return false;
    }
    /**
     * Returns if the item is flexible. An item that is returning true for this property will make
     * the toolbar expand to fill the 100% width of its container.
     * @protected
     */
    get hasFlexibleWidth() {
        return false;
    }
    /**
     * Returns if the item is interactive.
     * This value is used to determinate if the toolbar should have its accessibility role and attributes set.
     * At least two interactive items are needed for the toolbar to have the role="toolbar" attribute set.
     * @protected
     */
    get isInteractive() {
        return true;
    }
    /**
     * Returns if the item is separator.
     * @protected
     */
    get isSeparator() {
        return false;
    }
    /**
     * Returns the template for the toolbar item.
     * @protected
     */
    static get toolbarTemplate() {
        throw new Error("Template must be defined");
    }
    /**
     * Returns the template for the toolbar item popover.
     * @protected
     */
    static get toolbarPopoverTemplate() {
        throw new Error("Popover template must be defined");
    }
    /**
     * Returns the events that the item is subscribed to.
     * @protected
     */
    get subscribedEvents() {
        return new Map();
    }
    get stableDomRef() {
        return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
    }
}
__decorate([
    property({ type: ToolbarItemOverflowBehavior, defaultValue: ToolbarItemOverflowBehavior.Default })
], ToolbarItem.prototype, "overflowPriority", void 0);
__decorate([
    property({ type: Boolean })
], ToolbarItem.prototype, "preventOverflowClosing", void 0);
export default ToolbarItem;
//# sourceMappingURL=ToolbarItem.js.map