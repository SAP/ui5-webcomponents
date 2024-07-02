var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DynamicPageHeaderActions_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-up.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/pushpin-off.js";
import "@ui5/webcomponents-icons/dist/pushpin-on.js";
// Template
import DynamicPageHeaderActionsTemplate from "./generated/templates/DynamicPageHeaderActionsTemplate.lit.js";
// Styles
import DynamicPageHeaderActionsCss from "./generated/themes/DynamicPageHeaderActions.css.js";
// Texts
import { DYNAMIC_PAGE_ARIA_LABEL_EXPAND_HEADER, DYNAMIC_PAGE_ARIA_LABEL_SNAP_HEADER, DYNAMIC_PAGE_ARIA_LABEL_PIN_HEADER, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `DynamicPageHeaderActions` component is part of the `DynamicPage`
 * family and is holding the action buttons behind the `DynamicPageTitle` and the `DynamicPageHeader`.
 *
 * The "pin" action is used to attach the header to a certain state (expanded/collapsed).
 * The expand/collapse action is used to switch between the two states of `DynamicPageHeader`.
 *
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
let DynamicPageHeaderActions = DynamicPageHeaderActions_1 = class DynamicPageHeaderActions extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the header is pinned.
         *
         * @protected
         * @default false
         */
        this.pinned = false;
        /**
         * Defines whether the pin button is hidden.
         *
         * @protected
         * @default false
         */
        this.hidePinButton = false;
        /**
         * Defines whether the header is snapped.
         *
         * @protected
         * @default false
         */
        this.snapped = false;
        /**
         * Contains attributes to be added to HTML to gain accessibility.
         *
         * @protected
         * @default {}
         */
        this.accessibilityAttributes = {};
    }
    static async onDefine() {
        DynamicPageHeaderActions_1.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
    }
    get arrowButtonIcon() {
        return this.snapped ? "slim-arrow-down" : "slim-arrow-up";
    }
    get pinButtonIcon() {
        if (isLegacyThemeFamily()) {
            return "pushpin-off";
        }
        return this.pinned ? "pushpin-on" : "pushpin-off";
    }
    get expandButton() {
        return this.shadowRoot.querySelector(".ui5-dynamic-page-header-action-expand");
    }
    get pinButton() {
        return this.shadowRoot.querySelector(".ui5-dynamic-page-header-action-pin");
    }
    get pinLabel() {
        return DynamicPageHeaderActions_1.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_PIN_HEADER);
    }
    get expandLabel() {
        return this.snapped
            ? DynamicPageHeaderActions_1.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_EXPAND_HEADER)
            : DynamicPageHeaderActions_1.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_SNAP_HEADER);
    }
    focusExpandButton() {
        this.expandButton?.focus();
    }
    focusPinButton() {
        this.pinButton?.focus();
    }
    onExpandClick() {
        this.fireEvent("expand-button-click");
    }
    onPinClick() {
        this.fireEvent("pin-button-click");
    }
    onExpandHoverIn() {
        this.fireEvent("expand-button-hover-in");
    }
    onExpandHoverOut() {
        this.fireEvent("expand-button-hover-out");
    }
    get showPinButton() {
        return !this.hidePinButton && !this.snapped;
    }
};
__decorate([
    property({ type: Boolean })
], DynamicPageHeaderActions.prototype, "pinned", void 0);
__decorate([
    property({ type: Boolean })
], DynamicPageHeaderActions.prototype, "hidePinButton", void 0);
__decorate([
    property({ type: Boolean })
], DynamicPageHeaderActions.prototype, "snapped", void 0);
__decorate([
    property({ type: Object })
], DynamicPageHeaderActions.prototype, "accessibilityAttributes", void 0);
DynamicPageHeaderActions = DynamicPageHeaderActions_1 = __decorate([
    customElement({
        tag: "ui5-dynamic-page-header-actions",
        renderer: litRender,
        styles: DynamicPageHeaderActionsCss,
        template: DynamicPageHeaderActionsTemplate,
        dependencies: [Button, ToggleButton],
    })
    /**
     * Event that is being fired by clicking on the expand button.
     *
     * @protected
     */
    ,
    event("expand-button-click")
    /**
     * Event that is being fired by clicking on the pin button.
     *
     * @protected
     */
    ,
    event("pin-button-click")
    /**
     * Event that is being fired by hovering over the expand button.
     *
     * @protected
     */
    ,
    event("expand-button-hover")
], DynamicPageHeaderActions);
DynamicPageHeaderActions.define();
export default DynamicPageHeaderActions;
//# sourceMappingURL=DynamicPageHeaderActions.js.map