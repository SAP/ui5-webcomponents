import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes";
import ValueState from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/ValueState";

// Template
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import CheckBoxRenderer from "./build/compiled/CheckBoxRenderer.lit";
import CheckBoxTemplateContext from "./CheckBoxTemplateContext";

// Styles
import belize from "./themes/sap_belize/CheckBox.less";
import belizeHcb from "./themes/sap_belize_hcb/CheckBox.less";
import fiori3 from "./themes/sap_fiori_3/CheckBox.less";

ShadowDOM.registerStyle("sap_belize", "CheckBox.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "CheckBox.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "CheckBox.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-checkbox",
	styleUrl: ["CheckBox.css"],
	properties: /** @lends sap.ui.webcomponents.main.CheckBox.prototype */ {

		/**
		 * Defines whether the <code>ui5-checkbox</code> is disabled.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-checkbox</code> is completely uninteractive.
		 *
		 * @type {boolean}
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines whether the <code>ui5-checkbox</code> is read-only.
		 * <br><br>
		 * <b>Note:</b> A red-only <code>ui5-checkbox</code> is not editable,
		 * but still provides visual feedback upon user interaction.
		 *
		 * @type {boolean}
		 * @public
		 */
		readOnly: {
			type: Boolean,
		},

		/**
		 * Defines if the <code>ui5-checkbox</code> is checked.
		 * <br><br>
		 * <b>Note:</b> The property can be changed with user interaction,
		 * either by cliking/tapping on the <code>ui5-checkbox</code>, or by
		 * pressing the Enter or Space key.
		 *
		 * @type {boolean}
		 * @public
		 */
		checked: {
			type: Boolean,
		},

		/**
		 * Defines the text of the <code>ui5-checkbox</code>.
		 *
		 * @type {string}
		 * @public
		 */
		text: {
			defaultValue: "",
			type: String,
		},

		/**
		 * Defines the value state of the <code>ui5-checkbox</code>.
		 * <br><br>
		 * <b>Note:</b> Available options are <code>Warning</code>, <code>Error</code>, and <code>None</code> (default).
		 *
		 * @type {string}
		 * @public
		 */
		valueState: {
			defaultValue: ValueState.None,
			type: ValueState,
		},

		/**
		 * Defines whether the <code>ui5-checkbox</code> text wraps when there is not enough space.
		 * <br><br>
		 * <b>Note:</b> By default, the text truncates when there is not enough space.
		 *
		 * @type {boolean}
		 * @public
		 */
		wrap: {
			type: Boolean,
		},

		_label: {
			type: Object,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.CheckBox.prototype */ {

		/**
		 * Fired when the <code>ui5-checkbox</code> checked state changes.
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
 *
 * Allows the user to set a binary value, such as true/false or yes/no for an item.
 * <br/><br/>
 * The <code>ui5-checkbox</code> component consists of a box and a label that describes its purpose.
 * If it's checked, an indicator is displayed inside the box.
 * To check/uncheck the <code>ui5-checkbox</code>, the user has to click or tap the square
 * box or its label.
 * <br/><br/>
 * Clicking or tapping toggles the <code>ui5-checkbox</code> between checked and unchecked state.
 * The <code>ui5-checkbox</code> component only has 2 states - checked and unchecked.
 *
 * <h3>Usage</h3>
 *
 * You can manually set the width of the element containing the box and the label using the <code>width</code> property.
 * If the text exceeds the available width, it is truncated.
 * The touchable area for toggling the <code>ui5-checkbox</code> ends where the text ends.
 * <br><br>
 * You can disable the <code>ui5-checkbox</code> by setting the <code>disabled</code> property to
 * <code>true</code>,
 * or use the <code>ui5-checkbox</code> in read-only mode by setting the <code>readOnly</code>
 * property to <code>true</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/CheckBox";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.CheckBox
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-checkbox
 * @public
 */
class CheckBox extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return CheckBoxRenderer;
	}

	constructor(state) {
		super(state);
		this._label = {};
	}

	onBeforeRendering() {
		this.syncLabel();
		this.tabIndex = this.getAttribute("tabindex");
	}

	syncLabel() {
		this._label = Object.assign({}, this._label);
		this._label.text = this.text;
		this._label.wrap = this.wrap;
		this._label.textDirection = this.textDirection;
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
		if (this.canToggle()) {
			this.checked = !this.checked;
			this.fireEvent("change");
		}
		return this;
	}

	canToggle() {
		return !(this.disabled || this.readOnly);
	}

	static get calculateTemplateContext() {
		return CheckBoxTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	CheckBox.define();
});


export default CheckBox;
