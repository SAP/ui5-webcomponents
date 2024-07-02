var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Token_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { isBackSpace, isSpace, isDelete, isSpaceCtrl, } from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/sys-cancel.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { TOKEN_ARIA_DELETABLE } from "./generated/i18n/i18n-defaults.js";
import Icon from "./Icon.js";
import TokenTemplate from "./generated/templates/TokenTemplate.lit.js";
// Styles
import tokenStyles from "./generated/themes/Token.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * Tokens are small items of information (similar to tags) that mainly serve to visualize previously selected items.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Token.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.9
 * @implements {IToken}
 * @public
 */
let Token = Token_1 = class Token extends UI5Element {
    _handleSelect() {
        if (!this.toBeDeleted) {
            this.selected = !this.selected;
            this.fireEvent("select");
        }
    }
    _focusin() {
        this.focused = true;
    }
    _focusout() {
        this.focused = !this.focused;
    }
    _delete() {
        this.toBeDeleted = true;
        this.fireEvent("delete");
    }
    _keydown(e) {
        const isBackSpacePressed = isBackSpace(e);
        const isDeletePressed = isDelete(e);
        if (!this.readonly && (isBackSpacePressed || isDeletePressed)) {
            e.preventDefault();
            this.fireEvent("delete", {
                backSpace: isBackSpacePressed,
                "delete": isDeletePressed,
            });
        }
        if (isSpace(e) || isSpaceCtrl(e)) {
            e.preventDefault();
            this._handleSelect();
        }
    }
    onBeforeRendering() {
        this.toBeDeleted = false;
    }
    get tokenDeletableText() {
        return Token_1.i18nBundle.getText(TOKEN_ARIA_DELETABLE);
    }
    get iconURI() {
        if (getTheme().includes("sap_belize")) {
            return "sys-cancel";
        }
        return "decline";
    }
    get textDom() {
        return this.getDomRef()?.querySelector(".ui5-token--text");
    }
    get isTruncatable() {
        if (!this.textDom) {
            return false;
        }
        return Math.ceil(this.textDom.getBoundingClientRect().width) < Math.ceil(this.textDom.scrollWidth);
    }
    static async onDefine() {
        Token_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property()
], Token.prototype, "text", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "overflows", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "singleToken", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "focused", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "toBeDeleted", void 0);
__decorate([
    property({ defaultValue: "-1", noAttribute: true })
], Token.prototype, "forcedTabIndex", void 0);
__decorate([
    slot()
], Token.prototype, "closeIcon", void 0);
Token = Token_1 = __decorate([
    customElement({
        tag: "ui5-token",
        languageAware: true,
        renderer: litRender,
        template: TokenTemplate,
        styles: tokenStyles,
        dependencies: [Icon],
    })
    /**
     * Fired when the the component is selected by user interaction with mouse or by clicking space.
     * @public
     */
    ,
    event("select")
    /**
     * Fired when the backspace, delete or close icon of the token is pressed
     * @param {Boolean} backSpace Indicates whether token is deleted by backspace key.
     * @param {Boolean} delete Indicates whether token is deleted by delete key.
     * @private
     */
    ,
    event("delete", {
        detail: {
            "backSpace": { type: Boolean },
            "delete": { type: Boolean },
        },
    })
], Token);
Token.define();
export default Token;
//# sourceMappingURL=Token.js.map