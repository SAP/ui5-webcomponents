var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import { findClosestPosition } from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
// Template
import ListItemGroupTemplate from "./ListItemGroupTemplate.js";
// Styles
import ListItemGroupCss from "./generated/themes/ListItemGroup.css.js";
/**
 * @class
 * ### Overview
 * The `ui5-li-group` is a special list item, used only to create groups of list items.
 *
 * This is the item to use inside a `ui5-list`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ListItemGroup.js";`
 * @csspart header - Used to style the header item of the group
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
let ListItemGroup = class ListItemGroup extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Indicates whether the header is focused
         * @private
         */
        this.focused = false;
    }
    onEnterDOM() {
        DragRegistry.subscribe(this);
    }
    onExitDOM() {
        DragRegistry.unsubscribe(this);
    }
    get groupHeaderItem() {
        return this.shadowRoot.querySelector("[ui5-li-group-header]");
    }
    get hasHeader() {
        return !!this.headerText || this.hasFormattedHeader;
    }
    get hasFormattedHeader() {
        return !!this.header.length;
    }
    get isListItemGroup() {
        return true;
    }
    get dropIndicatorDOM() {
        return this.shadowRoot.querySelector("[ui5-drop-indicator]");
    }
    _ondragenter(e) {
        e.preventDefault();
    }
    _ondragleave(e) {
        if (e.relatedTarget instanceof Node && this.shadowRoot.contains(e.relatedTarget)) {
            return;
        }
        this.dropIndicatorDOM.targetReference = null;
    }
    _ondragover(e) {
        const draggedElement = DragRegistry.getDraggedElement();
        if (!(e.target instanceof HTMLElement) || !draggedElement) {
            return;
        }
        const closestPosition = findClosestPosition(this.items, e.clientY, Orientation.Vertical);
        if (!closestPosition) {
            this.dropIndicatorDOM.targetReference = null;
            return;
        }
        let placements = closestPosition.placements;
        if (closestPosition.element === draggedElement) {
            placements = placements.filter(placement => placement !== MovePlacement.On);
        }
        const placementAccepted = placements.some(placement => {
            const beforeItemMovePrevented = !this.fireDecoratorEvent("move-over", {
                source: {
                    element: draggedElement,
                },
                destination: {
                    element: closestPosition.element,
                    placement,
                },
            });
            if (beforeItemMovePrevented) {
                e.preventDefault();
                this.dropIndicatorDOM.targetReference = closestPosition.element;
                this.dropIndicatorDOM.placement = placement;
                return true;
            }
            return false;
        });
        if (!placementAccepted) {
            this.dropIndicatorDOM.targetReference = null;
        }
    }
    _ondrop(e) {
        e.preventDefault();
        this.fireDecoratorEvent("move", {
            source: {
                element: DragRegistry.getDraggedElement(),
            },
            destination: {
                element: this.dropIndicatorDOM.targetReference,
                placement: this.dropIndicatorDOM.placement,
            },
        });
        this.dropIndicatorDOM.targetReference = null;
    }
};
__decorate([
    property()
], ListItemGroup.prototype, "headerText", void 0);
__decorate([
    property()
], ListItemGroup.prototype, "headerAccessibleName", void 0);
__decorate([
    slot({
        "default": true,
        invalidateOnChildChange: true,
        type: HTMLElement,
    })
], ListItemGroup.prototype, "items", void 0);
__decorate([
    property({ type: Boolean })
], ListItemGroup.prototype, "focused", void 0);
__decorate([
    slot({ type: HTMLElement })
], ListItemGroup.prototype, "header", void 0);
ListItemGroup = __decorate([
    customElement({
        tag: "ui5-li-group",
        renderer: jsxRenderer,
        languageAware: true,
        template: ListItemGroupTemplate,
        styles: [ListItemGroupCss],
    })
    /**
     * Fired when a movable list item is moved over a potential drop target during a dragging operation.
     *
     * If the new position is valid, prevent the default action of the event using `preventDefault()`.
     * @param {object} source Contains information about the moved element under `element` property.
     * @param {object} destination Contains information about the destination of the moved element. Has `element` and `placement` properties.
     * @public
     * @since 2.1.0
     */
    ,
    event("move-over", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * Fired when a movable list item is dropped onto a drop target.
     *
     * **Note:** `move` event is fired only if there was a preceding `move-over` with prevented default action.
     * @param {object} source Contains information about the moved element under `element` property.
     * @param {object} destination Contains information about the destination of the moved element. Has `element` and `placement` properties.
     * @public
     * @since 2.1.0
     */
    ,
    event("move", {
        bubbles: true,
    })
], ListItemGroup);
ListItemGroup.define();
const isInstanceOfListItemGroup = (object) => {
    return "isListItemGroup" in object;
};
export default ListItemGroup;
export { isInstanceOfListItemGroup };
//# sourceMappingURL=ListItemGroup.js.map