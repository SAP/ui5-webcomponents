var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IllustratedMessage_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getIllustrationDataSync, getIllustrationData } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import TitleLevel from "@ui5/webcomponents/dist/types/TitleLevel.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import IllustrationMessageSize from "./types/IllustrationMessageSize.js";
import IllustrationMessageType from "./types/IllustrationMessageType.js";
import "./illustrations/BeforeSearch.js";
// Styles
import IllustratedMessageCss from "./generated/themes/IllustratedMessage.css.js";
// Template
import IllustratedMessageTemplate from "./generated/templates/IllustratedMessageTemplate.lit.js";
const getEffectiveIllustrationName = (name) => {
    if (name.startsWith("Tnt")) {
        return name.replace("Tnt", "tnt/");
    }
    if (name.includes("/")) {
        return name;
    }
    return `fiori/${name}`;
};
/**
 * @class
 *
 * ### Overview
 * An IllustratedMessage is a recommended combination of a solution-oriented message, an engaging
 * illustration, and conversational tone to better communicate an empty or a success state than just show
 * a message alone.
 *
 * Each illustration has default internationalised title and subtitle texts. Also they can be managed with
 * `titleText` and `subtitleText` properties.
 *
 * To display the desired illustration, use the `name` property, where you can find the list of all available illustrations.
 *
 * **Note:** By default the “BeforeSearch” illustration is loaded. To use other illustrations, make sure you import them in addition, for example:
 *
 * `import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js"`
 *
 * **Note:** Illustrations starting with the “Tnt” prefix are part of another illustration set. For example to use the “TntSuccess” illustration, add the following import::
 *
 * `import "@ui5/webcomponents-fiori/dist/illustrations/tnt/Success.js"`
 *
 * ### Structure
 * The IllustratedMessage consists of the following elements, which are displayed below each other in the following order:
 *
 * - Illustration
 * - Title
 * - Subtitle
 * - Actions
 *
 * ### Usage
 * `ui5-illustrated-message` is meant to be used inside container component, for example a `ui5-card`,
 * a `ui5-dialog` or a `ui5-page`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";`
 * @csspart subtitle - Used to style the subtitle wrapper of the `ui5-illustrated-message`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 */
let IllustratedMessage = IllustratedMessage_1 = class IllustratedMessage extends UI5Element {
    constructor() {
        super();
        this._handleResize = this.handleResize.bind(this);
        // this will store the last known offsetWidth of the IllustratedMessage DOM node for a given media (e.g. "Spot")
        this._lastKnownOffsetWidthForMedia = {};
        this._lastKnownOffsetHeightForMedia = {};
        // this will store the last known media, in order to detect if IllustratedMessage has been hidden by expand/collapse container
        this._lastKnownMedia = "base";
    }
    static async onDefine() {
        IllustratedMessage_1.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
    }
    static get BREAKPOINTS() {
        return {
            DIALOG: 681,
            SPOT: 360,
            DOT: 260,
            BASE: 160,
        };
    }
    static get BREAKPOINTS_HEIGHT() {
        return {
            DIALOG: 415,
            SPOT: 284,
            DOT: 207,
            BASE: 61,
        };
    }
    static get MEDIA() {
        return {
            BASE: "base",
            DOT: "dot",
            SPOT: "spot",
            DIALOG: "dialog",
            SCENE: "scene",
        };
    }
    async onBeforeRendering() {
        // Gets the current illustration name given in the "name" attribute
        let effectiveName = getEffectiveIllustrationName(this.name);
        let illustrationData = getIllustrationDataSync(effectiveName);
        if (this.hasAttribute("name") && !this.isValidIllustration(effectiveName)) {
            effectiveName = getEffectiveIllustrationName(IllustrationMessageType.BeforeSearch);
            // eslint-disable-next-line
            console.warn(`The illustration "${effectiveName}" does not exist. The default illustration "${IllustrationMessageType.BeforeSearch}" is loaded instead.`);
        }
        if (illustrationData === undefined) {
            illustrationData = await getIllustrationData(effectiveName);
        }
        this.dotSvg = illustrationData.dotSvg;
        this.spotSvg = illustrationData.spotSvg;
        this.dialogSvg = illustrationData.dialogSvg;
        this.sceneSvg = illustrationData.sceneSvg;
        this.illustrationTitle = IllustratedMessage_1.i18nBundle.getText(illustrationData.title);
        this.illustrationSubtitle = IllustratedMessage_1.i18nBundle.getText(illustrationData.subtitle);
        if (this.size !== IllustrationMessageSize.Auto) {
            this._handleCustomSize();
        }
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResize);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResize);
    }
    handleResize() {
        if (this.size !== IllustrationMessageSize.Auto) {
            this._adjustHeightToFitContainer();
            return;
        }
        this._applyMedia();
        window.requestAnimationFrame(this._adjustHeightToFitContainer.bind(this));
    }
    _applyMedia(heightChange) {
        const currOffsetWidth = this.offsetWidth, currOffsetHeight = this.offsetHeight;
        const size = heightChange ? currOffsetHeight : currOffsetWidth, oBreakpounts = heightChange ? IllustratedMessage_1.BREAKPOINTS_HEIGHT : IllustratedMessage_1.BREAKPOINTS;
        let newMedia = "";
        if (size <= oBreakpounts.BASE) {
            newMedia = IllustratedMessage_1.MEDIA.BASE;
        }
        else if (size <= oBreakpounts.DOT) {
            newMedia = IllustratedMessage_1.MEDIA.DOT;
        }
        else if (size <= oBreakpounts.SPOT) {
            newMedia = IllustratedMessage_1.MEDIA.SPOT;
        }
        else if (size <= oBreakpounts.DIALOG) {
            newMedia = IllustratedMessage_1.MEDIA.DIALOG;
        }
        else {
            newMedia = IllustratedMessage_1.MEDIA.SCENE;
        }
        const lastKnownOffsetWidth = this._lastKnownOffsetWidthForMedia[newMedia], lastKnownOffsetHeight = this._lastKnownOffsetHeightForMedia[newMedia];
        // prevents infinite resizing, when same width is detected for the same media,
        // excluding the case in which, the control is placed inside expand/collapse container
        if (!(lastKnownOffsetWidth && currOffsetWidth === lastKnownOffsetWidth
            && lastKnownOffsetHeight && currOffsetHeight === lastKnownOffsetHeight)
            || this._lastKnownOffsetWidthForMedia[this._lastKnownMedia] === 0
            || this._lastKnownOffsetHeightForMedia[this._lastKnownMedia] === 0) {
            this.media = newMedia;
            this._lastKnownOffsetWidthForMedia[newMedia] = currOffsetWidth;
            this._lastKnownOffsetHeightForMedia[newMedia] = currOffsetHeight;
            this._lastKnownMedia = newMedia;
        }
    }
    _setSVGAccAttrs() {
        const svg = this.shadowRoot.querySelector(".ui5-illustrated-message-illustration svg");
        if (svg) {
            if (this.ariaLabelText) {
                svg.setAttribute("aria-label", this.ariaLabelText);
            }
            else {
                svg.removeAttribute("aria-label");
            }
        }
    }
    _adjustHeightToFitContainer() {
        const illustrationWrapper = this.shadowRoot.querySelector(".ui5-illustrated-message-illustration"), illustration = illustrationWrapper.querySelector("svg");
        if (illustration) {
            illustrationWrapper.classList.toggle("ui5-illustrated-message-illustration-fit-content", false);
            if (this.getDomRef().scrollHeight > this.getDomRef().offsetHeight) {
                illustrationWrapper.classList.toggle("ui5-illustrated-message-illustration-fit-content", true);
                this._applyMedia(true /* height change */);
            }
        }
    }
    onAfterRendering() {
        this._setSVGAccAttrs();
    }
    /**
     * Modifies the IM styles in accordance to the `size` property's value.
     * Note: The resize handler has no effect when size is different than "Auto".
     * @private
     * @since 1.5.0
     */
    _handleCustomSize() {
        switch (this.size) {
            case IllustrationMessageSize.Base:
                this.media = IllustratedMessage_1.MEDIA.BASE;
                return;
            case IllustrationMessageSize.Dot:
                this.media = IllustratedMessage_1.MEDIA.DOT;
                return;
            case IllustrationMessageSize.Spot:
                this.media = IllustratedMessage_1.MEDIA.SPOT;
                return;
            case IllustrationMessageSize.Dialog:
                this.media = IllustratedMessage_1.MEDIA.DIALOG;
                return;
            default:
                this.media = IllustratedMessage_1.MEDIA.SCENE;
        }
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    get effectiveIllustration() {
        switch (this.media) {
            case IllustratedMessage_1.MEDIA.DOT:
                return this.dotSvg;
            case IllustratedMessage_1.MEDIA.SPOT:
                return this.spotSvg;
            case IllustratedMessage_1.MEDIA.DIALOG:
                return this.dialogSvg;
            case IllustratedMessage_1.MEDIA.SCENE:
                return this.sceneSvg;
            default:
                return "";
        }
    }
    get hasFormattedSubtitle() {
        return !!this.subtitle.length;
    }
    get hasFormattedTitle() {
        return !!this.title.length;
    }
    get effectiveTitleText() {
        return this.titleText ? this.titleText : this.illustrationTitle;
    }
    get effectiveSubitleText() {
        return this.subtitleText ? this.subtitleText : this.illustrationSubtitle;
    }
    get hasTitle() {
        return !!(this.hasFormattedTitle || this.titleText || this.illustrationTitle);
    }
    get hasSubtitle() {
        return !!(this.hasFormattedSubtitle || this.subtitleText || this.illustrationSubtitle);
    }
    get hasActions() {
        return !!this.actions.length && this.media !== IllustratedMessage_1.MEDIA.BASE;
    }
    isValidIllustration(currentIllustration) {
        currentIllustration = currentIllustration.startsWith("tnt/") ? currentIllustration.replace("tnt/", "Tnt") : currentIllustration.replace("fiori/", "");
        return currentIllustration in IllustrationMessageType;
    }
};
__decorate([
    property({ type: String, defaultValue: IllustrationMessageType.BeforeSearch })
], IllustratedMessage.prototype, "name", void 0);
__decorate([
    property({ type: IllustrationMessageSize, defaultValue: IllustrationMessageSize.Auto })
], IllustratedMessage.prototype, "size", void 0);
__decorate([
    property()
], IllustratedMessage.prototype, "subtitleText", void 0);
__decorate([
    property()
], IllustratedMessage.prototype, "titleText", void 0);
__decorate([
    property({ defaultValue: "" })
], IllustratedMessage.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: TitleLevel, defaultValue: TitleLevel.H2 })
], IllustratedMessage.prototype, "titleLevel", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "dotSvg", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "spotSvg", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "sceneSvg", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "dialogSvg", void 0);
__decorate([
    property()
], IllustratedMessage.prototype, "media", void 0);
__decorate([
    slot({ type: HTMLElement })
], IllustratedMessage.prototype, "title", void 0);
__decorate([
    slot({ type: HTMLElement })
], IllustratedMessage.prototype, "subtitle", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], IllustratedMessage.prototype, "actions", void 0);
IllustratedMessage = IllustratedMessage_1 = __decorate([
    customElement({
        tag: "ui5-illustrated-message",
        languageAware: true,
        themeAware: true,
        renderer: litRender,
        styles: IllustratedMessageCss,
        template: IllustratedMessageTemplate,
        dependencies: [Title],
    })
], IllustratedMessage);
IllustratedMessage.define();
export default IllustratedMessage;
//# sourceMappingURL=IllustratedMessage.js.map