import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import BusyIndicatorSize from "./types/BusyIndicatorSize.js";
import Label from "./Label.js";

// Template
import BusyIndicatorTemplate from "./generated/templates/BusyIndicatorTemplate.lit.js";

import { BUSY_INDICATOR_TITLE } from "./generated/i18n/i18n-defaults.js";

// Styles
import busyIndicatorCss from "./generated/themes/BusyIndicator.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-busyindicator",
	slots: /** @lends sap.ui.webcomponents.main.BusyIndicator.prototype */ {

		/**
		 * Determines the content over which the <code>ui5-busyindicator</code> will appear.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.BusyIndicator.prototype */ {

		/**
		 * Defines text to be displayed below the busy indicator. It can be used to inform the user of the current operation.
		 * @type {String}
		 * @public
		 * @defaultvalue ""
		 * @since 1.0.0-rc.7
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the size of the <code>ui5-busyindicator</code>.
		 * <br><br>
		 * <b>Note:</b> Available options are "Small", "Medium", and "Large".
		 *
		 * @type {BusyIndicatorSize}
		 * @defaultvalue "Medium"
		 * @public
		 */
		size: { type: BusyIndicatorSize, defaultValue: BusyIndicatorSize.Medium },

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
 * For the <code>ui5-busyindicator</code> you can define the size of the indicator, as well
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
	constructor() {
		super();

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

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

	static async onDefine() {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
			Label.define(),
		]);
	}

	get ariaTitle() {
		return this.i18nBundle.getText(BUSY_INDICATOR_TITLE);
	}
}

BusyIndicator.define();

export default BusyIndicator;
