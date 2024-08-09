var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BusyIndicator_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isTabNext } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import BusyIndicatorSize from "./types/BusyIndicatorSize.js";
import BusyIndicatorTextPlacement from "./types/BusyIndicatorTextPlacement.js";
import Label from "./Label.js";
// Template
import BusyIndicatorTemplate from "./generated/templates/BusyIndicatorTemplate.lit.js";
import { BUSY_INDICATOR_TITLE } from "./generated/i18n/i18n-defaults.js";
// Styles
import busyIndicatorCss from "./generated/themes/BusyIndicator.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-busy-indicator` signals that some operation is going on and that the
 * user must wait. It does not block the current UI screen so other operations could be triggered in parallel.
 * It displays 3 dots and each dot expands and shrinks at a different rate, resulting in a cascading flow of animation.
 *
 * ### Usage
 * For the `ui5-busy-indicator` you can define the size, the text and whether it is shown or hidden.
 * In order to hide it, use the "active" property.
 *
 * In order to show busy state over an HTML element, simply nest the HTML element in a `ui5-busy-indicator` instance.
 *
 * **Note:** Since `ui5-busy-indicator` has `display: inline-block;` by default and no width of its own,
 * whenever you need to wrap a block-level element, you should set `display: block` to the busy indicator as well.
 *
 * #### When to use:
 *
 * - The user needs to be able to cancel the operation.
 * - Only part of the application or a particular component is affected.
 *
 * #### When not to use:
 *
 * - The operation takes less than one second.
 * - You need to block the screen and prevent the user from starting another activity.
 * - Do not show multiple busy indicators at once.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/BusyIndicator.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Determines the content over which the component will appear.
 * @since 0.12.0
 */
let BusyIndicator = BusyIndicator_1 = class BusyIndicator extends UI5Element {
    constructor() {
        super();
        this._keydownHandler = this._handleKeydown.bind(this);
        this._preventEventHandler = this._preventEvent.bind(this);
    }
    onEnterDOM() {
        this.addEventListener("keydown", this._keydownHandler, {
            capture: true,
        });
        this.addEventListener("keyup", this._preventEventHandler, {
            capture: true,
        });
    }
    onExitDOM() {
        if (this._busyTimeoutId) {
            clearTimeout(this._busyTimeoutId);
            delete this._busyTimeoutId;
        }
        this.removeEventListener("keydown", this._keydownHandler, true);
        this.removeEventListener("keyup", this._preventEventHandler, true);
    }
    static async onDefine() {
        BusyIndicator_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    get ariaTitle() {
        return BusyIndicator_1.i18nBundle.getText(BUSY_INDICATOR_TITLE);
    }
    get labelId() {
        return this.text ? `${this._id}-label` : undefined;
    }
    get classes() {
        return {
            root: {
                "ui5-busy-indicator-root": true,
            },
        };
    }
    get textPosition() {
        return {
            top: this.text && this.textPlacement === BusyIndicatorTextPlacement.Top,
            bottom: this.text && this.textPlacement === BusyIndicatorTextPlacement.Bottom,
        };
    }
    onBeforeRendering() {
        if (this.active) {
            if (!this._isBusy && !this._busyTimeoutId) {
                this._busyTimeoutId = setTimeout(() => {
                    delete this._busyTimeoutId;
                    this._isBusy = true;
                }, Math.max(0, this.delay));
            }
        }
        else {
            if (this._busyTimeoutId) {
                clearTimeout(this._busyTimeoutId);
                delete this._busyTimeoutId;
            }
            this._isBusy = false;
        }
    }
    _handleKeydown(e) {
        if (!this._isBusy) {
            return;
        }
        e.stopImmediatePropagation();
        // move the focus to the last element in this DOM and let TAB continue to the next focusable element
        if (isTabNext(e)) {
            this.focusForward = true;
            this.shadowRoot.querySelector("[data-ui5-focus-redirect]").focus();
            this.focusForward = false;
        }
    }
    _preventEvent(e) {
        if (this._isBusy) {
            e.stopImmediatePropagation();
        }
    }
    /**
     * Moves the focus to busy area when coming with SHIFT + TAB
     */
    _redirectFocus(e) {
        if (this.focusForward) {
            return;
        }
        e.preventDefault();
        this.shadowRoot.querySelector(".ui5-busy-indicator-busy-area").focus();
    }
};
__decorate([
    property()
], BusyIndicator.prototype, "text", void 0);
__decorate([
    property({ type: BusyIndicatorSize, defaultValue: BusyIndicatorSize.Medium })
], BusyIndicator.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], BusyIndicator.prototype, "active", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 1000 })
], BusyIndicator.prototype, "delay", void 0);
__decorate([
    property({ type: BusyIndicatorTextPlacement, defaultValue: BusyIndicatorTextPlacement.Bottom })
], BusyIndicator.prototype, "textPlacement", void 0);
__decorate([
    property({ type: Boolean })
], BusyIndicator.prototype, "_isBusy", void 0);
BusyIndicator = BusyIndicator_1 = __decorate([
    customElement({
        tag: "ui5-busy-indicator",
        languageAware: true,
        styles: busyIndicatorCss,
        renderer: litRender,
        template: BusyIndicatorTemplate,
        dependencies: [Label],
    })
], BusyIndicator);
BusyIndicator.define();
export default BusyIndicator;
//# sourceMappingURL=BusyIndicator.js.map