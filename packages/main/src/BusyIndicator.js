import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import BusyIndicatorTemplate from "./build/compiled/BusyIndicatorTemplate.lit.js";

// Styles
import busyIndicatorCss from "./themes/BusyIndicator.css.js";


import BusyIndicatorType from "./types/BusyIndicatorType.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-busyindicator",
	properties: /** @lends sap.ui.webcomponents.main.BusyIndicator.prototype */ {
		/**
		 * Defines the size of the <code>ui5-busyindicator</code>.
		 * </br></br>
		 * <b>Note:</b> Available options are "Small", "Medium", "Large"
		 *
		 * @type {BusyIndicatorType}
		 * @defaultvalue "Large"
		 * @public
		 */
		size: { type: BusyIndicatorType, defaultValue: BusyIndicatorType.Large },

		/**
		 * Defines if the busy indicator is visible on the screen. By default it is not.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		active: { type: Boolean },
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-busyindicator</code> signals that some operation is going on and that the
 *  user must wait. It does not block the current UI screen so other operations could be
 *  triggered in parallel.
 *
 * <h3>Usage</h3>
 * For the <code>ui5-busyindicator</code> you can define the size of the indicator as well
 * as whether it is shown or hidden. In order to hide it, use the html attribute <code>hidden</code> or <code>display: none;</code>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/BusyIndicator";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.BusyIndicator
 * @extends UI5Element
 * @tagname ui5-busyindicator
 * @public
 * @since 0.12.0
 */
class BusyIndicator extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return busyIndicatorCss;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return BusyIndicatorTemplate;
	}

	get classes() {
		return {
			main: {
				"ui5-busyindicator-wrapper": true,
				[`ui5-busyindicator-${this.size.toLowerCase()}`]: true,
			},
		};
	}
}

BusyIndicator.define();

export default BusyIndicator;
