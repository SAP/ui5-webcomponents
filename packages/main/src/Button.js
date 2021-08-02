import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import isLegacyBrowser from "@ui5/webcomponents-base/dist/isLegacyBrowser.js";
import { isPhone, isTablet } from "@ui5/webcomponents-base/dist/Device.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonTemplate from "./generated/templates/ButtonTemplate.lit.js";
import Icon from "./Icon.js";

import { BUTTON_ARIA_TYPE_ACCEPT, BUTTON_ARIA_TYPE_REJECT, BUTTON_ARIA_TYPE_EMPHASIZED } from "./generated/i18n/i18n-defaults.js";

// Styles
import buttonCss from "./generated/themes/Button.css.js";
import buttonIECss from "./generated/themes/Button.ie11.css.js";

let isGlobalHandlerAttached = false;
let activeButton = null;

/**
 * @public
 */
const metadata = {
	tag: "ui5-button",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.Button.prototype */ {

		/**
		 * Defines the component design.
		 *
		 * <br><br>
		 * <b>Note:</b>
		 *
		 * <ul>
		 * <li><code>Default</code></li>
		 * <li><code>Emphasized</code></li>
		 * <li><code>Positive</code></li>
		 * <li><code>Negative</code></li>
		 * <li><code>Transparent</code></li>
		 * <li><code>Attention</code></li>
		 * </ul>
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
		 * Defines whether the component is disabled
		 * (default is set to <code>false</code>).
		 * A disabled component can't be pressed or
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
		 * Defines the icon to be displayed as graphical element within the component.
		 * The SAP-icons font provides numerous options.
		 * <br><br>
		 * Example:
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
		 * Defines whether the icon should be displayed after the component text.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		iconEnd: {
			type: Boolean,
		},

		/**
		 * When set to <code>true</code>, the component will
		 * automatically submit the nearest form element upon <code>press</code>.
		 * <br><br>
		 * <b>Important:</b> For the <code>submits</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		submits: {
			type: Boolean,
		},

		/**
		 * Defines the tooltip of the button.
		 * <br>
		 * <b>Important:</b> Tooltips should only be set to icon only buttons.
		 * @type {string}
		 * @defaultvalue: ""
		 * @private
		 * @since 1.0.0-rc.11
		 */
		title: {
			type: String,
		},

		/**
		 * Used to switch the active state (pressed or not) of the component.
		 * @private
		 */
		active: {
			type: Boolean,
		},

		/**
		 * Defines if a content has been added to the default slot
		 * @private
		 */
		iconOnly: {
			type: Boolean,
		},

		/**
		 * Indicates if the elements is on focus
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		/**
		 * Indicates if the elements has a slotted icon
		 * @private
		 */
		hasIcon: {
			type: Boolean,
		},

		/**
		 * Sets the accessible aria name of the component.
		 *
		 * @type {String}
		 * @defaultvalue: ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleName: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaExpanded: {
			type: String,
		},

		/**
		 * Indicates if the element if focusable
		 * @private
		 */
		nonInteractive: {
			type: Boolean,
		},

		_iconSettings: {
			type: Object,
		},

		_buttonAccInfo: {
			type: Object,
		},

		/**
		 * Defines the tabIndex of the component.
		 * @private
		 */
		_tabIndex: {
			type: String,
			defaultValue: "0",
			noAttribute: true,
		},

		/**
		 * @since 1.0.0-rc.13
		 * @private
		 */
		_isTouch: {
			type: Boolean,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Button.prototype */ {
		/**
		 * Defines the text of the component.
		 * <br><br>
		 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Button.prototype */ {

		/**
		 * Fired when the component is activated either with a
		 * mouse/tap or by using the Enter or Space key.
		 * <br><br>
		 * <b>Note:</b> The event will not be fired if the <code>disabled</code>
		 * property is set to <code>true</code>.
		 *
		 * @event
		 * @public
		 * @native
		 */
		click: {},
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
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-button</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>button - Used to style the native button element</li>
 * </ul>
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
 * @implements sap.ui.webcomponents.main.IButton
 * @public
 */
class Button extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return [buttonCss, isLegacyBrowser() && buttonIECss];
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return ButtonTemplate;
	}

	static get dependencies() {
		return [Icon];
	}

	constructor() {
		super();

		this._deactivate = () => {
			if (activeButton) {
				activeButton.active = false;
			}
		};

		if (!isGlobalHandlerAttached) {
			document.addEventListener("mouseup", this._deactivate);

			isGlobalHandlerAttached = true;
		}

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onEnterDOM() {
		this._isTouch = isPhone() || isTablet();
	}

	onBeforeRendering() {
		const FormSupport = getFeature("FormSupport");
		if (this.submits && !FormSupport) {
			console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}

		this.iconOnly = this.isIconOnly;
		this.hasIcon = !!this.icon;
	}

	_onclick(event) {
		if (this.nonInteractive) {
			return;
		}
		event.isMarked = "button";
		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.triggerFormSubmit(this);
		}
	}

	_onmousedown(event) {
		if (this.nonInteractive || this._isTouch) {
			return;
		}

		event.isMarked = "button";
		this.active = true;
		activeButton = this; // eslint-disable-line
	}

	_ontouchstart(event) {
		event.isMarked = "button";
		if (this.nonInteractive) {
			return;
		}

		this.active = true;
	}

	_ontouchend(event) {
		this.active = false;

		if (activeButton) {
			activeButton.active = false;
		}
	}

	_onmouseup(event) {
		event.isMarked = "button";
	}

	_onkeydown(event) {
		event.isMarked = "button";

		if (isSpace(event) || isEnter(event)) {
			this.active = true;
		}
	}

	_onkeyup(event) {
		if (isSpace(event) || isEnter(event)) {
			this.active = false;
		}
	}

	_onfocusout(_event) {
		if (this.nonInteractive) {
			return;
		}
		this.active = false;
		this.focused = false;
	}

	_onfocusin(event) {
		if (this.nonInteractive) {
			return;
		}

		event.isMarked = "button";
		this.focused = true;
	}

	get hasButtonType() {
		return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
	}

	get isIconOnly() {
		return !Array.from(this.childNodes).filter(node => {
			return node.nodeType !== Node.COMMENT_NODE
			&& (node.nodeType !== Node.TEXT_NODE || node.nodeValue.trim().length !== 0);
		}).length;
	}

	get accInfo() {
		return {
			"ariaExpanded": this.ariaExpanded || (this._buttonAccInfo && this._buttonAccInfo.ariaExpanded),
			"ariaControls": this._buttonAccInfo && this._buttonAccInfo.ariaControls,
			"ariaHaspopup": this._buttonAccInfo && this._buttonAccInfo.ariaHaspopup,
			"title": this.title || (this._buttonAccInfo && this._buttonAccInfo.title),
		};
	}

	static typeTextMappings() {
		return {
			"Positive": BUTTON_ARIA_TYPE_ACCEPT,
			"Negative": BUTTON_ARIA_TYPE_REJECT,
			"Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED,
		};
	}

	get buttonTypeText() {
		return this.i18nBundle.getText(Button.typeTextMappings()[this.design]);
	}

	get tabIndexValue() {
		const tabindex = this.getAttribute("tabindex");

		if (tabindex) {
			return tabindex;
		}

		return this.nonInteractive ? "-1" : this._tabIndex;
	}

	get showIconTooltip() {
		return this.iconOnly && !this.title;
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

Button.define();

export default Button;
