import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/src/events/PseudoEvents.js";

// Template
import SwitchRenderer from "./build/compiled/SwitchRenderer.lit.js";
import SwitchTemplateContext from "./SwitchTemplateContext.js";
import SwitchType from "./types/SwitchType.js";

// Styles
import switchCss from "./themes/Switch.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-switch",
	properties: /** @lends sap.ui.webcomponents.main.Switch.prototype */ {

		/**
		 * Defines if the <code>ui5-switch</code> is checked.
		 * <br><br>
		 * <b>Note:</b> The property can be changed with user interaction,
		 * either by cliking/tapping on the <code>ui5-switch</code>, or by
		 * pressing the <code>Enter</code> or <code>Space</code> key.
		 *
		 * @type {boolean}
		 * @defaultvalue false
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
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the text of the <code>ui5-switch</code> when switched on.
		 *
		 * <br><br>
		 * <b>Note:</b> We recommend using short texts, up to 3 letters (larger texts would be cut off).
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		textOn: {
			type: String,
		},

		/**
		 * Defines the text of the <code>ui5-switch</code> when switched off.
		 *
		 * <br><br>
		 * <b>Note:</b> We recommend using short texts, up to 3 letters (larger texts would be cut off).
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		textOff: {
			type: String,
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
		 * @defaultvalue "Textual"
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
 * </br>
 * The component can display texts, that will be switched, based on the component state, via the <code>textOn</code> and <code>textOff</code> properties,
 * but texts longer than 3 letters will be cuttted off.
 * </br>
 * However, users are able to customize the width of <code>ui5-switch</code> with pure CSS (&lt;ui5-switch style="width: 200px">), and set widths, depending on the texts they would use.
 * </br>
 * Note: the component would not automatically stretch to fit the whole text width.
 *
 * <h3>Keyboard Handling</h3>
 * The state can be changed by pressing the Space and Enter keys.
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

	static get styles() {
		return switchCss;
	}

	static get renderer() {
		return SwitchRenderer;
	}

	onclick(event) {
		this.toggle();
	}

	onkeydown(event) {
		if (isSpace(event)) {
			event.preventDefault();
		}

		if (isEnter(event)) {
			this.toggle();
		}
	}

	onkeyup(event) {
		if (isSpace(event)) {
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
