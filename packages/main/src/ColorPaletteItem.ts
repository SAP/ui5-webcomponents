import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ColorPaletteItemTemplate from "./generated/templates/ColorPaletteItemTemplate.lit.js";
import {
	COLORPALETTE_COLOR_LABEL,
	// @ts-ignore
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
 * @tagname ui5-color-palette-item
 * @since 1.0.0-rc.12
 * @implements sap.ui.webc.main.IColorPaletteItem
 * @public
 */
@customElement("ui5-color-palette-item")
class ColorPaletteItem extends UI5Element {
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

	static get render() {
		return litRender;
	}

	static get styles() {
		return ColorPaletteItemCss;
	}

	static get template() {
		return ColorPaletteItemTemplate;
	}

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
		return ColorPaletteItem.i18nBundle.getText(COLORPALETTE_COLOR_LABEL as I18nText);
	}

	get styles() {
		return {
			root: {
				"background-color": this.value,
			},
		};
	}
}

ColorPaletteItem.define();

export default ColorPaletteItem;
