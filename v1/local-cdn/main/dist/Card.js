var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Card_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import CardTemplate from "./generated/templates/CardTemplate.lit.js";
import Icon from "./Icon.js";
import { ARIA_ROLEDESCRIPTION_CARD, ARIA_LABEL_CARD_CONTENT, } from "./generated/i18n/i18n-defaults.js";
// Styles
import cardCss from "./generated/themes/Card.css.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-card` is a component that represents information in the form of a
 * tile with separate header and content areas.
 * The content area of a `ui5-card` can be arbitrary HTML content.
 * The header can be used through slot `header`. For which there is a `ui5-card-header` component to achieve the card look and feel.
 *
 * Note: We recommend the usage of `ui5-card-header` for the header slot, so advantage can be taken for keyboard handling, styling and accessibility.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Card";`
 *
 * `import "@ui5/webcomponents/dist/CardHeader.js";` (for `ui5-card-header`)
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart root - Used to style the root DOM element of the card component
 * @csspart content - Used to style the content of the card
 */
let Card = Card_1 = class Card extends UI5Element {
    get classes() {
        return {
            root: {
                "ui5-card-root": true,
                "ui5-card--interactive": this._hasHeader && this.header[0].interactive,
                "ui5-card--nocontent": !this.content.length,
            },
        };
    }
    get _hasHeader() {
        return !!this.header.length;
    }
    get _getAriaLabel() {
        const effectiveAriaLabelText = getEffectiveAriaLabelText(this), effectiveAriaLabel = effectiveAriaLabelText ? ` ${effectiveAriaLabelText}` : "";
        return Card_1.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD) + effectiveAriaLabel;
    }
    get _ariaCardContentLabel() {
        return Card_1.i18nBundle.getText(ARIA_LABEL_CARD_CONTENT);
    }
    static async onDefine() {
        Card_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property()
], Card.prototype, "accessibleName", void 0);
__decorate([
    property()
], Card.prototype, "accessibleNameRef", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Card.prototype, "content", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true })
], Card.prototype, "header", void 0);
Card = Card_1 = __decorate([
    customElement({
        tag: "ui5-card",
        languageAware: true,
        renderer: litRender,
        template: CardTemplate,
        styles: cardCss,
        dependencies: [Icon],
    })
], Card);
Card.define();
export default Card;
//# sourceMappingURL=Card.js.map