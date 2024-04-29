import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import {
	isSpace,
	isEnter,
	isDown,
	isUp,
	isTabNext,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import ColorPaletteTemplate from "./generated/templates/ColorPaletteTemplate.lit.js";
import ColorPaletteItem from "./ColorPaletteItem.js";
import Button from "./Button.js";
import type Dialog from "./Dialog.js";
import type ColorPaletteMoreColors from "./features/ColorPaletteMoreColors.js";
import type ColorPicker from "./ColorPicker.js";

import {
	COLORPALETTE_CONTAINER_LABEL,
	COLOR_PALETTE_MORE_COLORS_TEXT,
	COLOR_PALETTE_DEFAULT_COLOR_TEXT,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ColorPaletteCss from "./generated/themes/ColorPalette.css.js";
import ColorPaletteDialogCss from "./generated/themes/ColorPaletteDialog.css.js";

/**
 * Interface for components that may be used inside a `ui5-color-palette` or `ui5-color-palette-popover`
 * @public
 */
interface IColorPaletteItem extends HTMLElement, ITabbable {
	value?: string,
	index?: number,
	selected?: boolean,
}

type ColorPaletteNavigationItem = IColorPaletteItem | Button;

type ColorPaletteItemClickEventDetail = {
	color: string,
}

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
@customElement({
	tag: "ui5-color-palette",
	renderer: litRender,
	template: ColorPaletteTemplate,
	styles: [ColorPaletteCss, ColorPaletteDialogCss],
	get dependencies() {
		const colorPaletteMoreColors = getFeature<typeof ColorPaletteMoreColors>("ColorPaletteMoreColors");
		return ([ColorPaletteItem, Button] as Array<typeof UI5Element>).concat(colorPaletteMoreColors ? colorPaletteMoreColors.dependencies : []);
	},
})

/**
 * Fired when the user selects a color.
 * @public
 * @since 1.0.0-rc.15
 * @param {string} color the selected color
 */
@event<ColorPaletteItemClickEventDetail>("item-click", {
	detail: {
		/**
		 * @public
		 */
		color: {
			type: String,
		},
	},
})
class ColorPalette extends UI5Element {
	/**
	 * Defines whether the user can see the last used colors in the bottom of the component
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	showRecentColors!: boolean;

	/**
	 * Defines whether the user can choose a custom color from a color picker
	 *
	 * **Note:** In order to use this property you need to import the following module: `"@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"`
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	showMoreColors!: boolean;

	/**
	 * Defines whether the user can choose the default color from a button.
	 * @default false
	 * @private
	 * @since 1.0.0-rc.16
	 */
	@property({ type: Boolean })
	showDefaultColor!: boolean;

	/**
	 * Defines the default color of the color palette
	 *
	 * **Note:** The default color should be a part of the ColorPalette colors`
	 * @private
	 * @since 1.0.0-rc.16
	 */
	@property({ validator: CSSColor })
	defaultColor?: string;

	/**
	 * Defines the selected color.
	 * @private
	 */
	@property({ validator: CSSColor })
	_selectedColor?: string;

	/**
	 * Defines if the palette is in Popup or Embeded mode.
	 * @private
	 */
	@property({ type: Boolean })
	popupMode!: boolean;

	/**
	 * Defines if the palette is rendered on phone.
	 * @private
	 */
	@property({ type: Boolean })
	onPhone!: boolean;

	/**
	 * Defines the `ui5-color-palette-item` elements.
	 * @public
	 */
	@slot({
		"default": true,
		type: HTMLElement,
		invalidateOnChildChange: true,
		individualSlots: true,
	})

	colors!: Array<IColorPaletteItem>;

	_itemNavigation: ItemNavigation;
	_itemNavigationRecentColors: ItemNavigation;
	_recentColors: Array<string>;
	moreColorsFeature: ColorPaletteMoreColors | Record<string, any> = {};
	_currentlySelected?: ColorPaletteItem;
	_shouldFocusRecentColors!: boolean;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		const colorPaletteMoreColors = getFeature<typeof ColorPaletteMoreColors>("ColorPaletteMoreColors");

		[ColorPalette.i18nBundle] = await Promise.all([
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
		this._ensureSingleSelectionOrDeselectAll();

		const selectedItem = this.allColorsInPalette.find(item => item.selected);

		if (selectedItem && !this.showRecentColors) {
			this._selectedColor = selectedItem.value;
		}

		this.displayedColors.forEach((item, index) => {
			item.index = index + 1;
		});

		if (this.showMoreColors) {
			const ColorPaletteMoreColorsClass = getFeature<typeof ColorPaletteMoreColors>("ColorPaletteMoreColors");
			if (ColorPaletteMoreColorsClass) {
				this.moreColorsFeature = new ColorPaletteMoreColorsClass();
			} else {
				throw new Error(`You have to import "@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js" module to use the more-colors functionality.`);
			}
		}

		this.onPhone = isPhone();
	}

	onAfterRendering() {
		if (this._shouldFocusRecentColors && this.hasRecentColors) {
			this.recentColorsElements[0].selected = true;
			this.recentColorsElements[0].focus();
		}

		if (this.popupMode) {
			if (this.showDefaultColor) {
				this.focusFirstFocusableElement();
			} else {
				this.focusFirstDisplayColorElement();
			}
		}
	}

	selectColor(item: ColorPaletteItem) {
		if (!item.value) {
			return;
		}

		item.focus();

		if (this.displayedColors.includes(item)) {
			this._itemNavigation.setCurrentItem(item);
		}

		this._setColor(item.value);
	}

	_setColor(color: string) {
		this._selectedColor = color;

		if (this._recentColors[0] !== this._selectedColor) {
			if (this._recentColors.includes(this._selectedColor)) {
				this._recentColors.unshift(this._recentColors.splice(this._recentColors.indexOf(this._selectedColor), 1)[0]);
			} else {
				this._addRecentColor(this._selectedColor);
			}
		}

		this.fireEvent<ColorPaletteItemClickEventDetail>("item-click", {
			color: this._selectedColor,
		});
	}

	get effectiveColorItems() {
		let colorItems = this.colors;

		if (this.popupMode) {
			colorItems = this.getSlottedNodes<ColorPaletteItem>("colors");
		}

		return colorItems;
	}

	/**
	 * Ensures that only one item is selected or only the last selected item remains active if more than one are explicitly set as 'selected'.
	 * @private
	 */
	_ensureSingleSelectionOrDeselectAll() {
		const selectedItems = this.allColorsInPalette.filter(item => item.selected);
		selectedItems.pop();
		selectedItems.forEach(item => { item.selected = false; });
	}

	_onclick(e: MouseEvent) {
		this.handleSelection(e.target as ColorPaletteItem);
	}

	_onkeyup(e: KeyboardEvent) {
		const target = e.target as ColorPaletteItem;
		if (isSpace(e)) {
			e.preventDefault();
			this.handleSelection(target);
		}
	}

	_onkeydown(e: KeyboardEvent) {
		const target = e.target as ColorPaletteItem;
		if (isEnter(e)) {
			this.handleSelection(target);
		}
	}

	handleSelection(target: ColorPaletteItem) {
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
		} else {
			this.allColorsInPalette.forEach(item => {
				item.selected = item === target;
			});
			this._currentlySelected = target;
		}

		this._ensureSingleSelectionOrDeselectAll();
	}

	_onDefaultColorKeyDown(e: KeyboardEvent) {
		if (isTabNext(e) && this.popupMode) {
			e.preventDefault();
			this._onDefaultColorClick();
		}

		if (isSpace(e) || isEnter(e)) {
			e.preventDefault();
			this._onDefaultColorClick();
		}

		if (isDown(e)) {
			e.stopPropagation();

			this.focusColorElement(this.colorPaletteNavigationElements[1], this._itemNavigation);
		} else if (isUp(e)) {
			e.stopPropagation();
			const lastElementInNavigation = this.colorPaletteNavigationElements[this.colorPaletteNavigationElements.length - 1];

			if (this.hasRecentColors) {
				this.focusColorElement(lastElementInNavigation, this._itemNavigationRecentColors);
			} else if (this.showMoreColors) {
				lastElementInNavigation.focus();
			} else {
				const colorPaletteFocusIndex = (this.displayedColors.length % this.rowSize) * this.rowSize;

				this.focusColorElement(this.displayedColors[colorPaletteFocusIndex], this._itemNavigation);
			}
		}
	}

	_onMoreColorsKeyDown(e: KeyboardEvent) {
		const target = e.target as ColorPaletteItem;
		const index = this.colorPaletteNavigationElements.indexOf(target);
		const colorPaletteFocusIndex = (this.displayedColors.length % this.rowSize) * this.rowSize;

		if (isUp(e)) {
			e.stopPropagation();

			this.focusColorElement(this.displayedColors[colorPaletteFocusIndex], this._itemNavigation);
		} else if (isDown(e)) {
			e.stopPropagation();

			if (this.hasRecentColors) {
				this.focusColorElement(this.colorPaletteNavigationElements[index + 1], this._itemNavigationRecentColors);
			} else if (this.showDefaultColor) {
				this.firstFocusableElement.focus();
			} else {
				this.focusColorElement(this.displayedColors[0], this._itemNavigation);
			}
		}
	}

	_isUpOrDownNavigableColorPaletteItem(e: KeyboardEvent) {
		return (isUp(e) || isDown(e)) && this._currentlySelected && this.colorPaletteNavigationElements.includes(this._currentlySelected);
	}

	_onColorContainerKeyDown(e: KeyboardEvent) {
		const target = e.target as ColorPaletteItem;
		const lastElementInNavigation = this.colorPaletteNavigationElements[this.colorPaletteNavigationElements.length - 1];

		if (this._isUpOrDownNavigableColorPaletteItem(e)) {
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
			} else if (!this.showDefaultColor && this.hasRecentColors) {
				this.focusColorElement(lastElementInNavigation, this._itemNavigationRecentColors);
			} else if (!this.showDefaultColor && this.showMoreColors) {
				lastElementInNavigation.focus();
			}
		} else if (isDown(e) && target === this.displayedColors[this.displayedColors.length - 1] && this.colorPaletteNavigationElements.length > 1) {
			e.stopPropagation();
			const isRecentColorsNextElement = (this.showDefaultColor && !this.showMoreColors && this.hasRecentColors) || (!this.showDefaultColor && !this.showMoreColors && this.hasRecentColors);

			if (this.showDefaultColor && this.showMoreColors) {
				this.colorPaletteNavigationElements[2].focus();
			} else if (this.showDefaultColor && !this.showMoreColors && (!this.showRecentColors || !this.recentColors[0])) {
				this.firstFocusableElement.focus();
			} else if (isRecentColorsNextElement) {
				this.focusColorElement(lastElementInNavigation, this._itemNavigationRecentColors);
			} else if (!this.showDefaultColor && this.showMoreColors) {
				this.colorPaletteNavigationElements[1].focus();
			}
		}
	}

	_onRecentColorsContainerKeyDown(e: KeyboardEvent) {
		if (this._isUpOrDownNavigableColorPaletteItem(e)) {
			this._currentlySelected = undefined;
		}
		if (isUp(e)) {
			if (this.showMoreColors) {
				const navigationElementsIndex = this.showDefaultColor ? 2 : 1;
				this.colorPaletteNavigationElements[navigationElementsIndex].focus();
			} else if (!this.showMoreColors && this.colorPaletteNavigationElements.length > 1) {
				const colorPaletteFocusIndex = (this.displayedColors.length % this.rowSize) * this.rowSize;
				e.stopPropagation();

				this.focusColorElement(this.displayedColors[colorPaletteFocusIndex], this._itemNavigation);
			}
		} else if (isDown(e)) {
			if (this.showDefaultColor) {
				this.firstFocusableElement.focus();
			} else {
				e.stopPropagation();
				this.focusColorElement(this.displayedColors[0], this._itemNavigation);
			}
		}
	}

	focusColorElement(element: ColorPaletteNavigationItem, itemNavigation: ItemNavigation) {
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

	_chooseCustomColor() {
		const colorPicker = this.getColorPicker();
		this._setColor(colorPicker.value);
		this._closeDialog();
		this._shouldFocusRecentColors = !this.popupMode;
		this.recentColorsElements[0].selected = true;
		this._currentlySelected = colorPicker.value ? this.recentColorsElements[0] : undefined;
	}

	_addRecentColor(color: string) {
		if (this.showRecentColors && !this._recentColors.includes(color)) {
			this._recentColors.unshift(color);
			if (this._recentColors.length > this.rowSize) {
				this._recentColors.pop();
			}
		}
	}

	_closeDialog() {
		const dialog = this._getDialog();
		dialog.close();
	}

	_openMoreColorsDialog() {
		const dialog = this._getDialog();
		dialog.show();
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
	 * Returns the default color item.
	 */
	get defaultColorItem() {
		return this.effectiveColorItems.find(item => item.value === this.defaultColor);
	}

	/**
	 * Returns the selected item.
	 */
	get selectedItem() {
		return [...this.effectiveColorItems, ...this.recentColorsElements].find(item => item.selected);
	}

	get allColorsInPalette() {
		return [...this.effectiveColorItems, ...this.recentColorsElements];
	}

	/**
	 * Returns the selected color.
	 */
	get selectedColor() {
		return this._selectedColor;
	}

	get displayedColors() {
		const colors = this.getSlottedNodes<IColorPaletteItem>("colors");
		return colors.filter(item => item.value).slice(0, 15);
	}

	get colorContainerLabel() {
		return ColorPalette.i18nBundle.getText(COLORPALETTE_CONTAINER_LABEL);
	}

	get colorPaletteMoreColorsText() {
		return ColorPalette.i18nBundle.getText(COLOR_PALETTE_MORE_COLORS_TEXT);
	}

	get colorPaletteDefaultColorText() {
		return ColorPalette.i18nBundle.getText(COLOR_PALETTE_DEFAULT_COLOR_TEXT);
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

	get recentColorsElements(): Array<ColorPaletteItem> {
		const domRef = this.getDomRef();
		if (domRef) {
			return Array.from(domRef.querySelectorAll<ColorPaletteItem>(".ui5-cp-recent-colors-wrapper [ui5-color-palette-item]")).filter(x => x.value !== "");
		}

		return [];
	}

	get colorPaletteNavigationElements() {
		const navigationElements: Array<ColorPaletteNavigationItem> = [];
		const rootElement = this.shadowRoot!.querySelector(".ui5-cp-root")!;

		if (this._currentlySelected) {
			navigationElements.push(this._currentlySelected);
		}

		if (this.showDefaultColor) {
			navigationElements.push(rootElement.querySelector<Button>(".ui5-cp-default-color-button")!);
		}

		navigationElements.push(this.displayedColors[0]);

		if (this.showMoreColors) {
			navigationElements.push(rootElement.querySelector<Button>(".ui5-cp-more-colors")!);
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

	_getDialog() {
		return this.shadowRoot!.querySelector<Dialog>("[ui5-dialog]")!;
	}

	getColorPicker() {
		const dialog = this._getDialog();
		return dialog.content[0].querySelector<ColorPicker>("[ui5-color-picker]")!;
	}
}

ColorPalette.define();

export default ColorPalette;
export type {
	ColorPaletteItemClickEventDetail,
	IColorPaletteItem,
};
