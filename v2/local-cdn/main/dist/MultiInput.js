var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MultiInput_1;
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isShow, isBackSpace, isLeft, isRight, isRightCtrl, isHome, isEnd, } from "@ui5/webcomponents-base/dist/Keys.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { MULTIINPUT_ROLEDESCRIPTION_TEXT } from "./generated/i18n/i18n-defaults.js";
import Input from "./Input.js";
import MultiInputTemplate from "./generated/templates/MultiInputTemplate.lit.js";
import styles from "./generated/themes/MultiInput.css.js";
import Token from "./Token.js";
import Tokenizer, { ClipboardDataOperation } from "./Tokenizer.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/value-help.js";
/**
 * @class
 * ### Overview
 * A `ui5-multi-input` field allows the user to enter multiple values, which are displayed as `ui5-token`.
 *
 * User can choose interaction for creating tokens.
 * Fiori Guidelines say that user should create tokens when:
 *
 * - Type a value in the input and press enter or focus out the input field (`change` event is fired)
 * - Select a value from the suggestion list (`suggestion-item-select` event is fired)
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MultiInput.js";`
 * @constructor
 * @extends Input
 * @since 1.0.0-rc.9
 * @public
 */
let MultiInput = MultiInput_1 = class MultiInput extends Input {
    constructor() {
        super();
        // Prevent suggestions' opening.
        this._skipOpenSuggestions = false;
        this._valueHelpIconPressed = false;
    }
    valueHelpPress() {
        this.closePopover();
        this.fireEvent("value-help-trigger");
    }
    showMorePress() {
        this.expandedTokenizer = false;
        this.focus();
    }
    tokenDelete(e) {
        const focusedToken = e.detail.ref;
        const selectedTokens = this.tokens.filter(token => token.selected);
        const shouldFocusInput = this.tokens.length - 1 === 0 || this.tokens.length === selectedTokens.length;
        if (this._readonly) {
            return;
        }
        if (focusedToken) {
            this.fireEvent("token-delete", { token: focusedToken });
            if (shouldFocusInput) {
                this.focus();
            }
            return;
        }
        if (selectedTokens.indexOf(focusedToken) === -1) {
            selectedTokens.push(focusedToken);
        }
        selectedTokens.forEach(token => {
            this.fireEvent("token-delete", { token });
        });
    }
    valueHelpMouseDown(e) {
        const target = e.target;
        this.closePopover();
        this.tokenizer.closeMorePopover();
        this._valueHelpIconPressed = true;
        target.focus();
    }
    _tokenizerFocusOut(e) {
        const isFocusingMorePopover = e.relatedTarget === this.tokenizer.staticAreaItem;
        if (!this.contains(e.relatedTarget) && !isFocusingMorePopover) {
            this.tokenizer._tokens.forEach(token => { token.selected = false; });
            this.tokenizer.scrollToStart();
        }
        if (e.relatedTarget === this.nativeInput) {
            this.tokenizer.closeMorePopover();
        }
    }
    valueHelpMouseUp() {
        setTimeout(() => {
            this._valueHelpIconPressed = false;
        }, 0);
    }
    innerFocusIn() {
        this.expandedTokenizer = true;
        this.focused = true;
        this.tokenizer.scrollToEnd();
        this.tokenizer._getTokens().forEach(token => {
            token.selected = false;
        });
    }
    _onkeydown(e) {
        super._onkeydown(e);
        const target = e.target;
        const isHomeInBeginning = isHome(e) && target.selectionStart === 0;
        const isCtrl = e.metaKey || e.ctrlKey;
        const tokens = this.tokens;
        if (isHomeInBeginning) {
            this._skipOpenSuggestions = true; // Prevent input focus when navigating through the tokens
            return this._focusFirstToken(e);
        }
        if (isLeft(e) || isBackSpace(e)) {
            this._skipOpenSuggestions = true;
            return this._handleLeft(e);
        }
        this._skipOpenSuggestions = false;
        if (isShow(e)) {
            this.valueHelpPress();
        }
        if (isCtrl && e.key.toLowerCase() === "i" && tokens.length > 0) {
            e.preventDefault();
            this.tokenizer.openMorePopover();
        }
    }
    _onTokenizerKeydown(e) {
        const rightCtrl = isRightCtrl(e);
        const isCtrl = !!(e.metaKey || e.ctrlKey);
        const tokens = this.tokens;
        if (isRight(e) || isEnd(e) || rightCtrl) {
            e.preventDefault();
            const lastTokenIndex = this.tokens.length - 1;
            if (e.target === this.tokens[lastTokenIndex] && this.tokens[lastTokenIndex] === document.activeElement) {
                setTimeout(() => {
                    this.focus();
                }, 0);
            }
            else if (rightCtrl) {
                e.preventDefault();
                return this.tokenizer._handleArrowCtrl(e, e.target, this.tokens, true);
            }
        }
        if (isCtrl && ["c", "x"].includes(e.key.toLowerCase())) {
            e.preventDefault();
            const isCut = e.key.toLowerCase() === "x";
            const selectedTokens = tokens.filter(token => token.selected);
            if (isCut) {
                const cutResult = this.tokenizer._fillClipboard(ClipboardDataOperation.cut, selectedTokens);
                selectedTokens.forEach(token => {
                    this.fireEvent("token-delete", { token });
                });
                this.focus();
                return cutResult;
            }
            return this.tokenizer._fillClipboard(ClipboardDataOperation.copy, selectedTokens);
        }
        if (isCtrl && e.key.toLowerCase() === "i" && tokens.length > 0) {
            e.preventDefault();
            this.tokenizer.openMorePopover();
        }
    }
    _handleLeft(e) {
        const cursorPosition = this.getDomRef().querySelector(`input`).selectionStart;
        const tokens = this.tokens;
        const lastToken = tokens.length && tokens[tokens.length - 1];
        if (cursorPosition === 0 && lastToken) {
            e.preventDefault();
            lastToken.focus();
            this.tokenizer._itemNav.setCurrentItem(lastToken);
        }
    }
    _focusFirstToken(e) {
        const tokens = this.tokens;
        const firstToken = tokens.length && tokens[0];
        if (firstToken) {
            e.preventDefault();
            firstToken.focus();
            this.tokenizer._itemNav.setCurrentItem(firstToken);
        }
    }
    _onfocusout(e) {
        super._onfocusout(e);
        const relatedTarget = e.relatedTarget;
        const insideDOM = this.contains(relatedTarget);
        const insideShadowDom = this.shadowRoot.contains(relatedTarget);
        if (!insideDOM && !insideShadowDom) {
            this.expandedTokenizer = false;
            // we need to reset tabindex setting by tokenizer
            this.tokenizer._itemNav._currentIndex = -1;
        }
    }
    /**
     * @override
     */
    async _onfocusin(e) {
        const inputDomRef = await this.getInputDOMRef();
        if (e.target === inputDomRef) {
            await super._onfocusin(e);
        }
    }
    lastItemDeleted() {
        setTimeout(() => {
            this.focus();
        }, 0);
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        this.style.setProperty(getScopedVarName("--_ui5-input-icons-count"), `${this.iconsCount}`);
        this.tokenizerAvailable = this.tokens && this.tokens.length > 0;
    }
    get iconsCount() {
        return super.iconsCount + (this.showValueHelpIcon ? 1 : 0);
    }
    get tokenizer() {
        return this.shadowRoot.querySelector("[ui5-tokenizer]");
    }
    get _tokensCountText() {
        if (!this.tokenizer) {
            return;
        }
        return this.tokenizer._tokensCountText();
    }
    get _tokensCountTextId() {
        return `${this._id}-hiddenText-nMore`;
    }
    /**
     * Returns the placeholder value when there are no tokens.
     * @protected
     */
    get _placeholder() {
        if (this.tokenizer && this.tokenizer._tokens.length) {
            return "";
        }
        return this.placeholder;
    }
    get accInfo() {
        const ariaDescribedBy = `${this._tokensCountTextId} ${this.suggestionsTextId} ${this.valueStateTextId}`.trim();
        return {
            "input": {
                ...super.accInfo.input,
                "ariaRoledescription": this.ariaRoleDescription,
                "ariaDescribedBy": ariaDescribedBy,
            },
        };
    }
    get ariaRoleDescription() {
        return MultiInput_1.i18nBundle.getText(MULTIINPUT_ROLEDESCRIPTION_TEXT);
    }
    get morePopoverOpener() {
        if (this.tokens.length === 1 && this.tokens[0].isTruncatable) {
            return this.tokens[0];
        }
        return this;
    }
};
__decorate([
    property({ type: Boolean })
], MultiInput.prototype, "showValueHelpIcon", void 0);
__decorate([
    property({ type: Boolean })
], MultiInput.prototype, "expandedTokenizer", void 0);
__decorate([
    property({ type: Boolean })
], MultiInput.prototype, "tokenizerAvailable", void 0);
__decorate([
    slot()
], MultiInput.prototype, "tokens", void 0);
MultiInput = MultiInput_1 = __decorate([
    customElement({
        tag: "ui5-multi-input",
        renderer: litRender,
        template: MultiInputTemplate,
        styles: [Input.styles, styles],
        dependencies: [
            ...Input.dependencies,
            Tokenizer,
            Token,
            Icon,
        ],
    })
    /**
     * Fired when the value help icon is pressed
     * and F4 or ALT/OPTION + ARROW_UP/ARROW_DOWN keyboard keys are used.
     * @public
     */
    ,
    event("value-help-trigger")
    /**
     * Fired when a token is about to be deleted.
     * @param {HTMLElement} token deleted token.
     * @public
     */
    ,
    event("token-delete", {
        detail: {
            /**
             * @public
             */
            token: { type: HTMLElement },
        },
    })
], MultiInput);
MultiInput.define();
export default MultiInput;
//# sourceMappingURL=MultiInput.js.map