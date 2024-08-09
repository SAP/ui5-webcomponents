var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SegmentedButtonItem_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import SegmentedButtonItemTemplate from "./generated/templates/SegmentedButtonItemTemplate.lit.js";
import ToggleButton from "./ToggleButton.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonType from "./types/ButtonType.js";
import ButtonAccessibleRole from "./types/ButtonAccessibleRole.js";
import "./Button.js";
import Icon from "./Icon.js";
import { SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 *
 * Users can use the `ui5-segmented-button-item` as part of a `ui5-segmented-button`.
 *
 * Clicking or tapping on a `ui5-segmented-button-item` changes its state to `pressed`.
 * The item returns to its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any
 * `ui5-segmented-button-item`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButtonItem.js";`
 * @constructor
 * @extends ToggleButton
 * @implements { ISegmentedButtonItem }
 * @public
 */
let SegmentedButtonItem = SegmentedButtonItem_1 = class SegmentedButtonItem extends ToggleButton {
    get ariaDescription() {
        return SegmentedButtonItem_1.i18nBundle.getText(SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION);
    }
};
__decorate([
    property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
], SegmentedButtonItem.prototype, "design", void 0);
__decorate([
    property({ type: Boolean })
], SegmentedButtonItem.prototype, "iconEnd", void 0);
__decorate([
    property({ type: Boolean })
], SegmentedButtonItem.prototype, "submits", void 0);
__decorate([
    property({ type: Object })
], SegmentedButtonItem.prototype, "accessibilityAttributes", void 0);
__decorate([
    property({ type: ButtonType, defaultValue: ButtonType.Button })
], SegmentedButtonItem.prototype, "type", void 0);
__decorate([
    property({ type: ButtonAccessibleRole, defaultValue: ButtonAccessibleRole.Button })
], SegmentedButtonItem.prototype, "accessibleRole", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 0 })
], SegmentedButtonItem.prototype, "posInSet", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 0 })
], SegmentedButtonItem.prototype, "sizeOfSet", void 0);
SegmentedButtonItem = SegmentedButtonItem_1 = __decorate([
    customElement({
        tag: "ui5-segmented-button-item",
        template: SegmentedButtonItemTemplate,
        dependencies: [Icon],
    })
], SegmentedButtonItem);
SegmentedButtonItem.define();
export default SegmentedButtonItem;
//# sourceMappingURL=SegmentedButtonItem.js.map