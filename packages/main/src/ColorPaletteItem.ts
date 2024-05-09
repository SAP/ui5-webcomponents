import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import type { IColorPaletteItem } from "./ColorPalette.js";
import ColorPaletteItemTemplate from "./generated/templates/ColorPaletteItemTemplate.lit.js";
import {
	COLORPALETTE_COLOR_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ColorPaletteItemCss from "./generated/themes/ColorPaletteItem.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-color-palette-item` component represents a color in the the `ui5-color-palette`.
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.12
 * @implements { IColorPaletteItem }
 * @public
 */
@customElement({
	tag: "ui5-color-palette-item",
	renderer: litRender,
	styles: ColorPaletteItemCss,
	template: ColorPaletteItemTemplate,
})
class ColorPaletteItem extends UI5Element implements IColorPaletteItem {
	/**
	 * Defines the colour of the component.
	 *
	 * **Note:** The value should be a valid CSS color.
	 * @default undefined
	 * @public
	 */
	@property({ validator: CSSColor })
	value?: string;

	/**
	 * Defines if the component is selected.
	 *
	 * **Note:** Only one item must be selected per <code>ui5-color-palette</code>.
	 * If more than one item is defined as selected, the last one would be considered as the selected one.
	 *
	 * @public
	 * @default false
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines the tab-index of the element, helper information for the ItemNavigation.
	 * @private
	 */
	@property({ defaultValue: "-1", noAttribute: true })
	forcedTabIndex!: string;

	/**
	 * Defines the index of the item inside of the ColorPalette.
	 * @private
	 */
	@property({ validator: Integer })
	index?: number;

	/**
	 * Defines if the ColorPalette is on phone mode.
	 * @private
	 */
	@property({ type: Boolean })
	onPhone!: boolean;

	/**
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	_disabled!: boolean;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		ColorPaletteItem.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
	}

	onBeforeRendering() {
		this._disabled = !this.value;
		this.onPhone = isPhone();
		this.setAttribute("style", `background-color: ${this.value}`);
	}

	get colorLabel() {
		return ColorPaletteItem.i18nBundle.getText(COLORPALETTE_COLOR_LABEL);
	}

	get styles() {
		return {
			root: {
				"background-color": this.value,
			},
		};
	}

	get classes() {
		return {
			root: {
				"ui5-cp-item": true,
			},
		};
	}
}

ColorPaletteItem.define();

export default ColorPaletteItem;
