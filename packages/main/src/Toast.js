import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import ToastTemplate from "./generated/templates/ToastTemplate.lit.js";
import ToastPlacement from "./types/ToastPlacement.js";

// Styles
import ToastCss from "./generated/themes/Toast.css.js";

// Static Constants
const MAXIMUM_ALLOWED_TRANSITION_DURATION_IN_MILLISECONDS = 1000;
const MINIMUM_ALLOWED_DURATION_IN_MILLISECONDS = 500;

/**
 * @public
 */
const metadata = {
	tag: "ui5-toast",
	properties: /** @lends sap.ui.webcomponents.main.Toast.prototype */ {

		/**
		 * Defines the duration in milliseconds for which <code>ui5-toast</code>
		 * remains on the screen before it's automatically closed.
		 * <br>
		 * <b>Note:</b> The minimum supported value is <code>500</code>.
		 * If a lower value is passed, it's forced to be <code>500</code>.
		 *
		 * @type {Integer}
		 * @defaultvalue 3000
		 * @public
		 */
		duration: {
			type: Integer,
			defaultValue: 3000,
		},

		/**
		 * Defines the placement of the <code>ui5-toast</code> web component.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>TopStart</code></li>
		 * <li><code>TopCenter</code></li>
		 * <li><code>TopEnd</code></li>
		 * <li><code>MiddleStart</code></li>
		 * <li><code>MiddleCenter</code></li>
		 * <li><code>MiddleEnd</code></li>
		 * <li><code>BottomStart</code></li>
		 * <li><code>BottomCenter</code></li>
		 * <li><code>BottomEnd</code></li>
		 * <ul>
		 *
		 * @type {string}
		 * @defaultvalue "BottomCenter"
		 * @public
		 */
		placement: {
			type: ToastPlacement,
			defaultValue: ToastPlacement.BottomCenter,
		},

		/**
		 * Indicates whether <code>ui5-toast</code> is open (visible).
		 * @type {boolean}
		 * @private
		 */
		open: {
			type: Boolean,
		},

		/**
		 * Indicates whether <code>ui5-toast</code> is hovered.
		 * @type {boolean}
		 * @private
		 */
		hover: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Toast.prototype */ {
		/**
		 * Defines the text of the <code>ui5-toast</code> web component.
		 * <br><b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-toast</code> is a small, non-disruptive popup for success or information messages that
 * disappears automatically after a few seconds.
 *
 *
 * <h3>Usage</h3>
 *
 * <h4>When to use:</h4>
 * <ul>
 * <li>You want to display a short success or information message.</li>
 * <li>You do not want to interrupt users while they are performing an action.</li>
 * <li>You want to confirm a successful action.</li>
 * </ul>
 * <h4>When not to use:</h4>
 * <ul>
 * <li>You want to display error or warning message.</li>
 * <li>You want to interrupt users while they are performing an action.</li>
 * <li>You want to make sure that users read the message before they leave the page.</li>
 * <li>You want users to be able to copy some part of the message text.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Toast";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Toast
 * @extends UI5Element
 * @tagname ui5-toast
 * @public
 * @since 1.0.0-rc.6
 */
class Toast extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ToastCss;
	}

	static get template() {
		return ToastTemplate;
	}

	static get maximumAllowedTransition() {
		return MAXIMUM_ALLOWED_TRANSITION_DURATION_IN_MILLISECONDS;
	}

	static get minimumAllowedDuration() {
		return MINIMUM_ALLOWED_DURATION_IN_MILLISECONDS;
	}

	onBeforeRendering() {
		// If the minimum duration is lower than 500ms, we force
		// it to be 500ms, as described in the documentation.
		if (this.duration < Toast.minimumAllowedDuration) {
			this.duration = Toast.minimumAllowedDuration;
		}
	}

	onAfterRendering() {
		if (this._reopen) {
			this._reopen = false;
			this._initiateOpening();
		}
	}

	/**
	 * Shows the <code>ui5-toast</code>.
	 * @public
	 */
	show() {
		if (this.open) {
			// If the Toast is already opened, we set the _reopen flag to true, in
			// order to trigger re-rendering after an animation frame
			// in the onAfterRendering hook.
			// This is needed for properly resetting the opacity transition.
			this._reopen = true;
			this.open = false;
		} else {
			this._initiateOpening();
		}
	}

	get rtl() {
		return getRTL() ? "rtl" : undefined;
	}

	get styles() {
		// Transition duration (animation) should be a third of the duration
		// property, but not bigger than the maximum allowed (1000ms).
		const transitionDuration = Math.min(this.duration / 3, Toast.maximumAllowedTransition);

		return {
			root: {
				"transition-duration": this.open ? `${transitionDuration}ms` : "",

				// Transition delay is the duration property minus the
				// transition duration (animation).
				"transition-delay": this.open ? `${this.duration - transitionDuration}ms` : "",

				// We alter the opacity property, in order to trigger transition
				"opacity": this.open && !this.hover ? "0" : "",
			},
		};
	}

	_initiateOpening() {
		requestAnimationFrame(_ => {
			this.open = true;
		});
	}

	_ontransitionend() {
		if (this.hover) {
			return;
		}
		this.open = false;
	}

	_onmouseover() {
		this.hover = true;
	}

	_onmouseleave() {
		this.hover = false;
	}
}

Toast.define();

export default Toast;
