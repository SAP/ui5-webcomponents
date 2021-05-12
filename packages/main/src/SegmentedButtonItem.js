import UI5Element from "@ui5/webcomponents-base";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
// import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/src/i18nBundle.js";
import { isPhone, isTablet } from "@ui5/webcomponents-base/src/Device.js";
import { getFeature } from "@ui5/webcomponents-base/src/FeaturesRegistry.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/src/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/src/util/AriaLabelHelper.js";
import isLegacyBrowser from "@ui5/webcomponents-base/dist/isLegacyBrowser.js";
import Icon from "./Icon.js";
import Button from "./Button.js";
import SegmentedButtonItemTemplate from "./generated/templates/SegmentedButtonItemTemplate.lit.js";

// Styles
import segmentedBtnItemCss from "./generated/themes/SegemntedButtonItem.css.js";
import segmentedBtnItemIECss from "./generated/themes/SegemntedButtonItem.ie11.css.js";

let activeButton = null;

/**
 * @public
 */
const metadata = {
	tag: "ui5-segmentedbutton-item",
	properties: /** @lends  sap.ui.webcomponents.main.SegmentedButtonItem.prototype */ {

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
		 * <pre>ui5-button icon="palette"</pre>
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
		 * Defines the size of the icon inside the <code>ui5-button</code>.
		 *
		 * @type {string}
		 * @defaultvalue undefined
		 * @public
		 * @since 1.0.0-rc.8
		 */
		iconSize: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * When set to <code>true</code>, the <code>ui5-button</code> will
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
		 * Used to switch the active state (pressed or not) of the <code>ui5-button</code>.
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
		 * Defines the aria-label attribute for the button
		 * @type {String}
		 * @defaultvalue: ""
		 * @private
		 * @since 1.0.0-rc.7
		 */
		ariaLabel: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Receives id(or many ids) of the elements that label the button
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.7
		 */
		ariaLabelledby: {
			type: String,
			defaultValue: "",
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

		/**
		 * Determines whether the <code>ui5-segmentedbutton-item</code> is displayed as pressed.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		pressed: {
			type: Boolean,
		},

		/**
		 * Defines the index of the item inside of the SegmentedButton.
		 * @private
		 * @type {String}
		 */
		posinset: {
			type: String,
		},

		/**
		 * Defines how many items are inside of the SegmentedButton.
		 * @private
		 * @type {String}
		 */
		setsize: {
			type: String,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.SegmentedButtonItem.prototype */ {
		/**
		 * Defines the text of the <code>ui5-button</code>.
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
	events: /** @lends sap.ui.webcomponents.main.SegmentedButtonItem.prototype */ {

		/**
		 * Fired when the <code>ui5-button</code> is activated either with a
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
 *<h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-segmentedbutton-item</code> component is an enhanced <code>ui5-button</code>
 * that can be toggled between pressed and normal states.
 * Users can use the <code>ui5-segmentedbutton-item</code> as part of <code>ui5-segmentedbutton</code>.
 * <br><br>
 * Clicking or tapping on a <code>ui5-segmentedbutton-item</code> changes its state to <code>pressed</code>. The button returns to
 * its initial state when other <code>ui5-segmentedbutton-item</code> is clicked or tapped.
 * By applying additional custom CSS-styling classes, apps can give a different style to any <code>ui5-segmentedbutton-item</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/SegmentedButtonItem";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SegmentedButtonItem
 * @extends Button
 * @tagname ui5-segmentedbutton-item
 * @public
 */
class SegmentedButtonItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return SegmentedButtonItemTemplate;
	}

	static get styles() {
		return [Button.styles, segmentedBtnItemCss, isLegacyBrowser() && segmentedBtnItemIECss];
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

		// if (!isGlobalHandlerAttached) {
		// 	document.addEventListener("mouseup", this._deactivate);
		//
		// 	isGlobalHandlerAttached = true;
		// }

		// this.i18nBundle = getI18nBundle("@ui5/webcomponents");
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

		this.pressed = !this.pressed;
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

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
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

	get styles() {
		return {
			icon: {
				width: this.iconSize,
				height: this.iconSize,
			},
		};
	}

	static async onDefine() {
		// await fetchI18nBundle("@ui5/webcomponents");
	}
}

SegmentedButtonItem.define();

export default SegmentedButtonItem;
