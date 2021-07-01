import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import ColorPaletteItemTemplate from "./generated/templates/ColorPaletteItemTemplate.lit.js";
import {
	COLORPALETTE_COLOR_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ColorPaletteItemCss from "./generated/themes/ColorPaletteItem.css.js";

/**
* @public
*/
const metadata = {
	tag: "ui5-color-palette-item",
	managedSlots: true,
	properties: /** @lends  sap.ui.webcomponents.main.ColorPaletteItem.prototype */ {
		/**
		 * Defines the colour of the component.
		 * <br><br>
		 * <b>Note:</b> The value should be a valid CSS color.
		 *
		 * @type {CSSColor}
		 * @public
		 */
		value: {
			type: CSSColor,
		},

		/**
		 * Defines the tab-index of the element, helper information for the ItemNavigation.
		 * @private
		 */
		_tabIndex: {
			type: String,
			defaultValue: "-1",
			noAttribute: true,
		},

		/**
		 * Defines the index of the item inside of the ColorPalette.
		 * @private
		 * @type {String}
		 */
		index: {
			type: String,
		},

		/**
		 * @private
		 * @type {boolean}
		 * @since 1.0.0-rc.15
		 */
		_disabled: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.ColorPaletteItem.prototype */ {
	},
	events: /** @lends sap.ui.webcomponents.main.ColorPaletteItem.prototype */ {
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-color-palette-item</code> component represents a color in the the <code>ui5-color-palette</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ColorPaletteItem
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-color-palette-item
 * @since 1.0.0-rc.12
 * @implements sap.ui.webcomponents.main.IColorPaletteItem
 * @public
 */
class ColorPaletteItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

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
		await fetchI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		this._disabled = !this.value;
	}

	get colorLabel() {
		return this.i18nBundle.getText(COLORPALETTE_COLOR_LABEL);
	}
}

ColorPaletteItem.define();

export default ColorPaletteItem;
