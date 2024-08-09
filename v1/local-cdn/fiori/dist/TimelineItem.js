var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import TimelineItemTemplate from "./generated/templates/TimelineItemTemplate.lit.js";
import TimelineLayout from "./types/TimelineLayout.js";
// Styles
import TimelineItemCss from "./generated/themes/TimelineItem.css.js";
const SHORT_LINE_WIDTH = "ShortLineWidth";
const LARGE_LINE_WIDTH = "LargeLineWidth";
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
 * @slot {Node[]} default - Determines the description of the `ui5-timeline-item`.
 */
let TimelineItem = class TimelineItem extends UI5Element {
    constructor() {
        super();
    }
    onNamePress() {
        this.fireEvent("name-click", {});
    }
    /**
     * Focus the internal link.
     */
    focusLink() {
        this.shadowRoot.querySelector("[ui5-link]")?.focus();
    }
    get classes() {
        return {
            indicator: {
                "ui5-tli-indicator": true,
                "ui5-tli-indicator-short-line": this.forcedLineWidth === SHORT_LINE_WIDTH,
                "ui5-tli-indicator-large-line": this.forcedLineWidth === LARGE_LINE_WIDTH,
            },
            bubbleArrowPosition: {
                "ui5-tli-bubble-arrow": true,
                "ui5-tli-bubble-arrow--left": this.layout === TimelineLayout.Vertical,
                "ui5-tli-bubble-arrow--top": this.layout === TimelineLayout.Horizontal,
            },
        };
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
    property({ defaultValue: "-1", noAttribute: true })
], TimelineItem.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: TimelineLayout, defaultValue: TimelineLayout.Vertical })
], TimelineItem.prototype, "layout", void 0);
__decorate([
    property()
], TimelineItem.prototype, "forcedLineWidth", void 0);
TimelineItem = __decorate([
    customElement({
        tag: "ui5-timeline-item",
        renderer: litRender,
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
    event("name-click")
], TimelineItem);
TimelineItem.define();
export default TimelineItem;
//# sourceMappingURL=TimelineItem.js.map