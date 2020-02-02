import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";

// Template
import SegmentedButtonTemplate from "./generated/templates/SegmentedButtonTemplate.lit.js";

// Styles
import SegmentedButtonCss from "./generated/themes/SegmentedButton.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-segmentedbutton",
	properties: /** @lends sap.ui.webcomponents.main.SegmentedButton.prototype */  {},
	slots: /** @lends sap.ui.webcomponents.main.SegmentedButton.prototype */ {

		/**
		 * Defines the buttons of <code>ui5-segmentedbutton</code>.
		 * <br><br>
		 * <b>Note:</b> Multiple buttons are allowed.
		 * <br><br>
		 * <b>Note:</b> Use the <code>ui5-togglebutton</code> for the intended design.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "buttons",
			type: HTMLElement,
			individualSlots: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.SegmentedButton.prototype */ {

		/**
		 * Fired when the pressed button changes.
		 *
		 * @event
		 * @param {HTMLElement} pressedButton the pressed button.
		 * @public
		 */
		pressChange: {
			detail: {
				pressedButton: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>SegmentedButton</code> shows a group of buttons. When the user clicks or taps
 * one of the buttons, it stays in a pressed state. It automatically resizes the buttons
 * to fit proportionally within the control. When no width is set, the control uses the available width.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/SegmentedButton";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SegmentedButton
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-segmentedbutton
 * @public
 */
class SegmentedButton extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return SegmentedButtonTemplate;
	}

	static get styles() {
		return SegmentedButtonCss;
	}

	onEnterDOM() {
		this._handleResizeBound = this._handleResize.bind(this);

		ResizeHandler.register(document.body, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(document.body, this._handleResizeBound);
	}

	onBeforeRendering() {
		this.syncSelection();
	}

	async onAfterRendering() {
		await Promise.all(this.buttons.map(button => button._waitForDomRef));
		this.widths = this.buttons.map(button => button.offsetWidth);
	}

	syncSelection() {
		this._pressedButton = this.buttons.filter(button => button.pressed).pop();

		if (this._pressedButton) {
			this.buttons.forEach(button => {
				button.pressed = false;
			});
			this._pressedButton.pressed = true;
		}
	}

	_onclick(event) {
		return this.toggle(event);
	}

	toggle(event) {
		if (event.target !== this.pressedButton) {
			if (this._pressedButton) {
				this._pressedButton.pressed = false;
			}
			this._pressedButton = event.target;
			this.fireEvent("pressChange", {
				pressedButton: this._pressedButton,
			});
		}
		event.target.pressed = true;

		return this;
	}

	get pressedButton() {
		return this._pressedButton;
	}

	_handleResize() {
		const documentWidth = document.body.clientWidth;

		this.style.width = `${Math.max(...this.widths) * this.buttons.length}px`;
		this.buttons.forEach(button => {
			button.style.width = "100%";
		});

		if (documentWidth <= this.offsetWidth) {
			this.style.width = "100%";
		}
	}
}

SegmentedButton.define();

export default SegmentedButton;
