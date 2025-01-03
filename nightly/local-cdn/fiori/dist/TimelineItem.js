var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import TimelineItemTemplate from "./TimelineItemTemplate.js";
// Styles
import TimelineItemCss from "./generated/themes/TimelineItem.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * An entry posted on the timeline.
 * @constructor
 * @extends UI5Element
 * @implements { ITimelineItem }
 * @public
 */
let TimelineItem = class TimelineItem extends UI5Element {
    constructor() {
        super();
        /**
         * Defines if the `name` is clickable.
         * @default false
         * @public
         */
        this.nameClickable = false;
        /**
         * @private
         */
        this.firstItemInTimeline = false;
        /**
         * @private
         */
        this.isNextItemGroup = false;
        this.forcedTabIndex = "-1";
        /**
         * Defines the items orientation.
         * @default "Vertical"
         * @private
         */
        this.layout = "Vertical";
        /**
         * @private
         */
        this.hideBubble = false;
        /**
         * Marks the last `<ui5-timeline-item>`
         * @private
         */
        this.lastItem = false;
        /**
         * @private
         */
        this.hidden = false;
    }
    onNamePress() {
        this.fireDecoratorEvent("name-click");
    }
    /**
     * Focus the internal link.
     */
    focusLink() {
        this.shadowRoot.querySelector("[ui5-link]")?.focus();
    }
    get isGroupItem() {
        return false;
    }
};
__decorate([
    property()
], TimelineItem.prototype, "icon", void 0);
__decorate([
    property()
], TimelineItem.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "nameClickable", void 0);
__decorate([
    property()
], TimelineItem.prototype, "titleText", void 0);
__decorate([
    property()
], TimelineItem.prototype, "subtitleText", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], TimelineItem.prototype, "content", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "firstItemInTimeline", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "isNextItemGroup", void 0);
__decorate([
    property({ noAttribute: true })
], TimelineItem.prototype, "forcedTabIndex", void 0);
__decorate([
    property()
], TimelineItem.prototype, "layout", void 0);
__decorate([
    property({ noAttribute: true })
], TimelineItem.prototype, "forcedLineWidth", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "hideBubble", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "lastItem", void 0);
__decorate([
    property({ type: Boolean })
], TimelineItem.prototype, "hidden", void 0);
__decorate([
    property({ type: Number })
], TimelineItem.prototype, "positionInGroup", void 0);
TimelineItem = __decorate([
    customElement({
        tag: "ui5-timeline-item",
        renderer: jsxRenderer,
        styles: TimelineItemCss,
        template: TimelineItemTemplate,
        dependencies: [
            Icon,
            Link,
        ],
    })
    /**
     * Fired when the item name is pressed either with a
     * click/tap or by using the Enter or Space key.
     *
     * **Note:** The event will not be fired if the `name-clickable`
     * attribute is not set.
     * @public
     */
    ,
    event("name-click", {
        bubbles: true,
    })
], TimelineItem);
TimelineItem.define();
export default TimelineItem;
//# sourceMappingURL=TimelineItem.js.map