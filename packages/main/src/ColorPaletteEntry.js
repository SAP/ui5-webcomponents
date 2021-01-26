import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";

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
		 * @since 1.0.0-rc.29
		 */
		stableDomRef: {
			type: String,
		},
	},
	slots: {
		"default": {
			type: Node,
		},
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
 * @public
 */
class ColorPaletteEntry extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

ColorPaletteEntry.define();

export default ColorPaletteEntry;
