import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import Core from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Core";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes";
import ValueState from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/ValueState";
import RadioButtonGroup from "./RadioButtonGroup";
// Template
import RadioButtonRenderer from "./build/compiled/RadioButtonRenderer.lit";
import RadioButtonTemplateContext from "./RadioButtonTemplateContext";

// Styles
import belize from "./themes/sap_belize/RadioButton.less";
import belizeHcb from "./themes/sap_belize_hcb/RadioButton.less";
import fiori3 from "./themes/sap_fiori_3/RadioButton.less";

ShadowDOM.registerStyle("sap_belize", "RadioButton.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "RadioButton.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "RadioButton.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-radiobutton",
	styleUrl: [
		"RadioButton.css",
	],
	properties: /** @lends sap.ui.webcomponents.main.RadioButton.prototype */  {

		/**
		 * Determines whether the <code>ui5-radiobutton</code> is disabled.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-radiobutton</code> is completely uninteractive.
		 *
		 * @type {boolean}
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-radiobutton</code> is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only <code>ui5-radiobutton</code> is not editable,
		 * but still provides visual feedback upon user interaction.
		 *
		 * @type {boolean}
		 * @public
		 */
		readOnly: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-radiobutton</code> is selected or not.
		 * <br><br>
		 * <b>Note:</b> The property value can be changed with user interaction,
		 * either by cliking/tapping on the <code>ui5-radiobutton</code>,
		 * or by using the Space or Enter key.
		 *
		 * @type {boolean}
		 * @public
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Defines the text of the <code>ui5-radiobutton</code>.
		 *
		 * @type  {string}
		 * @public
		 */
		text: {
			defaultValue: null,
			type: String,
		},

		/**
		 * Defines the value state of the <code>ui5-radiobutton</code>.
		 * Available options are <code>Warning</code>, <code>Error</code>, and
		 * <code>None</code> (by default).
		 * <br><br>
		 * <b>Note:</b> Using the value states affects the visual appearance of
		 * the <code>ui5-radiobutton</code>.
		 *
		 * @type {string}
		 * @public
		 */
		valueState: {
			defaultValue: ValueState.None,
			type: ValueState,
		},

		/**
		 * Defines the group to which the <code>ui5-radiobutton</code> belongs.
		 *
		 * @type {string}
		 * @public
		 */
		group: {
			defaultValue: "",
			type: String,
		},

		_label: {
			type: Object,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.RadioButton.prototype */ {

		/**
		 * Fired when the <code>ui5-radiobutton</code> selected state changes.
		 *
		 * @event
		 * @public
		 */
		select: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-radibutton</code> component enables users to select a single option from a set of options.
 * When a <code>ui5-radiobutton</code> is selected by the user, the
 * <code>select</code> event is fired.
 * When a <code>ui5-radiobutton</code> that is within a group is selected, the one
 * that was previously selected gets
 * automatically deselected.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/RadioButton";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.RadioButton
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-radiobutton
 * @public
 */
class RadioButton extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return RadioButtonRenderer;
	}

	constructor(state) {
		super(state);
		this._label = {};
	}

	onBeforeRendering() {
		this.syncLabel();
		this.syncGroup();
		this.tabIndex = this.getAttribute("tabindex");
	}

	syncLabel() {
		this._label = Object.assign({}, this._label);
		this._label.text = this.text;
	}

	syncGroup() {
		const oldGroup = this._group;
		const currentGroup = this.group;

		if (currentGroup === oldGroup) {
			return;
		}

		if (oldGroup) {
			// remove the control from the previous group
			RadioButtonGroup.removeFromGroup(this, oldGroup);
		}

		if (currentGroup) {
			// add the control to the existing group
			RadioButtonGroup.addToGroup(this, currentGroup);
		}

		this._group = this.group;
	}

	ontap() {
		return this.toggle();
	}

	onsapdown(event) {
		const currentGroup = this.group;

		if (!currentGroup) {
			return;
		}

		event.preventDefault();
		RadioButtonGroup.selectNextItem(this, currentGroup);
	}

	onsapup(event) {
		const currentGroup = this.group;

		if (!currentGroup) {
			return;
		}

		event.preventDefault();
		RadioButtonGroup.selectPreviousItem(this, currentGroup);
	}

	onsapleft(event) {
		this.onsapup(event);
	}

	onsapright(event) {
		this.onsapdown(event);
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
		if (!this.canToggle()) {
			return this;
		}

		if (!this.group) {
			this.selected = !this.selected;
			this.fireEvent("select");
			return this;
		}

		RadioButtonGroup.selectItem(this, this.group);
		return this;
	}

	canToggle() {
		return !(this.disabled || this.readOnly || this.selected);
	}

	static get calculateTemplateContext() {
		return RadioButtonTemplateContext.calculate;
	}
}

Core.boot().then(_ => {
	RadioButton.define();
});

export default RadioButton;
