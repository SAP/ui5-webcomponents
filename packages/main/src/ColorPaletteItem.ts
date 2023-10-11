import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ColorPaletteItemTemplate from "./generated/templates/ColorPaletteItemTemplate.lit.js";
import {
	COLORPALETTE_COLOR_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ColorPaletteItemCss from "./generated/themes/ColorPaletteItem.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-color-palette-item</code> component represents a color in the the <code>ui5-color-palette</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ColorPaletteItem
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-color-palette-item
 * @since 1.0.0-rc.12
 * @implements sap.ui.webc.main.IColorPaletteItem
 * @public
 */
@customElement({
	tag: "ui5-color-palette-item",
	renderer: litRender,
	styles: ColorPaletteItemCss,
	template: ColorPaletteItemTemplate,
})
class ColorPaletteItem extends UI5Element implements ITabbable {
	/**
	 * Defines the colour of the component.
	 * <br><br>
	 * <b>Note:</b> The value should be a valid CSS color.
	 *
	 * @type {sap.ui.webc.base.types.CSSColor}
	 * @name sap.ui.webc.main.ColorPaletteItem.prototype.value
	 * @public
	 */
	@property({ validator: CSSColor })
	value!: string;

	/**
	 * Defines if the component is selected.
	 * <br><br>
	 * <b>Note:</b> Only one item must be selected per <code>ui5-color-palette</code>.
	 * If more than one item is defined as selected, the last one would be considered as the selected one.
	 *
	 * @public
	 * @type {boolean}
	 * @name sap.ui.webc.main.ColorPaletteItem.prototype.selected
	 * @defaultvalue false
	 * @since 1.19.0
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines the tab-index of the element, helper information for the ItemNavigation.
	 * @private
	 */
	@property({ defaultValue: "-1", noAttribute: true })
	_tabIndex!: string;

	/**
	 * Defines the index of the item inside of the ColorPalette.
	 * @private
	 * @type {Integer}
	 */
	@property({ validator: Integer })
	index?: number;

	/**
	 * Defines if the ColorPalette is on phone mode.
	 * @private
	 * @type {boolean}
	 */
	@property({ type: Boolean })
	phone!: boolean;

	/**
	 * @private
	 * @type {boolean}
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
		this.phone = isPhone();
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
				"ui5-cp-selected": this.selected,
			},
		};
	}
}

ColorPaletteItem.define();

export default ColorPaletteItem;
