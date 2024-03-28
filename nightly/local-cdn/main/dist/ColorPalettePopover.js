var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ColorPalettePopover_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import DOMReference from "@ui5/webcomponents-base/dist/types/DOMReference.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import ColorPalettePopoverTemplate from "./generated/templates/ColorPalettePopoverTemplate.lit.js";
// Styles
import ColorPalettePopoverCss from "./generated/themes/ColorPalettePopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import { COLORPALETTE_POPOVER_TITLE, COLOR_PALETTE_DIALOG_CANCEL_BUTTON, } from "./generated/i18n/i18n-defaults.js";
import Button from "./Button.js";
import Title from "./Title.js";
import ResponsivePopover from "./ResponsivePopover.js";
import ColorPalette from "./ColorPalette.js";
/**
 * @class
 *
 * ### Overview
 * Represents a predefined range of colors for easier selection.
 *
 * Overview
 * The ColorPalettePopover provides the users with a slot to predefine colors.
 *
 * You can customize them with the use of the colors property. You can specify a defaultColor and display a "Default color" button for the user to choose directly.
 * You can display a "More colors..." button that opens an additional color picker for the user to choose specific colors that are not present in the predefined range.
 *
 * ### Usage
 *
 * The palette is intended for users, who don't want to check and remember the different values of the colors and spend large amount of time to configure the right color through the color picker.
 *
 * For the `ui5-color-palette-popover`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/ColorPalettePopover.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.16
 */
let ColorPalettePopover = ColorPalettePopover_1 = class ColorPalettePopover extends UI5Element {
    static async onDefine() {
        ColorPalettePopover_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    constructor() {
        super();
    }
    get responsivePopover() {
        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    get respPopover() {
        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    /**
     * Shows the ColorPalettePopover.
     * @param opener the element that the popover is shown at
     * @public
     * @deprecated The method is deprecated in favour of `open` and `opener` properties.
     * @since 1.1.1
     */
    showAt(opener) {
        console.warn("The method 'showAt' is deprecated and will be removed in future, use 'open' and 'opener' props instead."); // eslint-disable-line
        this.open = true;
        this.opener = opener;
    }
    /**
     * Shows the ColorPalettePopover.
     * @param opener the element that the popover is shown at
     * @public
     * @since 1.0.0-rc.16
     * @deprecated The method is deprecated in favour of `open` and `opener` properties.
     */
    openPopover(opener) {
        console.warn("The method 'openPopover' is deprecated and will be removed in future, use 'open' and 'opener' props instead."); // eslint-disable-line
        this.showAt(opener);
    }
    closePopover() {
        this.open = false;
    }
    onAfterClose() {
        this.closePopover();
        this.fireEvent("close");
    }
    onSelectedColor(e) {
        this.closePopover();
        this.fireEvent("item-click", e.detail);
    }
    /**
     * Returns if the component is opened.
     * @protected
     * @since 1.0.0-rc.16
     */
    isOpen() {
        return this.open;
    }
    get colorPaletteColors() {
        return this.getSlottedNodes("colors");
    }
    get _colorPaletteTitle() {
        return ColorPalettePopover_1.i18nBundle.getText(COLORPALETTE_POPOVER_TITLE);
    }
    get _cancelButtonLabel() {
        return ColorPalettePopover_1.i18nBundle.getText(COLOR_PALETTE_DIALOG_CANCEL_BUTTON);
    }
    get _open() {
        return this.open || undefined;
    }
};
__decorate([
    property({ type: Boolean })
], ColorPalettePopover.prototype, "showRecentColors", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalettePopover.prototype, "showMoreColors", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalettePopover.prototype, "showDefaultColor", void 0);
__decorate([
    property({ validator: CSSColor })
], ColorPalettePopover.prototype, "defaultColor", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalettePopover.prototype, "open", void 0);
__decorate([
    property({ validator: DOMReference })
], ColorPalettePopover.prototype, "opener", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, individualSlots: true })
], ColorPalettePopover.prototype, "colors", void 0);
ColorPalettePopover = ColorPalettePopover_1 = __decorate([
    customElement({
        tag: "ui5-color-palette-popover",
        renderer: litRender,
        styles: [ResponsivePopoverCommonCss, ColorPalettePopoverCss],
        template: ColorPalettePopoverTemplate,
        dependencies: [
            ResponsivePopover,
            Button,
            Title,
            ColorPalette,
        ],
    })
    /**
     * Fired when the user selects a color.
     * @public
     * @param {string} color the selected color
     */
    ,
    event("item-click", {
        detail: {
            /**
             * @public
             */
            color: {
                type: String,
            },
        },
    })
    /**
     * Fired when the `ui5-color-palette-popover` is closed due to user interaction.
     * @since 1.21.0
     * @public
     */
    ,
    event("close")
], ColorPalettePopover);
ColorPalettePopover.define();
export default ColorPalettePopover;
//# sourceMappingURL=ColorPalettePopover.js.map