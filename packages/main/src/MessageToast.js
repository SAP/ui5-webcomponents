import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import MessageToastTemplate from "./generated/templates/MessageToastTemplate.lit.js";
import MessageToastPlacement from "./types/MessageToastPlacement.js";

// Styles
import MessageToastCss from "./generated/themes/MessageToast.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-message-toast",
	properties: /** @lends sap.ui.webcomponents.main.MessageToast.prototype */ {

		/**
		 * Defines the duration which the <code>ui5-message-toast</code> will stay on screen before closing in milliseconds.
		 *
		 * @type {number}
		 * @defaultvalue 3000
		 * @public
		 */
		duration: {
			type: Integer,
			defaultValue: 3000,
		},

		/**
		 * Defines the placement of the <code>ui5-message-toast</code>.
		 * <br><br>
		 * <b>Note:</b> Available options are <code>TopStart</code>, <code>TopCenter</code>,
		 * <code>TopEnd</code>, <code>MiddleStart</code>, <code>MiddleCenter</code>,
		 * <code>MiddleEnd</code>, <code>BottomStart</code>,
		 * <code>BottomCenter</code> and <code>BottomEnd</code>.
		 *
		 * @type {string}
		 * @defaultvalue "BottomCenter"
		 * @public
		 */
		placement: {
			type: MessageToastPlacement,
			defaultValue: MessageToastPlacement.BottomCenter,
		},

		/**
		 * Indicates if the <code>ui5-message-toast</code> is opened/visible.
		 * @type {boolean}
		 * @private
		 */
		opened: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.MessageToast.prototype */ {
		/**
		 * Defines the text of the <code>ui5-message-toast</code>.
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
	events: /** @lends sap.ui.webcomponents.main.MessageToast.prototype */ {

		/**
		 * Fired after the <code>ui5-message-toast</code> is opened.
		 *
		 * @public
		 * @event
		 */
		afterOpen: {},

		/**
		 * Fired after the <code>ui5-message-toast</code> is closed.
		 *
		 * @public
		 * @event
		 */
		afterClose: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-message-toast</code> is a small, non-disruptive popup for success or information messages that
 * disappears automatically after a few seconds.
 *
 *
 * <h3>Usage</h3>
 *
 * <h4>When to use:</h4>
 * <ul>
 * <li>You want to display a short success of information message.</li>
 * <li>You do not want to interrupt users while they are performing an action.</li>
 * <li>You want to confirm a successful action.</li>
 * </ul>
 * <h4>When not to use:</h4>
 * <ul>
 * <li>You want to display an error or warning message.</li>
 * <li>You want to interrupt users while they are performing an action.</li>
 * <li>You want to make sure that users read the message before they leave the page.</li>
 * <li>You want users to be able to copy some part of the message text.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/MessageToast";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.MessageToast
 * @extends UI5Element
 * @tagname ui5-message-toast
 * @public
 */
class MessageToast extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return MessageToastCss;
	}

	static get template() {
		return MessageToastTemplate;
	}

	constructor() {
		super();
		this._isInitialRendering = true;
		this._classAdditionDelay = 50;
	}

	onAfterRendering() {
		if (this._isInitialRendering && this._shouldAnimate()) {
			this._rootDomRef = this.getDomRef().querySelector(".ui5-message-toast-root");
			// The transition should be a third of the duration
			this._rootDomRef.style["transition-duration"] = `${this.duration / 3}ms`;
			// The delay should be two thirds of the duration
			this._rootDomRef.style["transition-delay"] = `${(this.duration * 2) / 3}ms`;
			this._addTransitionCSSClass();
		}

		this._isInitialRendering = false;
		this.fireEvent("afterOpen", { });
	}

	open() {
		this.opened = true;
		this._stopCloseTimeout();
		this._startCloseTimeout();

		if (!this._isInitialRendering && this._shouldAnimate()) {
			this._removeTransitionCSSClass();
			this._addTransitionCSSClass();
		}
	}

	get rtl() {
		return getRTL() ? "rtl" : undefined;
	}

	_shouldAnimate() {
		return getAnimationMode() !== AnimationMode.None;
	}

	_startCloseTimeout() {
		this._closeTimout = setTimeout(() => {
			this._close();
		}, this.duration);
	}

	_stopCloseTimeout() {
		if (this._closeTimout) {
			clearInterval(this._closeTimout);
			this._closeTimout = null;
		}
	}

	_addTransitionCSSClass() {
		// We add the opacity (animating) class after a delay, in
		// order to give time for the browser to remove the class first
		setTimeout(() => {
			this._rootDomRef.classList.add("opacityTranslate");
		}, this._classAdditionDelay);
	}

	_removeTransitionCSSClass() {
		this._rootDomRef.classList.remove("opacityTranslate");
	}

	_close() {
		if (!this.opened) {
			return;
		}

		this.opened = false;

		this._stopCloseTimeout();

		if (this._shouldAnimate()) {
			this._removeTransitionCSSClass();
		}

		RenderScheduler.whenFinished().then(_ => {
			this.fireEvent("afterClose", { });
		});
	}
}

MessageToast.define();

export default MessageToast;
