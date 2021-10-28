import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isTabNext } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
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
	tag: "ui5-busy-indicator",
	altTag: "ui5-busyindicator",
	languageAware: true,
	slots: /** @lends sap.ui.webcomponents.main.BusyIndicator.prototype */ {

		/**
		 * Determines the content over which the component will appear.
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
		 * Defines text to be displayed below the component. It can be used to inform the user of the current operation.
		 * @type {String}
		 * @public
		 * @defaultvalue ""
		 * @since 1.0.0-rc.7
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the size of the component.
		 *
		 * <br><br>
		 * <b>Note:</b>
		 *
		 * <ul>
		 * <li><code>Small</code></li>
		 * <li><code>Medium</code></li>
		 * <li><code>Large</code></li>
		 * </ul>
		 *
		 * @type {BusyIndicatorSize}
		 * @defaultvalue "Medium"
		 * @public
		 */
		size: {
			type: BusyIndicatorSize,
			defaultValue: BusyIndicatorSize.Medium,
		},

		/**
		 * Defines if the busy indicator is visible on the screen. By default it is not.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		active: {
			type: Boolean,
		},

		/**
		 * Defines the delay in milliseconds, after which the busy indicator will be visible on the screen.
		 *
		 * @type {Integer}
		 * @defaultValue 1000
		 * @public
		 */
		delay: {
			type: Integer,
			defaultValue: 1000,
		},

		/**
		 * Defines if the component is currently in busy state.
		 * @private
		 */
		_isBusy: {
			type: Boolean,
			noAttribute: true,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-busy-indicator</code> signals that some operation is going on and that the
 * user must wait. It does not block the current UI screen so other operations could be triggered in parallel.
 * It displays 3 dots and each dot expands and shrinks at a different rate, resulting in a cascading flow of animation.
 *
 * <h3>Usage</h3>
 * For the <code>ui5-busy-indicator</code> you can define the size, the text and whether it is shown or hidden.
 * In order to hide it, use the "active" property.
 * <br><br>
 * In order to show busy state over an HTML element, simply nest the HTML element in a <code>ui5-busy-indicator</code> instance.
 * <br>
 * <b>Note:</b> Since <code>ui5-busy-indicator</code> has <code>display: inline-block;</code> by default and no width of its own,
 * whenever you need to wrap a block-level element, you should set <code>display: block</code> to the busy indicator as well.
 *
 * <h4>When to use:</h4>
 * <ul>
 * <li>The user needs to be able to cancel the operation.</li>
 * <li>Only part of the application or a particular control is affected.</li>
 * </ul>
 *
 * <h4>When not to use:</h4>
 * <ul>
 * <li>The operation takes less than one second.</li>
 * <li>You need to block the screen and prevent the user from starting another activity.</li>
 * <li>Do not show multiple busy indicators at once.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/BusyIndicator";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.BusyIndicator
 * @extends UI5Element
 * @tagname ui5-busy-indicator
 * @public
 * @since 0.12.0
 */
class BusyIndicator extends UI5Element {
	constructor() {
		super();

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
		this._keydownHandler = this._handleKeydown.bind(this);
		this._preventEventHandler = this._preventEvent.bind(this);
	}

	onEnterDOM() {
		this.addEventListener("keydown", this._keydownHandler, {
			capture: true,
		});
		this.addEventListener("keyup", this._preventEventHandler, {
			capture: true,
		});
	}

	onExitDOM() {
		if (this._busyTimeoutId) {
			clearTimeout(this._busyTimeoutId);
			delete this._busyTimeoutId;
		}

		this.removeEventListener("keydown", this._keydownHandler, true);
		this.removeEventListener("keyup", this._preventEventHandler, true);
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

	static get dependencies() {
		return [Label];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	get ariaTitle() {
		return this.i18nBundle.getText(BUSY_INDICATOR_TITLE);
	}

	get labelId() {
		return this.text ? `${this._id}-label` : undefined;
	}

	get classes() {
		return {
			root: {
				"ui5-busy-indicator-root": true,
				"ui5-busy-indicator-root--ie": isIE(),
			},
		};
	}

	onBeforeRendering() {
		if (this.active) {
			if (!this._isBusy && !this._busyTimeoutId) {
				this._busyTimeoutId = setTimeout(() => {
					delete this._busyTimeoutId;
					this._isBusy = true;
				}, Math.max(0, this.delay));
			}
		} else {
			if (this._busyTimeoutId) {
				clearTimeout(this._busyTimeoutId);
				delete this._busyTimeoutId;
			}
			this._isBusy = false;
		}
	}

	_handleKeydown(event) {
		if (!this.active) {
			return;
		}

		event.stopImmediatePropagation();

		// move the focus to the last element in this DOM and let TAB continue to the next focusable element
		if (isTabNext(event)) {
			this.focusForward = true;
			this.shadowRoot.querySelector("[data-ui5-focus-redirect]").focus();
			this.focusForward = false;
		}
	}

	_preventEvent(event) {
		if (this.active) {
			event.stopImmediatePropagation();
		}
	}

	/**
	 * Moves the focus to busy area when coming with SHIFT + TAB
	 */
	_redirectFocus(event) {
		if (this.focusForward) {
			return;
		}

		event.preventDefault();
		this.shadowRoot.querySelector(".ui5-busy-indicator-busy-area").focus();
	}
}

BusyIndicator.define();

export default BusyIndicator;
