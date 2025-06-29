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
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { isSpace, isEnter, isDown, isUp, isTabNext, } from "@ui5/webcomponents-base/dist/Keys.js";
import ColorPaletteTemplate from "./ColorPaletteTemplate.js";
import "./ColorPaletteItem.js";
import { COLORPALETTE_CONTAINER_LABEL, COLOR_PALETTE_MORE_COLORS_TEXT, COLOR_PALETTE_DEFAULT_COLOR_TEXT, COLOR_PALETTE_DIALOG_CANCEL_BUTTON, COLOR_PALETTE_DIALOG_OK_BUTTON, COLOR_PALETTE_DIALOG_TITLE, } from "./generated/i18n/i18n-defaults.js";
// Styles
import ColorPaletteCss from "./generated/themes/ColorPalette.css.js";
import ColorPaletteDialogCss from "./generated/themes/ColorPaletteDialog.css.js";
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
    constructor() {
        super();
        /**
         * Defines whether the user can see the last used colors in the bottom of the component
         * @private
         * @since 1.0.0-rc.15
         */
        this.showRecentColors = false;
        /**
         * Defines whether the user can choose a custom color from a color picker
         *
         * @private
         * @since 1.0.0-rc.15
         */
        this.showMoreColors = false;
        /**
         * Defines whether the user can choose the default color from a button.
         * @default false
         * @private
         * @since 1.0.0-rc.16
         */
        this.showDefaultColor = false;
        /**
         * Defines if the palette is in Popup or Embeded mode.
         * @private
         */
        this.popupMode = false;
        /**
         * Defines if the palette is rendered on phone.
         * @private
         */
        this.onPhone = false;
        /**
         * @private
         */
        this.dialogOpen = false;
        /**
         * @private
         */
        this.colorPickerValue = "rgba(255,255,255,1)";
        this._shouldFocusRecentColors = false;
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
        this._ensureSingleSelectionOrDeselectAll();
        const selectedItem = this.selectedItem;
        if (selectedItem && !this.showRecentColors) {
            this._selectedColor = selectedItem.value;
        }
        this.displayedColors.forEach((item, index) => {
            item.index = index + 1;
        });
        if (this.showMoreColors) {
            // If the feature is preloaded (the user manually imported ColorPaletteMoreColors.js), the teplate is already available on the constructor
            if (ColorPalette_1.ColorPaletteMoreColorsTemplate) {
                this.showMoreColorsTemplate = ColorPalette_1.ColorPaletteMoreColorsTemplate;
                // If feature is not preloaded, load the template dynamically
            }
            else {
                import("./features/ColorPaletteMoreColorsTemplate.js").then(module => {
                    this.showMoreColorsTemplate = module.default;
                });
            }
        }
        this.onPhone = isPhone();
    }
    onAfterRendering() {
        if (this.hasRecentColors && this._shouldFocusRecentColors) {
            if (this.selectedItem) {
                this.selectedItem.selected = false;
            }
            const firstRecentColor = this.recentColorsElements[0];
            firstRecentColor.selected = true;
            this._currentlySelected = firstRecentColor;
            this._currentlySelected.focus();
            this._shouldFocusRecentColors = false;
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
                this._addRecentColor(this._selectedColor);
            }
        }
        this.fireDecoratorEvent("item-click", {
            color: this._selectedColor,
        });
    }
    get effectiveColorItems() {
        let colorItems = this.colors;
        if (this.popupMode) {
            colorItems = this.getSlottedNodes("colors");
        }
        return colorItems;
    }
    /**
     * Ensures that only one item is selected or only the last selected item remains active if more than one are explicitly set as 'selected'.
     * @private
     */
    _ensureSingleSelectionOrDeselectAll() {
        let lastSelectedItem;
        this.allColorsInPalette.forEach(item => {
            if (item.selected) {
                if (lastSelectedItem) {
                    lastSelectedItem.selected = false;
                }
                lastSelectedItem = item;
            }
        });
    }
    _onclick(e) {
        this.handleSelection(e.target);
    }
    _onkeyup(e) {
        const target = e.target;
        if (isSpace(e)) {
            e.preventDefault();
            this.handleSelection(target);
        }
    }
    _onkeydown(e) {
        const target = e.target;
        if (isEnter(e)) {
            this.handleSelection(target);
        }
        if (isSpace(e)) {
            e.preventDefault();
        }
    }
    handleSelection(target) {
        if (!target.hasAttribute("ui5-color-palette-item") || !target.value) {
            return;
        }
        this._shouldFocusRecentColors = false;
        this.selectColor(target);
        // Handle selection for items within the 'recentColorsElements'
        if (this.recentColorsElements.includes(target)) {
            this.recentColorsElements[0].selected = true;
            this.recentColorsElements[0].focus();
            this._currentlySelected = this.recentColorsElements[0];
        }
        else {
            this.allColorsInPalette.forEach(item => {
                item.selected = item === target;
            });
            this._currentlySelected = target;
        }
        this._ensureSingleSelectionOrDeselectAll();
    }
    _handleDefaultColorClick(e) {
        e.preventDefault();
        this._onDefaultColorClick();
    }
    _onDefaultColorKeyUp(e) {
        if (isSpace(e)) {
            this._handleDefaultColorClick(e);
        }
    }
    _onDefaultColorKeyDown(e) {
        if (isTabNext(e) && this.popupMode) {
            this._handleDefaultColorClick(e);
        }
        if (isEnter(e)) {
            this._handleDefaultColorClick(e);
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
    _isUpOrDownNavigatableColorPaletteItem(e) {
        return (isUp(e) || isDown(e)) && this._currentlySelected && this.colorPaletteNavigationElements.includes(this._currentlySelected);
    }
    _onColorContainerKeyDown(e) {
        const target = e.target;
        const lastElementInNavigation = this.colorPaletteNavigationElements[this.colorPaletteNavigationElements.length - 1];
        if (this._isUpOrDownNavigatableColorPaletteItem(e)) {
            this._currentlySelected = undefined;
        }
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
        if (this._isUpOrDownNavigatableColorPaletteItem(e)) {
            this._currentlySelected = undefined;
        }
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
    get firstFocusableElement() {
        return this.colorPaletteNavigationElements[0];
    }
    onColorPickerChange(e) {
        this.colorPickerValue = e.target.value;
    }
    _chooseCustomColor() {
        this._setColor(this.colorPickerValue);
        this._closeDialog();
        this._shouldFocusRecentColors = true;
    }
    _addRecentColor(color) {
        if (this.showRecentColors && !this._recentColors.includes(color)) {
            this._recentColors.unshift(color);
            if (this._recentColors.length > this.rowSize) {
                this._recentColors.pop();
            }
        }
    }
    _closeDialog() {
        this.dialogOpen = false;
    }
    _openMoreColorsDialog() {
        const value = this._currentlySelected ? this._currentlySelected.value : undefined;
        if (value) {
            this.colorPickerValue = value;
        }
        this.dialogOpen = true;
    }
    _onDefaultColorClick() {
        if (this.defaultColor) {
            this._setColor(this.defaultColor);
            this._addRecentColor(this.defaultColor);
            if (this.selectedItem) {
                this.selectedItem.selected = false;
                this._currentlySelected = undefined;
            }
        }
    }
    /**
     * Returns the selected item.
     */
    get selectedItem() {
        return this.allColorsInPalette.find(item => item.selected);
    }
    get allColorsInPalette() {
        return [...this.effectiveColorItems, ...this.recentColorsElements];
    }
    get colorPaletteDialogTitle() {
        return ColorPalette_1.i18nBundle.getText(COLOR_PALETTE_DIALOG_TITLE);
    }
    get colorPaletteDialogOKButton() {
        return ColorPalette_1.i18nBundle.getText(COLOR_PALETTE_DIALOG_OK_BUTTON);
    }
    get colorPaletteCancelButton() {
        return ColorPalette_1.i18nBundle.getText(COLOR_PALETTE_DIALOG_CANCEL_BUTTON);
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
        if (this._currentlySelected) {
            navigationElements.push(this._currentlySelected);
        }
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
        // Remove after deleting the hbs template, it's added in the jsx template
        return {
            colorPaletteRoot: {
                "ui5-cp-root": true,
                "ui5-cp-root-phone": isPhone(),
            },
        };
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
    property()
], ColorPalette.prototype, "defaultColor", void 0);
__decorate([
    property()
], ColorPalette.prototype, "_selectedColor", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalette.prototype, "popupMode", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalette.prototype, "onPhone", void 0);
__decorate([
    property({ noAttribute: true })
], ColorPalette.prototype, "showMoreColorsTemplate", void 0);
__decorate([
    property({ type: Boolean })
], ColorPalette.prototype, "dialogOpen", void 0);
__decorate([
    property()
], ColorPalette.prototype, "colorPickerValue", void 0);
__decorate([
    slot({
        "default": true,
        type: HTMLElement,
        invalidateOnChildChange: true,
        individualSlots: true,
    })
], ColorPalette.prototype, "colors", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], ColorPalette, "i18nBundle", void 0);
ColorPalette = ColorPalette_1 = __decorate([
    customElement({
        tag: "ui5-color-palette",
        renderer: jsxRenderer,
        template: ColorPaletteTemplate,
        styles: [ColorPaletteCss, ColorPaletteDialogCss],
    })
    /**
     * Fired when the user selects a color.
     * @public
     * @since 1.0.0-rc.15
     * @param {string} color the selected color
     */
    ,
    event("item-click")
], ColorPalette);
ColorPalette.define();
export default ColorPalette;
//# sourceMappingURL=ColorPalette.js.map