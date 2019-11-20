import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import MessageToastTemplate from "./generated/templates/MessageToastTemplate.lit.js";
import MessageToastPlacement from "./types/MessageToastPlacement.js";

// Styles
import MessageToastCss from "./generated/themes/MessageToast.css.js";

const metadata = {
	tag: "ui5-message-toast",
	properties: {

		/**
		 * Defines the duration which MessageToast will stay on screen before closing in milliseconds.
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
		 * Indicates if the elements is on focus
		 * @private
		 */
		opened: {
			type: Boolean,
		},
	},
	events: {

		/**
		 * Fired after the component is opened.
		 *
		 * @public
		 * @event
		 */
		afterOpen: {},

		/**
		 * Fired after the MessageToast is closed.
		 *
		 * @public
		 * @event
		 */
		afterClose: {},
	},
};

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
		this._bIsInitialRendering = true;
		this._iClassAdditionDelay = 50;
	}

	onAfterRendering() {
		if (this._bIsInitialRendering) {
			this._oRootDomRef = this.getDomRef().querySelector(".ui5-message-toast-root");
			// The transition should be a third of the duration
			this._oRootDomRef.style["transition-duration"] = `${this.duration / 3}ms`;
			// The delay should be two thirds of the duration
			this._oRootDomRef.style["transition-delay"] = `${(this.duration * 2) / 3}ms`;
			this._bIsInitialRendering = false;
			this._addTransitionCSSClass();
		}

		this.fireEvent("afterOpen", { });
	}

	open() {
		this.opened = true;
		this._stopCloseTimeout();
		this._startCloseTimeout();

		if (!this._bIsInitialRendering) {
			this._removeTransitionCSSClass();
			this._addTransitionCSSClass();
		}
	}

	_startCloseTimeout() {
		this._oCloseTimout = setTimeout(() => {
			this._close();
		}, this.duration);
	}

	_stopCloseTimeout() {
		if (this._oCloseTimout) {
			clearInterval(this._oCloseTimout);
			this._oCloseTimout = null;
		}
	}

	_addTransitionCSSClass() {
		// We add the opacity (animating) class after a delay, in
		// order to give time for the browser to remove the class first
		setTimeout(() => {
			this._oRootDomRef.classList.add("opacityTranslate");
		}, this._iClassAdditionDelay);
	}

	_removeTransitionCSSClass() {
		this._oRootDomRef.classList.remove("opacityTranslate");
	}

	_close() {
		if (!this.opened) {
			return;
		}

		this.opened = false;

		this._stopCloseTimeout();
		this._removeTransitionCSSClass();

		RenderScheduler.whenFinished().then(_ => {
			this.fireEvent("afterClose", { });
		});
	}
}

MessageToast.define();

export default MessageToast;
