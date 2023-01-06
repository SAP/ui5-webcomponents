import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
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
import ColorPaletteDialogTemplate from "./generated/templates/ColorPaletteDialogTemplate.lit.js";
import ColorPaletteItem from "./ColorPaletteItem.js";
import Button from "./Button.js";
import type ColorPaletteMoreColors from "./features/ColorPaletteMoreColors.js";
import type ColorPicker from "./ColorPicker.js";

import {
	COLORPALETTE_CONTAINER_LABEL,
	COLOR_PALETTE_MORE_COLORS_TEXT,
	// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ColorPaletteCss from "./generated/themes/ColorPalette.css.js";
import ColorPaletteStaticAreaCss from "./generated/themes/ColorPaletteStaticArea.css.js";

type DialogTemp = HTMLElement & {
	content: Array<HTMLElement>,
	close: () => void,
	show: () => void,
}

type ColorPaletteNavigationItem = ColorPaletteItem | Button;

type ColorPaletteItemClickEventDetail = {
	color: string,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-color-palette</code> provides the users with a range of predefined colors. The colors are fixed and do not change with the theme.
 *
 * <h3>Usage</h3>
 *
 * The <code>ui5-color-palette</code> is meant for users that need to select a color from a predefined set.
 * To define the colors, use the <code>ui5-color-palette-item</code> component inside the default slot of the <code>ui5-color-palette</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/ColorPalette.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ColorPalette
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-color-palette
 * @since 1.0.0-rc.12
 * @appenddocs ColorPaletteItem
 * @public
 */
@customElement("ui5-color-palette")

/**
 * Fired when the user selects a color.
 *
 * @event sap.ui.webc.main.ColorPalette#item-click
 * @public
 * @since 1.0.0-rc.15
 * @param {string} color the selected color
 */
@event("item-click", {
	detail: {
		color: {
			type: String,
		},
	},
})
class ColorPalette extends UI5Element {
	/**
	 * Defines whether the user can see the last used colors in the bottom of the component
	 * @type {boolean}
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	showRecentColors!: boolean;

	/**
	 * Defines whether the user can choose a custom color from a color picker
	 * <b>Note:</b> In order to use this property you need to import the following module: <code>"@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"</code>
	 * @type {boolean}
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	showMoreColors!: boolean;

	/**
	 * Defines whether the user can choose the default color from a button.
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 * @since 1.0.0-rc.16
	 */
	@property({ type: Boolean })
	showDefaultColor!: boolean;

	/**
	 * Defines the default color of the color palette
	 * <b>Note:</b> The default color should be a part of the ColorPalette colors</code>
	 * @type {sap.ui.webc.base.types.CSSColor}
	 * @private
	 * @since 1.0.0-rc.16
	 */
	@property({ validator: CSSColor })
	defaultColor?: string;

	/**
	 * Defines the selected color.
	 * @type {sap.ui.webc.base.types.CSSColor}
	 * @private
	 */
	@property({ validator: CSSColor })
	_selectedColor?: string;

	/**
	 * Defines if the palette is in Popup or Embeded mode.
	 * @type {sap.ui.webc.base.types.CSSColor}
	 * @private
	 */
	@property({ type: Boolean })
	popupMode!: boolean;

	/**
	 * Defines the <code>ui5-color-palette-item</code> elements.
	 * @type {sap.ui.webc.main.IColorPaletteItem[]}
	 * @name sap.ui.webc.main.ColorPalette.prototype.default
	 * @slot colors
	 * @public
	 */
	@slot({
		"default": true,
		type: HTMLElement,
		invalidateOnChildChange: true,
		individualSlots: true,
	})
	colors!: Array<ColorPaletteItem>;

	_itemNavigation: ItemNavigation;
	_itemNavigationRecentColors: ItemNavigation;
	_recentColors: Array<string>;
	moreColorsFeature?: ColorPaletteMoreColors;

	static i18nBundle: I18nBundle;

	static get render() {
		return litRender;
	}

	static get styles() {
		return ColorPaletteCss;
	}

	static get staticAreaStyles() {
		return ColorPaletteStaticAreaCss;
	}

	static get template() {
		return ColorPaletteTemplate;
	}

	static get staticAreaTemplate() {
		return ColorPaletteDialogTemplate;
	}

	static get dependencies() {
		const colorPaletteMoreColors = getFeature<typeof ColorPaletteMoreColors>("ColorPaletteMoreColors");
		return [ColorPaletteItem, Button].concat(colorPaletteMoreColors ? colorPaletteMoreColors.dependencies : []);
	}

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
				this._recentColors.unshift(this._selectedColor);
			}
		}

		this.fireEvent<ColorPaletteItemClickEventDetail>("item-click", {
			color: this._selectedColor,
		});
	}

	_onclick(e: MouseEvent) {
		const target = e.target as ColorPaletteItem;
		if (target.hasAttribute("ui5-color-palette-item")) {
			this.selectColor(target);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		const target = e.target as ColorPaletteItem;
		if (isSpace(e) && target.hasAttribute("ui5-color-palette-item")) {
			e.preventDefault();
			this.selectColor(target);
		}
	}

	_onkeydown(e: KeyboardEvent) {
		const target = e.target as ColorPaletteItem;
		if (isEnter(e) && target.hasAttribute("ui5-color-palette-item")) {
			this.selectColor(target);
		}
	}

	_onDefaultColorKeyDown(e: KeyboardEvent) {
		if (isTabNext(e) && this.popupMode) {
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
				this.colorPaletteNavigationElements[0].focus();
			} else {
				this.focusColorElement(this.displayedColors[0], this._itemNavigation);
			}
		}
	}

	_onColorContainerKeyDown(e: KeyboardEvent) {
		const target = e.target as ColorPaletteItem;
		const lastElementInNavigation = this.colorPaletteNavigationElements[this.colorPaletteNavigationElements.length - 1];
		if (isTabNext(e) && this.popupMode) {
			e.preventDefault();
			this.selectColor(target);
		}

		if (isUp(e) && target === this.displayedColors[0] && this.colorPaletteNavigationElements.length > 1) {
			e.stopPropagation();
			if (this.showDefaultColor) {
				this.colorPaletteNavigationElements[0].focus();
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
				this.colorPaletteNavigationElements[0].focus();
			} else if (isRecentColorsNextElement) {
				this.focusColorElement(lastElementInNavigation, this._itemNavigationRecentColors);
			} else if (!this.showDefaultColor && this.showMoreColors) {
				this.colorPaletteNavigationElements[1].focus();
			}
		}
	}

	_onRecentColorsContainerKeyDown(e: KeyboardEvent) {
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
				this.colorPaletteNavigationElements[0].focus();
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
		const colors = this.getSlottedNodes("colors") as Array<ColorPaletteItem>;
		return colors.filter(item => item.value).slice(0, 15);
	}

	get colorContainerLabel() {
		return ColorPalette.i18nBundle.getText(COLORPALETTE_CONTAINER_LABEL as I18nText);
	}

	get colorPaleteMoreColorsText() {
		return ColorPalette.i18nBundle.getText(COLOR_PALETTE_MORE_COLORS_TEXT as I18nText);
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

	async _getDialog() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<DialogTemp>("[ui5-dialog]")!;
	}

	async getColorPicker() {
		const dialog = await this._getDialog();
		return dialog.content[0].querySelector<ColorPicker>("[ui5-color-picker]")!;
	}
}

ColorPalette.define();

export default ColorPalette;
export type { ColorPaletteItemClickEventDetail };
