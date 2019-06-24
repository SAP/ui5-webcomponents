import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import { getCompactSize } from "@ui5/webcomponents-base/src/Configuration.js";
import getEffectiveRTL from "@ui5/webcomponents-base/src/util/getEffectiveRTL.js";
import { getFeature } from "@ui5/webcomponents-base/src/FeaturesRegistry.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonTemplate from "./build/compiled/ButtonTemplate.lit.js";
import Icon from "./Icon.js";

// Styles
import buttonCss from "./themes/Button.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-button",
	properties: /** @lends sap.ui.webcomponents.main.Button.prototype */ {

		/**
		 * Defines the <code>ui5-button</code> design.
		 * </br></br>
		 * <b>Note:</b> Available options are "Default", "Emphasized", "Positive",
		 * "Negative", and "Transparent".
		 *
		 * @type {ButtonDesign}
		 * @defaultvalue "Default"
		 * @public
		 */
		design: {
			type: ButtonDesign,
			defaultValue: ButtonDesign.Default,
		},

		/**
		 * Defines whether the <code>ui5-button</code> is disabled
		 * (default is set to <code>false</code>).
		 * A disabled <code>ui5-button</code> can't be pressed or
		 * focused, and it is not in the tab chain.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the icon to be displayed as graphical element within the <code>ui5-button</code>.
		 * The SAP-icons font provides numerous options.
		 * <br><br>
		 * Example:
		 * <br>
		 * <pre>ui5-button icon="sap-icon://palette"</pre>
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines whether the icon should be displayed after the <code>ui5-button</code> text.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		iconEnd: {
			type: Boolean,
		},

		/**
		 * When set to <code>true</code>, the <code>ui5-button</code> will
		 * automatically submit the nearest form element upon <code>press</code>.
		 *
		 * <b>Important:</b> For the <code>submits</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/InputElementsFormSupport.js";</code>
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		submits: {
			type: Boolean,
		},

		/**
		 * Used to switch the active state (pressed or not) of the <code>ui5-button</code>.
		 */
		_active: {
			type: Boolean,
		},

		_iconSettings: {
			type: Object,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Button.prototype */ {
		/**
		 * Defines the text of the <code>ui5-button</code>.
		 * <br><b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		text: {
			type: Node,
			multiple: true,
		},
	},
	defaultSlot: "text",
	events: /** @lends sap.ui.webcomponents.main.Button.prototype */ {

		/**
		 * Fired when the <code>ui5-button</code> is pressed either with a
		 * click/tap or by using the Enter or Space key.
		 * <br><br>
		 * <b>Note:</b> The event will not be fired if the <code>disabled</code>
		 * property is set to <code>true</code>.
		 *
		 * @event
		 * @public
		 */
		press: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-button</code> component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the <code>ui5-button</code>, or by pressing
 * certain keyboard keys, such as Enter.
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-button</code> UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 * <br><br>
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 * <br><br>
 * You can set the <code>ui5-button</code> as enabled or disabled. An enabled
 * <code>ui5-button</code> can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled <code>ui5-button</code> appears inactive and cannot be pressed.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Button";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Button
 * @extends UI5Element
 * @tagname ui5-button
 * @public
 */
class Button extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return buttonCss;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return ButtonTemplate;
	}

	constructor() {
		super();

		this._deactivate = () => {
			if (this._active) {
				this._active = false;
			}
		};
	}

	onBeforeRendering() {
		const FormSupport = getFeature("FormSupport");
		if (this.submits && !FormSupport) {
			console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	onEnterDOM() {
		document.addEventListener("mouseup", this._deactivate);
	}

	onExitDOM() {
		document.removeEventListener("mouseup", this._deactivate);
	}

	onclick(event) {
		event.isMarked = "button";
		if (!this.disabled) {
			this.fireEvent("press", {});
			const FormSupport = getFeature("FormSupport");
			if (FormSupport) {
				FormSupport.triggerFormSubmit(this);
			}
		}
	}

	onmousedown(event) {
		event.isMarked = "button";

		if (!this.disabled) {
			this._active = true;
		}
	}

	onmouseup(event) {
		event.isMarked = "button";
	}

	onkeydown(event) {
		if (isSpace(event) || isEnter(event)) {
			this._active = true;
		}
	}

	onkeyup(event) {
		if (isSpace(event) || isEnter(event)) {
			this._active = false;
		}
	}

	onfocusout(_event) {
		this._active = false;
	}

	get classes() {
		return {
			main: {
				sapMBtn: true,
				sapMBtnActive: this._active,
				sapMBtnWithIcon: this.icon,
				sapMBtnNoText: !this.text.length,
				sapMBtnDisabled: this.disabled,
				sapMBtnIconEnd: this.iconEnd,
				[`sapMBtn${this.design}`]: true,
				sapUiSizeCompact: getCompactSize(),
			},
			icon: {
				sapWCIconInButton: true,
			},
			text: {
				sapMBtnText: true,
			},
		};
	}

	get rtl() {
		return getEffectiveRTL() ? "rtl" : undefined;
	}

	static async define(...params) {
		await Icon.define();

		super.define(...params);
	}
}

Button.define();

export default Button;
