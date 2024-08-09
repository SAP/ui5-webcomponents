var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ColorPalette_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { isSpace, isEnter, isDown, isUp, isTabNext, } from "@ui5/webcomponents-base/dist/Keys.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import ColorPaletteTemplate from "./generated/templates/ColorPaletteTemplate.lit.js";
import ColorPaletteDialogTemplate from "./generated/templates/ColorPaletteDialogTemplate.lit.js";
import ColorPaletteItem from "./ColorPaletteItem.js";
import Button from "./Button.js";
import { COLORPALETTE_CONTAINER_LABEL, COLOR_PALETTE_MORE_COLORS_TEXT, COLOR_PALETTE_DEFAULT_COLOR_TEXT, } from "./generated/i18n/i18n-defaults.js";
// Styles
import ColorPaletteCss from "./generated/themes/ColorPalette.css.js";
import ColorPaletteStaticAreaCss from "./generated/themes/ColorPaletteStaticArea.css.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-color-palette` provides the users with a range of predefined colors. The colors are fixed and do not change with the theme.
 *
 * ### Usage
 *
 * The `ui5-color-palette` is meant for users that need to select a color from a predefined set.
 * To define the colors, use the `ui5-color-palette-item` component inside the default slot of the `ui5-color-palette`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ColorPalette.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.12
 * @public
 */
let ColorPalette = ColorPalette_1 = class ColorPalette extends UI5Element {
    static async onDefine() {
        const colorPaletteMoreColors = getFeature("ColorPaletteMoreColors");
        [ColorPalette_1.i18nBundle] = await Promise.all([
            getI18nBundle("@ui5/webcomponents"),
            colorPaletteMoreColors ? colorPaletteMoreColors.init() : Promise.resolve(),
        ]);
    }
    constructor() {
        super();
        this._itemNavigation = new ItemNavigation(this, {
            getItemsCallback: () => this.displayedColors,
            rowSize: this.rowSize,
            behavior: ItemNavigationBehavior.Cyclic,
        });
        this._itemNavigationRecentColors = new ItemNavigation(this, {
            getItemsCallback: () => this.recentColorsElements,
            rowSize: this.rowSize,
            behavior: ItemNavigationBehavior.Static,
        });
        this._recentColors = [];
    }
    onBeforeRendering() {
        this.displayedColors.forEach((item, index) => {
            item.index = index + 1;
        });
        if (this.showMoreColors) {
            const ColorPaletteMoreColorsClass = getFeature("ColorPaletteMoreColors");
            if (ColorPaletteMoreColorsClass) {
                this.moreColorsFeature = new ColorPaletteMoreColorsClass();
            }
            else {
                throw new Error(`You have to import "@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js" module to use the more-colors functionality.`);
            }
        }
        this.onPhone = isPhone();
    }
    onAfterRendering() {
        if (this.popupMode) {
            if (this.showDefaultColor) {
                this.focusFirstFocusableElement();
            }
            else {
                this.focusFirstDisplayColorElement();
            }
        }
    }
    selectColor(item) {
        if (!item.value) {
            return;
        }
        item.focus();
        if (this.displayedColors.includes(item)) {
            this._itemNavigation.setCurrentItem(item);
        }
        this._setColor(item.value);
    }
    _setColor(color) {
        this._selectedColor = color;
        if (this._recentColors[0] !== this._selectedColor) {
            if (this._recentColors.includes(this._selectedColor)) {
                this._recentColors.unshift(this._recentColors.splice(this._recentColors.indexOf(this._selectedColor), 1)[0]);
            }
            else {
                this._recentColors.unshift(this._selectedColor);
            }
        }
        this.fireEvent("item-click", {
            color: this._selectedColor,
        });
    }
    _onclick(e) {
        const target = e.target;
        if (target.hasAttribute("ui5-color-palette-item")) {
            this.selectColor(target);
        }
    }
    _onkeyup(e) {
        const target = e.target;
        if (isSpace(e) && target.hasAttribute("ui5-color-palette-item")) {
            e.preventDefault();
            this.selectColor(target);
        }
    }
    _onkeydown(e) {
        const target = e.target;
        if (isEnter(e) && target.hasAttribute("ui5-color-palette-item")) {
            this.selectColor(target);
        }
    }
    _onDefaultColorKeyDown(e) {
        if (isTabNext(e) && this.popupMode) {
            e.preventDefault();
            this._onDefaultColorClick();
        }
        if (isDown(e)) {
            e.stopPropagation();
            this.focusColorElement(this.colorPaletteNavigationElements[1], this._itemNavigation);
        }
        else if (isUp(e)) {
            e.stopPropagation();
            const lastElementInNavigation = this.colorPaletteNavigationElements[this.colorPaletteNavigationElements.length - 1];
            if (this.hasRecentColors) {
                this.focusColorElement(lastElementInNavigation, this._itemNavigationRecentColors);
            }
            else if (this.showMoreColors) {
                lastElementInNavigation.focus();
            }
            else {
                const colorPaletteFocusIndex = (this.displayedColors.length % this.rowSize) * this.rowSize;
                this.focusColorElement(this.displayedColors[colorPaletteFocusIndex], this._itemNavigation);
            }
        }
    }
    _onMoreColorsKeyDown(e) {
        const target = e.target;
        const index = this.colorPaletteNavigationElements.indexOf(target);
        const colorPaletteFocusIndex = (this.displayedColors.length % this.rowSize) * this.rowSize;
        if (isUp(e)) {
            e.stopPropagation();
            this.focusColorElement(this.displayedColors[colorPaletteFocusIndex], this._itemNavigation);
        }
        else if (isDown(e)) {
            e.stopPropagation();
            if (this.hasRecentColors) {
                this.focusColorElement(this.colorPaletteNavigationElements[index + 1], this._itemNavigationRecentColors);
            }
            else if (this.showDefaultColor) {
                this.firstFocusableElement.focus();
            }
            else {
                this.focusColorElement(this.displayedColors[0], this._itemNavigation);
            }
        }
    }
    _onColorContainerKeyDown(e) {
        const target = e.target;
        const lastElementInNavigation = this.colorPaletteNavigationElements[this.colorPaletteNavigationElements.length - 1];
        if (isTabNext(e) && this.popupMode) {
            e.preventDefault();
            this.selectColor(target);
        }
        if (isUp(e) && target === this.displayedColors[0] && this.colorPaletteNavigationElements.length > 1) {
            e.stopPropagation();
            if (this.showDefaultColor) {
                this.firstFocusableElement.focus();
            }
            else if (!this.showDefaultColor && this.hasRecentColors) {
                this.focusColorElement(lastElementInNavigation, this._itemNavigationRecentColors);
            }
            else if (!this.showDefaultColor && this.showMoreColors) {
                lastElementInNavigation.focus();
            }
        }
        else if (isDown(e) && target === this.displayedColors[this.displayedColors.length - 1] && this.colorPaletteNavigationElements.length > 1) {
            e.stopPropagation();
            const isRecentColorsNextElement = (this.showDefaultColor && !this.showMoreColors && this.hasRecentColors) || (!this.showDefaultColor && !this.showMoreColors && this.hasRecentColors);
            if (this.showDefaultColor && this.showMoreColors) {
                this.colorPaletteNavigationElements[2].focus();
            }
            else if (this.showDefaultColor && !this.showMoreColors && (!this.showRecentColors || !this.recentColors[0])) {
                this.firstFocusableElement.focus();
            }
            else if (isRecentColorsNextElement) {
                this.focusColorElement(lastElementInNavigation, this._itemNavigationRecentColors);
            }
            else if (!this.showDefaultColor && this.showMoreColors) {
                this.colorPaletteNavigationElements[1].focus();
            }
        }
    }
    _onRecentColorsContainerKeyDown(e) {
        if (isUp(e)) {
            if (this.showMoreColors) {
                const navigationElementsIndex = this.showDefaultColor ? 2 : 1;
                this.colorPaletteNavigationElements[navigationElementsIndex].focus();
            }
            else if (!this.showMoreColors && this.colorPaletteNavigationElements.length > 1) {
                const colorPaletteFocusIndex = (this.displayedColors.length % this.rowSize) * this.rowSize;
                e.stopPropagation();
                this.focusColorElement(this.displayedColors[colorPaletteFocusIndex], this._itemNavigation);
            }
        }
        else if (isDown(e)) {
            if (this.showDefaultColor) {
                this.firstFocusableElement.focus();
            }
            else {
                e.stopPropagation();
                this.focusColorElement(this.displayedColors[0], this._itemNavigation);
            }
        }
    }
    focusColorElement(element, itemNavigation) {
        itemNavigation.setCurrentItem(element);
        itemNavigation._focusCurrentItem();
    }
    focusFirstDisplayColorElement() {
        this.focusColorElement(this.displayedColors[0], this._itemNavigation);
    }
    focusFirstFocusableElement() {
        this.firstFocusableElement.focus();
    }
    get firstFocusableElement() {
        return this.colorPaletteNavigationElements[0];
    }
    async _chooseCustomColor() {
        const colorPicker = await this.getColorPicker();
        this._setColor(colorPicker.color);
        this._closeDialog();
    }
    async _closeDialog() {
        const dialog = await this._getDialog();
        dialog.close();
    }
    async _openMoreColorsDialog() {
        const dialog = await this._getDialog();
        dialog.show();
    }
    _onDefaultColorClick() {
        if (this.defaultColor) {
            this._setColor(this.defaultColor);
        }
    }
    /**
     * Returns the selected color.
     */
    get selectedColor() {
        return this._selectedColor;
    }
    get displayedColors() {
        const colors = this.getSlottedNodes("colors");
        return colors.filter(item => item.value).slice(0, 15);
    }
    get colorContainerLabel() {
        return ColorPalette_1.i18nBundle.getText(COLORPALETTE_CONTAINER_LABEL);
    }
    get colorPaletteMoreColorsText() {
        return ColorPalette_1.i18nBundle.getText(COLOR_PALETTE_MORE_COLORS_TEXT);
    }
    get colorPaletteDefaultColorText() {
        return ColorPalette_1.i18nBundle.getText(COLOR_PALETTE_DEFAULT_COLOR_TEXT);
    }
    get _showMoreColors() {
        return this.showMoreColors && this.moreColorsFeature;
    }
    get rowSize() {
        return 5;
    }
    get hasRecentColors() {
        return this.showRecentColors && this.recentColors[0];
    }
    get recentColors() {
        if (this._recentColors.length > this.rowSize) {
            this._recentColors = this._recentColors.slice(0, this.rowSize);
        }
        while (this._recentColors.length < this.rowSize) {
            this._recentColors.push("");
        }
        return this._recentColors;
    }
    get recentColorsElements() {
        const domRef = this.getDomRef();
        if (domRef) {
            return Array.from(domRef.querySelectorAll(".ui5-cp-recent-colors-wrapper [ui5-color-palette-item]")).filter(x => x.value !== "");
        }
        return [];
    }
    get colorPaletteNavigationElements() {
        const navigationElements = [];
        const rootElement = this.shadowRoot.querySelector(".ui5-cp-root");
        if (this.showDefaultColor) {
            navigationElements.push(rootElement.querySelector(".ui5-cp-default-color-button"));
        }
        navigationElements.push(this.displayedColors[0]);
        if (this.showMoreColors) {
            navigationElements.push(rootElement.querySelector(".ui5-cp-more-colors"));
        }
        if (this.showRecentColors && !!this.recentColorsElements.length) {
            navigationElements.push(this.recentColorsElements[0]);
        }
        return navigationElements;
    }
    get classes() {
        return {
            colorPaletteRoot: {
                "ui5-cp-root": true,
                "ui5-cp-root-phone": isPhone(),
            },
        };
    }
    async _getDialog() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector("[ui5-dialog]");
    }
    async getColorPicker() {
        const dialog = await this._getDialog();
        return dialog.content[0].querySelector("[ui5-color-picker]");
    }
};
__decorate([
    property({ type: Boolean })
], ColorPalette.prototype, "showRecentColors", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalette.prototype, "showMoreColors", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalette.prototype, "showDefaultColor", void 0);
__decorate([
    property({ validator: CSSColor })
], ColorPalette.prototype, "defaultColor", void 0);
__decorate([
    property({ validator: CSSColor })
], ColorPalette.prototype, "_selectedColor", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalette.prototype, "popupMode", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalette.prototype, "onPhone", void 0);
__decorate([
    slot({
        "default": true,
        type: HTMLElement,
        invalidateOnChildChange: true,
        individualSlots: true,
    })
], ColorPalette.prototype, "colors", void 0);
ColorPalette = ColorPalette_1 = __decorate([
    customElement({
        tag: "ui5-color-palette",
        renderer: litRender,
        template: ColorPaletteTemplate,
        staticAreaTemplate: ColorPaletteDialogTemplate,
        styles: ColorPaletteCss,
        staticAreaStyles: ColorPaletteStaticAreaCss,
        get dependencies() {
            const colorPaletteMoreColors = getFeature("ColorPaletteMoreColors");
            return [ColorPaletteItem, Button].concat(colorPaletteMoreColors ? colorPaletteMoreColors.dependencies : []);
        },
    })
    /**
     * Fired when the user selects a color.
     * @public
     * @since 1.0.0-rc.15
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
], ColorPalette);
ColorPalette.define();
export default ColorPalette;
//# sourceMappingURL=ColorPalette.js.map