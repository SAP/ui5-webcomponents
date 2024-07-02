var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CardHeader_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isFirefox } from "@ui5/webcomponents-base/dist/Device.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CardHeaderTemplate from "./generated/templates/CardHeaderTemplate.lit.js";
import { AVATAR_TOOLTIP, ARIA_ROLEDESCRIPTION_CARD_HEADER, ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER, } from "./generated/i18n/i18n-defaults.js";
// Styles
import cardHeaderCss from "./generated/themes/CardHeader.css.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-card-header` is a component, meant to be used as a header of the `ui5-card` component.
 * It displays valuable information, that can be defined with several properties, such as: `titleText`, `subtitleText`, `status`
 * and two slots: `avatar` and `action`.
 *
 * ### Keyboard handling
 * In case you enable `interactive` property, you can press the `ui5-card-header` by Space and Enter keys.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CardHeader";`
 * @constructor
 * @implements {ICardHeader}
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 * @csspart root - Used to style the root DOM element of the CardHeader
 * @csspart title - Used to style the title of the CardHeader
 * @csspart subtitle - Used to style the subtitle of the CardHeader
 * @csspart status - Used to style the status of the CardHeader
 */
let CardHeader = CardHeader_1 = class CardHeader extends UI5Element {
    get classes() {
        return {
            root: {
                "ui5-card-header": true,
                "ui5-card-header--interactive": this.interactive,
                "ui5-card-header--active": this.interactive && this._headerActive,
                "ui5-card-header-ff": isFirefox(),
            },
        };
    }
    get _root() {
        return this.shadowRoot.querySelector(".ui5-card-header");
    }
    get ariaRoleDescription() {
        return this.interactive ? CardHeader_1.i18nBundle.getText(ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER) : CardHeader_1.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD_HEADER);
    }
    get ariaRoleFocusableElement() {
        return this.interactive ? "button" : null;
    }
    get ariaCardAvatarLabel() {
        return CardHeader_1.i18nBundle.getText(AVATAR_TOOLTIP);
    }
    get ariaLabelledBy() {
        const labels = [];
        if (this.titleText) {
            labels.push(`${this._id}-title`);
        }
        if (this.subtitleText) {
            labels.push(`${this._id}-subtitle`);
        }
        if (this.status) {
            labels.push(`${this._id}-status`);
        }
        if (this.hasAvatar) {
            labels.push(`${this._id}-avatar`);
        }
        return labels.length !== 0 ? labels.join(" ") : undefined;
    }
    get hasAvatar() {
        return !!this.avatar.length;
    }
    get hasAction() {
        return !!this.action.length;
    }
    static async onDefine() {
        CardHeader_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    _actionsFocusin() {
        this._root.classList.add("ui5-card-header-hide-focus");
    }
    _actionsFocusout() {
        this._root.classList.remove("ui5-card-header-hide-focus");
    }
    _click(e) {
        // prevents the native browser "click" event from firing
        e.stopImmediatePropagation();
        if (this.interactive && this._root.contains(e.target)) {
            this.fireEvent("click");
        }
    }
    _keydown(e) {
        if (!this.interactive || !this._root.contains(e.target)) {
            return;
        }
        const enter = isEnter(e);
        const space = isSpace(e);
        this._headerActive = enter || space;
        if (enter) {
            this.fireEvent("click");
            return;
        }
        if (space) {
            e.preventDefault();
        }
    }
    _keyup(e) {
        if (!this.interactive || !this._root.contains(e.target)) {
            return;
        }
        const space = isSpace(e);
        this._headerActive = false;
        if (space) {
            this.fireEvent("click");
        }
    }
};
__decorate([
    property()
], CardHeader.prototype, "titleText", void 0);
__decorate([
    property()
], CardHeader.prototype, "subtitleText", void 0);
__decorate([
    property()
], CardHeader.prototype, "status", void 0);
__decorate([
    property({ type: Boolean })
], CardHeader.prototype, "interactive", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 3 })
], CardHeader.prototype, "_ariaLevel", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], CardHeader.prototype, "_headerActive", void 0);
__decorate([
    slot()
], CardHeader.prototype, "avatar", void 0);
__decorate([
    slot()
], CardHeader.prototype, "action", void 0);
CardHeader = CardHeader_1 = __decorate([
    customElement({
        tag: "ui5-card-header",
        languageAware: true,
        renderer: litRender,
        template: CardHeaderTemplate,
        styles: cardHeaderCss,
    })
    /**
     * Fired when the component is activated by mouse/tap or by using the Enter or Space key.
     *
     * **Note:** The event would be fired only if the `interactive` property is set to true.
     * @public
     */
    ,
    event("click")
], CardHeader);
CardHeader.define();
export default CardHeader;
//# sourceMappingURL=CardHeader.js.map