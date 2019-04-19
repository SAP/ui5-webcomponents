import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import { addCustomCSS } from "@ui5/webcomponents-base/src/theming/CustomStyle.js";

// Template
import SwitchRenderer from "./build/compiled/SwitchRenderer.lit.js";
import SwitchTemplateContext from "./SwitchTemplateContext.js";
import SwitchType from "./types/SwitchType.js";

// Styles
import switchCss from "./themes/Switch.css.js";

addCustomCSS("ui5-switch", "sap_fiori_3", switchCss);
addCustomCSS("ui5-switch", "sap_belize", switchCss);
addCustomCSS("ui5-switch", "sap_belize_hcb", switchCss);

/**
 * @public
 */
const metadata = {
	tag: "ui5-switch",
	styleUrl: ["Switch.css"],
	properties: /** @lends sap.ui.webcomponents.main.Switch.prototype */ {

		/**
		 * Defines if the <code>ui5-switch</code> is checked.
		 * <br><br>
		 * <b>Note:</b> The property can be changed with user interaction,
		 * either by cliking/tapping on the <code>ui5-switch</code>, or by
		 * pressing the <code>Enter</code> or <code>Space</code> key.
		 *
		 * @type {boolean}
		 * @default false
		 * @public
		 */
		checked: {
			type: Boolean,
		},

		/**
		 * Defines whether the <code>ui5-switch</code> is disabled.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-switch</code> is noninteractive.
		 *
		 * @type {boolean}
		 * @default false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the text of the <code>ui5-switch</code> when switched on.
		 *
		 * <br><br>
		 * <b>Note:</b> We recommend using short texts (up to 3 letters, because larger texts might be cut off.
		 * @type {string}
		 * @public
		 */
		textOn: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the text of the <code>ui5-switch</code> when switched off.
		 *
		 * <br><br>
		 * <b>Note:</b> We recommend using short texts (up to 3 letters, because larger texts might be cut off.
		 * @type {string}
		 * @public
		 */
		textOff: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the <code>ui5-switch</code> type.
		 * <br>
		 * Available options are <code>Textual</code> and <code>Graphical</code>.
		 *
		 * <br><br>
		 * <b>Note:</b> If <code>Graphical</code> type is set,
		 * positive and negative icons will replace the <code>textOn</code> and <code>textOff</code>.
		 * @type {string}
		 * @default Textual
		 * @public
		 */
		type: {
			type: String,
			defaultValue: SwitchType.Textual,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Switch.prototype */ {

		/**
		 * Fired when the <code>ui5-switch</code> checked state changes.
		 *
		 * @public
		 * @event
		 */
		change: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-switch</code> component is used for changing between binary states.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Switch";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Switch
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-switch
 * @public
 * @since 0.8.0
 */
class Switch extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return SwitchRenderer;
	}

	onclick(event) {
		this.toggle();
	}

	onkeydown(event) {
		if (event.keyCode === KeyCodes.SPACE) {
			event.preventDefault();
		}

		if (event.keyCode === KeyCodes.ENTER) {
			this.toggle();
		}
	}

	onkeyup(event) {
		if (event.keyCode === KeyCodes.SPACE) {
			this.toggle();
		}
	}

	toggle() {
		if (!this.disabled) {
			this.checked = !this.checked;
			this.fireEvent("change");
		}
	}

	static get calculateTemplateContext() {
		return SwitchTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	Switch.define();
});


export default Switch;
