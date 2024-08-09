var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Link_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { markEvent } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import LinkDesign from "./types/LinkDesign.js";
import WrappingType from "./types/WrappingType.js";
import "./types/HasPopup.js";
// Template
import LinkTemplate from "./generated/templates/LinkTemplate.lit.js";
import { LINK_SUBTLE, LINK_EMPHASIZED } from "./generated/i18n/i18n-defaults.js";
// Styles
import linkCss from "./generated/themes/Link.css.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-link` is a hyperlink component that is used to navigate to other
 * apps and web pages, or to trigger actions.
 * It is a clickable text element, visualized in such a way that it stands out
 * from the standard text.
 * On hover, it changes its style to an underlined text to provide additional feedback to the user.
 *
 * ### Usage
 *
 * You can set the `ui5-link` to be enabled or disabled.
 *
 * To create a visual hierarchy in large lists of links, you can set the less important links as
 * `Subtle` or the more important ones as `Emphasized`,
 * by using the `design` property.
 *
 * If the `href` property is set, the link behaves as the HTML
 * anchor tag (`<a></a>`) and opens the specified URL in the given target frame (`target` property).
 * To specify where the linked content is opened, you can use the `target` property.
 *
 * ### Responsive behavior
 *
 * If there is not enough space, the text of the `ui5-link` becomes truncated.
 * If the `wrappingType` property is set to `"Normal"`, the text is displayed
 * on several lines instead of being truncated.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Link";`
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
let Link = Link_1 = class Link extends UI5Element {
    constructor() {
        super();
        this._dummyAnchor = document.createElement("a");
    }
    onBeforeRendering() {
        const needsNoReferrer = this.target !== "_self"
            && this.href
            && this._isCrossOrigin();
        this._rel = needsNoReferrer ? "noreferrer noopener" : undefined;
    }
    _isCrossOrigin() {
        const loc = window.location;
        this._dummyAnchor.href = this.href;
        return !(this._dummyAnchor.hostname === loc.hostname
            && this._dummyAnchor.port === loc.port
            && this._dummyAnchor.protocol === loc.protocol);
    }
    get effectiveTabIndex() {
        if (this.forcedTabIndex) {
            return this.forcedTabIndex;
        }
        return (this.disabled || !this.textContent?.length) ? "-1" : "0";
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    get hasLinkType() {
        return this.design !== LinkDesign.Default;
    }
    static typeTextMappings() {
        return {
            "Subtle": LINK_SUBTLE,
            "Emphasized": LINK_EMPHASIZED,
        };
    }
    get linkTypeText() {
        return Link_1.i18nBundle.getText(Link_1.typeTextMappings()[this.design]);
    }
    get parsedRef() {
        return (this.href && this.href.length > 0) ? this.href : undefined;
    }
    get effectiveAccRole() {
        return this.accessibleRole.toLowerCase();
    }
    get _hasPopup() {
        return this.accessibilityAttributes.hasPopup?.toLowerCase();
    }
    static async onDefine() {
        Link_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    _onclick(e) {
        const { altKey, ctrlKey, metaKey, shiftKey, } = e;
        e.stopImmediatePropagation();
        markEvent(e, "link");
        const executeEvent = this.fireEvent("click", {
            altKey,
            ctrlKey,
            metaKey,
            shiftKey,
        }, true);
        if (!executeEvent) {
            e.preventDefault();
        }
    }
    _onfocusin(e) {
        markEvent(e, "link");
        this.focused = true;
    }
    _onfocusout() {
        this.focused = false;
    }
    _onkeydown(e) {
        if (isEnter(e) && !this.href) {
            this._onclick(e);
        }
        else if (isSpace(e)) {
            e.preventDefault();
        }
        markEvent(e, "link");
    }
    _onkeyup(e) {
        if (!isSpace(e)) {
            markEvent(e, "link");
            return;
        }
        this._onclick(e);
        if (this.href && !e.defaultPrevented) {
            const customEvent = new MouseEvent("click");
            customEvent.stopImmediatePropagation();
            this.getDomRef().dispatchEvent(customEvent);
        }
    }
};
__decorate([
    property({ type: Boolean })
], Link.prototype, "disabled", void 0);
__decorate([
    property()
], Link.prototype, "title", void 0);
__decorate([
    property()
], Link.prototype, "href", void 0);
__decorate([
    property()
], Link.prototype, "target", void 0);
__decorate([
    property({ type: LinkDesign, defaultValue: LinkDesign.Default })
], Link.prototype, "design", void 0);
__decorate([
    property({ type: WrappingType, defaultValue: WrappingType.None })
], Link.prototype, "wrappingType", void 0);
__decorate([
    property()
], Link.prototype, "accessibleName", void 0);
__decorate([
    property()
], Link.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ defaultValue: "link" })
], Link.prototype, "accessibleRole", void 0);
__decorate([
    property({ type: Object })
], Link.prototype, "accessibilityAttributes", void 0);
__decorate([
    property({ noAttribute: true })
], Link.prototype, "_rel", void 0);
__decorate([
    property({ noAttribute: true })
], Link.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Boolean })
], Link.prototype, "focused", void 0);
Link = Link_1 = __decorate([
    customElement({
        tag: "ui5-link",
        languageAware: true,
        renderer: litRender,
        template: LinkTemplate,
        styles: linkCss,
    })
    /**
     * Fired when the component is triggered either with a mouse/tap
     * or by using the Enter key.
     * @public
     * @allowPreventDefault
     * @param {boolean} altKey Returns whether the "ALT" key was pressed when the event was triggered.
     * @param {boolean} ctrlKey Returns whether the "CTRL" key was pressed when the event was triggered.
     * @param {boolean} metaKey Returns whether the "META" key was pressed when the event was triggered.
     * @param {boolean} shiftKey Returns whether the "SHIFT" key was pressed when the event was triggered.
     */
    ,
    event("click", {
        detail: {
            /**
             * @public
             */
            altKey: { type: Boolean },
            /**
             * @public
             */
            ctrlKey: { type: Boolean },
            /**
             * @public
             */
            metaKey: { type: Boolean },
            /**
             * @public
             */
            shiftKey: { type: Boolean },
        },
    })
], Link);
Link.define();
export default Link;
//# sourceMappingURL=Link.js.map