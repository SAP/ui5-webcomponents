import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import ColorPaletteEntryTemplate from "./generated/templates/ColorPaletteEntryTemplate.lit.js";

// Styles
import ColorPaletteEntryCss from "./generated/themes/ColorPaletteEntry.css.js";

/**
* @public
*/
const metadata = {
	tag: "ui5-color-palette-entry",
	managedSlots: true,
	properties: /** @lends  sap.ui.webcomponents.main.ColorPaletteEntry.prototype */ {
		/**
		 * Defines the value of the <code>ui5-color-palette</code> inside an HTML Form element when this <code>ui5-color-palette-entry</code> is presented.
		 *
		 * @type {CSSColor}
		 * @public
		 */
		value: {
			type: CSSColor,
		},

		/**
		 * Defines the stable selector that you can use via getStableDomRef method.
		 * @public
		 */
		stableDomRef: {
			type: String,
		},

		_tabIndex: {
			type: String,
			defaultValue: "-1",
			noAttribute: true,
		},

		number: {
			type: Number,
		},
	},
	slots: {
	},
	events: /** @lends sap.ui.webcomponents.main.ColorPaletteEntry.prototype */ {},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-color-palette</code> component defines the content of an color in the <code>ui5-color-palette</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ColorPaletteEntry
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-color-palette
 * @since 1.0.0-rc.12
 * @public
 */
class ColorPaletteEntry extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ColorPaletteEntryCss;
	}

	static get template() {
		return ColorPaletteEntryTemplate;
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	get value() {
		return this.value;
	}

	get colorLabel() {
		return "color";
	}
}

ColorPaletteEntry.define();

export default ColorPaletteEntry;
