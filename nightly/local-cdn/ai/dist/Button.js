var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import MainButton from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import ButtonState from "./ButtonState.js";
import ButtonTemplate from "./generated/templates/ButtonTemplate.lit.js";
// Styles
import ButtonCss from "./generated/themes/Button.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-button` component represents a button used in AI-related scenarios.
 * It enables users to trigger actions by clicking or tapping the `ui5-ai-button`, or by pressing
 * certain keyboard keys, such as Enter.
 *
 * ### Usage
 *
 * For the `ui5-ai-button` UI, you can define one or more states of the button by placing `ai-button-state` components in its default slot.
 * Each state have a name that identifies it and can have text, icon and end icon defined (in any combination) depending on the state purpose.
 *
 * You can choose from a set of predefined designs (the same as for regular `ui5-button` component) that allow different styling to correspond to the triggered action.
 *
 * `ui5-ai-button` can be activated by clicking or tapping it. The state can be changed in `click` event handler.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/Button.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0
 * @public
 * @experimental The Button and ButtonState web components are availabe since 2.0 under an experimental flag and their API and behaviour are subject to change.
 */
let Button = class Button extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the component design.
         * @default "Default"
         * @public
         */
        this.design = "Default";
        /**
         * Defines whether the component is disabled.
         * A disabled component can't be pressed or
         * focused, and it is not in the tab chain.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Initiates button elements fade-out phase.
         * @default false
         * @private
         */
        this.fadeOut = false;
        /**
         * Initiates button fade middle phase.
         * @default false
         * @private
         */
        this.fadeMid = false;
        /**
         * Initiates button elements fade-in phase.
         * @default false
         * @private
         */
        this.fadeIn = false;
    }
    onBeforeRendering() {
        if (this.fadeOut || this.fadeIn) {
            return;
        }
        if (!this._currentStateObject?.name) {
            this._currentStateObject = this._effectiveStateObject;
        }
        const currentStateName = this._currentStateObject?.name || "";
        if (currentStateName !== "" && currentStateName !== this._effectiveState) {
            this._fadeOut();
        }
    }
    /**
     * Starts the fade-out animation.
     * @private
     */
    async _fadeOut() {
        const fadeOutDuration = 180;
        const button = this.shadowRoot?.querySelector("[ui5-button]");
        const newStateObject = this._effectiveStateObject;
        if (!newStateObject) {
            // eslint-disable-next-line no-console
            console.warn(`State with name="${this.state}" doesn't exist!`);
        }
        else if (button) {
            const buttonWidth = button.offsetWidth;
            const hiddenButton = this.shadowRoot?.querySelector(".ui5-ai-button-hidden");
            button.style.width = `${buttonWidth}px`;
            hiddenButton.icon = newStateObject.icon;
            hiddenButton.endIcon = newStateObject.endIcon;
            hiddenButton.textContent = newStateObject.text || null;
            await renderFinished();
            const hiddenButtonWidth = hiddenButton.offsetWidth;
            this.fadeOut = true;
            button.style.width = `${hiddenButtonWidth}px`;
            setTimeout(() => {
                this.fadeMid = true;
                this._currentStateObject = newStateObject;
                this._fadeIn();
            }, fadeOutDuration);
        }
    }
    /**
     * Starts the fade-in animation.
     * @private
     */
    _fadeIn() {
        const fadeInDuration = 60;
        setTimeout(() => {
            this.fadeIn = true;
            this._resetFade();
        }, fadeInDuration);
    }
    /**
     * Resets the fade phases when the animation is completed.
     * @private
     */
    _resetFade() {
        const fadeResetDuration = 160;
        setTimeout(() => {
            this.fadeOut = false;
            this.fadeMid = false;
            this.fadeIn = false;
        }, fadeResetDuration);
    }
    /**
     * Handles the click event.
     * @private
     */
    _onclick(e) {
        e.stopImmediatePropagation();
        this.fireEvent("click");
    }
    get _effectiveState() {
        return this.state || (this.states.length && this.states[0].name) || "";
    }
    get _effectiveStateObject() {
        return this.states.find(state => state.name === this._effectiveState);
    }
    get _stateIconOnly() {
        return !this._stateText && !!this._stateIcon;
    }
    get _stateText() {
        return this._currentStateObject?.text;
    }
    get _stateIcon() {
        return this._currentStateObject?.icon;
    }
    get _stateEndIcon() {
        return this._currentStateObject?.endIcon;
    }
    get _hasText() {
        return !!this._stateText;
    }
};
__decorate([
    property()
], Button.prototype, "design", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "disabled", void 0);
__decorate([
    property()
], Button.prototype, "state", void 0);
__decorate([
    property({ type: Object })
], Button.prototype, "_currentStateObject", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "fadeOut", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "fadeMid", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "fadeIn", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Button.prototype, "states", void 0);
Button = __decorate([
    customElement({
        tag: "ui5-ai-button",
        languageAware: true,
        renderer: litRender,
        template: ButtonTemplate,
        styles: ButtonCss,
        dependencies: [MainButton, Icon, ButtonState],
        shadowRootOptions: { delegatesFocus: true },
    })
    /**
     * Fired when the component is activated either with a
     * mouse/tap or by using the Enter or Space key.
     * @public
     */
    ,
    event("click")
], Button);
Button.define();
export default Button;
//# sourceMappingURL=Button.js.map