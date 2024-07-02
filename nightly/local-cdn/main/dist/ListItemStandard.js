var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ListItem from "./ListItem.js";
import Icon from "./Icon.js";
import Avatar from "./Avatar.js";
import ListItemStandardTemplate from "./generated/templates/ListItemStandardTemplate.lit.js";
/**
 * @class
 * The `ui5-li` represents the simplest type of item for a `ui5-list`.
 *
 * This is a list item,
 * providing the most common use cases such as `text`,
 * `image` and `icon`.

 * @csspart title - Used to style the title of the list item
 * @csspart description - Used to style the description of the list item
 * @csspart additional-text - Used to style the additionalText of the list item
 * @csspart icon - Used to style the icon of the list item
 * @csspart native-li - Used to style the main li tag of the list item
 * @csspart content - Used to style the content area of the list item
 * @csspart detail-button - Used to style the button rendered when the list item is of type detail
 * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
 * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
 * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @constructor
 * @extends ListItem
 * @public
 */
let ListItemStandard = class ListItemStandard extends ListItem {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the `icon` should be displayed in the beginning of the list item or in the end.
         *
         * **Note:** If `image` is set, the `icon` would be displayed after the `image`.
         * @default false
         * @public
         */
        this.iconEnd = false;
        /**
         * Defines the state of the `additionalText`.
         *
         * Available options are: `"None"` (by default), `"Positive"`, `"Critical"`, `"Information"` and `"Negative"`.
         * @default "None"
         * @public
         * @since 1.0.0-rc.15
         */
        this.additionalTextState = "None";
        /**
         * Defines whether the item is movable.
         * @default false
         * @public
         * @since 2.0.0
         */
        this.movable = false;
        /**
         * Defines if the text of the component should wrap, they truncate by default.
         *
         * **Note:** this property takes affect only if text node is provided to default slot of the component
         * @default "None"
         * @private
         * @since 1.5.0
         */
        this.wrappingType = "None";
        /**
         * Indicates if the list item has text content.
         * @private
         */
        this.hasTitle = false;
        this._hasImageContent = false;
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        this.hasTitle = !!this.textContent;
        this._hasImageContent = this.hasImageContent;
    }
    get displayImage() {
        return !!this.image;
    }
    get displayIconBegin() {
        return !!(this.icon && !this.iconEnd);
    }
    get displayIconEnd() {
        return !!(this.icon && this.iconEnd);
    }
    get hasImageContent() {
        return !!this.imageContent.length;
    }
};
__decorate([
    property()
], ListItemStandard.prototype, "description", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], ListItemStandard.prototype, "iconEnd", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "image", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "additionalText", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "additionalTextState", void 0);
__decorate([
    property({ type: Boolean })
], ListItemStandard.prototype, "movable", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "accessibleName", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "wrappingType", void 0);
__decorate([
    property({ type: Boolean })
], ListItemStandard.prototype, "hasTitle", void 0);
__decorate([
    property({ type: Boolean })
], ListItemStandard.prototype, "_hasImageContent", void 0);
__decorate([
    slot()
], ListItemStandard.prototype, "imageContent", void 0);
ListItemStandard = __decorate([
    customElement({
        tag: "ui5-li",
        template: ListItemStandardTemplate,
        dependencies: [
            ...ListItem.dependencies,
            Icon,
            Avatar,
        ],
    })
], ListItemStandard);
ListItemStandard.define();
export default ListItemStandard;
//# sourceMappingURL=ListItemStandard.js.map