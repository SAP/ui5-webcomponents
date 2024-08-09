var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Badge_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/sys-help-2.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/information.js";
import WrappingType from "./types/WrappingType.js";
import BadgeDesign from "./types/BadgeDesign.js";
// Template
import BadgeTemplate from "./generated/templates/BadgeTemplate.lit.js";
import { BADGE_DESCRIPTION_BADGE, BADGE_DESCRIPTION_TAG, BADGE_ROLE_DESCRIPTION, BADGE_ERROR, BADGE_WARNING, BADGE_SUCCESS, BADGE_INFORMATION, } from "./generated/i18n/i18n-defaults.js";
// Styles
import badgeCss from "./generated/themes/Badge.css.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-badge` is a component which serves
 * the purpose to attract the user attention to some piece
 * of information (state, quantity, condition, etc.).
 * It can contain icon and text information, and its design can be chosen from specific design types.
 *
 * ### Usage Guidelines
 *
 * - If the text is longer than the width of the component, it can wrap, or it can show ellipsis, depending on the `wrappingType` property.
  * - Colors can be semantic or not semantic.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Badge.js";`
 * @constructor
 * @extends UI5Element
 * @since 0.12.0
 * @public
 */
let Badge = Badge_1 = class Badge extends UI5Element {
    static async onDefine() {
        Badge_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    onBeforeRendering() {
        this._hasIcon = this.hasIcon || !!this._semanticIconName;
        this._iconOnly = this.iconOnly;
        this._isTagDesign = this.design !== BadgeDesign.Set3;
    }
    get _roleDescription() {
        return Badge_1.i18nBundle.getText(BADGE_ROLE_DESCRIPTION);
    }
    get _valueState() {
        switch (this.design) {
            case BadgeDesign.Positive:
                return Badge_1.i18nBundle.getText(BADGE_SUCCESS);
            case BadgeDesign.Negative:
                return Badge_1.i18nBundle.getText(BADGE_ERROR);
            case BadgeDesign.Critical:
                return Badge_1.i18nBundle.getText(BADGE_WARNING);
            case BadgeDesign.Information:
                return Badge_1.i18nBundle.getText(BADGE_INFORMATION);
        }
        return undefined;
    }
    get hasText() {
        return willShowContent(this.text);
    }
    get hasIcon() {
        return !!this.icon.length;
    }
    get iconOnly() {
        return this.hasIcon && !this.hasText;
    }
    get _title() {
        return this.title || undefined;
    }
    get badgeDescription() {
        if (this.interactive) {
            return undefined;
        }
        if (this.design === BadgeDesign.Set3) {
            return Badge_1.i18nBundle.getText(BADGE_DESCRIPTION_BADGE);
        }
        const valueState = this._valueState;
        let description = Badge_1.i18nBundle.getText(BADGE_DESCRIPTION_TAG);
        if (valueState) {
            description = `${description} ${valueState}`;
        }
        return description;
    }
    get _semanticIconName() {
        if (this.hideStateIcon || this.hasIcon) {
            return null;
        }
        switch (this.design) {
            case BadgeDesign.Neutral:
                return "sys-help-2";
            case BadgeDesign.Positive:
                return "sys-enter-2";
            case BadgeDesign.Negative:
                return "error";
            case BadgeDesign.Critical:
                return "alert";
            case BadgeDesign.Information:
                return "information";
            default:
                return null;
        }
    }
    _onclick() {
        this.fireEvent("click");
    }
};
__decorate([
    property({ defaultValue: BadgeDesign.Set3 })
], Badge.prototype, "design", void 0);
__decorate([
    property({ defaultValue: "1" })
], Badge.prototype, "colorScheme", void 0);
__decorate([
    property({ type: Boolean })
], Badge.prototype, "hideStateIcon", void 0);
__decorate([
    property({ type: Boolean })
], Badge.prototype, "interactive", void 0);
__decorate([
    property({ type: WrappingType, defaultValue: WrappingType.None })
], Badge.prototype, "wrappingType", void 0);
__decorate([
    property({ type: Boolean })
], Badge.prototype, "_hasIcon", void 0);
__decorate([
    property({ type: Boolean })
], Badge.prototype, "_iconOnly", void 0);
__decorate([
    property({ type: Boolean })
], Badge.prototype, "_isTagDesign", void 0);
__decorate([
    slot({ type: Node, "default": true })
], Badge.prototype, "text", void 0);
__decorate([
    slot()
], Badge.prototype, "icon", void 0);
Badge = Badge_1 = __decorate([
    customElement({
        tag: "ui5-badge",
        languageAware: true,
        renderer: litRender,
        template: BadgeTemplate,
        styles: badgeCss,
        dependencies: [
            Icon,
        ],
    })
    /**
     * Fired when the user clicks on an interactive badge.
     *
     * **Note:** The event will be fired if the `interactive` property is `true`
     * @public
     * @since 1.22.0
     */
    ,
    event("click")
], Badge);
Badge.define();
export default Badge;
//# sourceMappingURL=Badge.js.map