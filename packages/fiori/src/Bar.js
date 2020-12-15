import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import BarTemplate from "./generated/templates/BarTemplate.lit.js";
import BarDesign from "./types/BarDesign.js";

// Styles
import BarCss from "./generated/themes/Bar.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-bar",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.Bar.prototype */ {
		/**
		 * Defines the <code>ui5-bar</code> design.
		 * <br><br>
		 * <b>Note:</b> Available options are "Header", "Subheader", "Footer", "FloatingFooter".
		 *
		 * @type {BarDesign}
		 * @defaultvalue "Header"
		 * @public
		 */
		design: {
			type: BarDesign,
			defaultValue: BarDesign.Header,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Bar.prototype */ {
		/**
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		startContent: {
			type: HTMLElement,
		},
		/**
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		middleContent: {
			type: HTMLElement,
		},
		/**
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		endContent: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Bar.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The Bar component consists of three areas to hold its content. It has the capability to center content, such as a title, while having other components on the left and right side.
 *
 * <h3>Usage</h3>
 * With the use of the design property, you can set the style of the Bar to appear designed like a Header, Subheader, Footer and FloatingFooter.
 *
 * Note: Do not place a Bar inside another Bar or inside any bar-like component. Doing so causes unpredictable behavior.
 *
 * For the <code>ui5-bar</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Bar.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Bar
 * @extends UI5Element
 * @tagname ui5-bar
 * @public
 * @since 1.0.0-rc.11
 */
class Bar extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return BarCss;
	}

	static get template() {
		return BarTemplate;
	}
}

Bar.define();

export default Bar;
