import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";

// Template
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import SwitchRenderer from "./build/compiled/SwitchRenderer.lit";
import SwitchTemplateContext from "./SwitchTemplateContext";
import SwitchType from "./types/SwitchType";

// Styles
import belize from "./themes/sap_belize/Switch.less";
import belizeHcb from "./themes/sap_belize_hcb/Switch.less";
import fiori3 from "./themes/sap_fiori_3/Switch.less";

ShadowDOM.registerStyle("sap_belize", "Switch.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "Switch.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "Switch.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-switch",
	styleUrl: ["Switch.css"],
	properties: /** @lends sap.ui.webcomponents.main.Switch.prototype */ {

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
		 * Defines if the <code>ui5-switch</code> is checked.
		 * <br><br>
		 * <b>Note:</b> The property can be changed with user interaction,
		 * either by cliking/tapping on the <code>ui5-switch</code>, or by
		 * pressing the Enter or Space key.
		 *
		 * @type {boolean}
		 * @default false
		 * @public
		 */
		checked: {
			type: Boolean,
		},

		/**
		 * Defines the text of the <code>ui5-switch</code> when switched on.
		 *
		 * <br><br>
		 * <b>Note:</b> Up to 3 letters will be displayed properly. Larger texts might be cut off.
		 * @type {string}
		 * @public
		 */
		textOn: {
			defaultValue: "",
			type: String,
		},

		/**
		 * Defines the text of the <code>ui5-switch</code> when switched off.
		 *
		 * <br><br>
		 * <b>Note:</b> Up to 3 letters will be displayed properly. Larger texts might be cut off.
		 * @type {string}
		 * @public
		 */
		textOff: {
			defaultValue: "",
			type: String,
		},

		/**
		 * Defines the <code>ui5-switch</code> type.
		 * <br>
		 * Available options are <code>Standard</code> and <code>Semantic</code>.
		 *
		 * <br><br>
		 * <b>Note:</b> If <code>Semantic</code> type is set,
		 * positive and negative icons will replace the <code>textOn</code> and <code>textOff</code>.
		 * @type {string}
		 * @default Standard
		 * @public
		 */
		type: {
			type: String,
			defaultValue: SwitchType.Standard,
		},

		_label: {
			type: Object,
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
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Switch";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Switch
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-switch
 * @public
 */
class Switch extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return SwitchRenderer;
	}

	constructor(state) {
		super(state);
	}

	ontap() {
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
		return this;
	}

	static get calculateTemplateContext() {
		return SwitchTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	Switch.define();
});


export default Switch;
