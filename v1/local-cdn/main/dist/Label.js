var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Label_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import WrappingType from "./types/WrappingType.js";
import { LABEL_COLON } from "./generated/i18n/i18n-defaults.js";
// Template
import LabelTemplate from "./generated/templates/LabelTemplate.lit.js";
// Styles
import labelCss from "./generated/themes/Label.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-label` is a component used to represent a label for elements like input, textarea, select.
 * The `for` property of the `ui5-label` must be the same as the id attribute of the related input element.
 * Screen readers read out the label, when the user focuses the labelled control.
 *
 * The `ui5-label` appearance can be influenced by properties,
 * such as `required` and `wrappingType`.
 * The appearance of the Label can be configured in a limited way by using the design property.
 * For a broader choice of designs, you can use custom styles.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Label";`
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
let Label = Label_1 = class Label extends UI5Element {
    static async onDefine() {
        Label_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    _onclick() {
        if (!this.for) {
            return;
        }
        const elementToFocus = this.getRootNode().querySelector(`[id="${this.for}"]`);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }
    get _colonSymbol() {
        return Label_1.i18nBundle.getText(LABEL_COLON);
    }
};
__decorate([
    property()
], Label.prototype, "for", void 0);
__decorate([
    property({ type: Boolean })
], Label.prototype, "showColon", void 0);
__decorate([
    property({ type: Boolean })
], Label.prototype, "required", void 0);
__decorate([
    property({ type: WrappingType, defaultValue: WrappingType.None })
], Label.prototype, "wrappingType", void 0);
Label = Label_1 = __decorate([
    customElement({
        tag: "ui5-label",
        renderer: litRender,
        template: LabelTemplate,
        styles: labelCss,
        languageAware: true,
    })
], Label);
Label.define();
export default Label;
//# sourceMappingURL=Label.js.map