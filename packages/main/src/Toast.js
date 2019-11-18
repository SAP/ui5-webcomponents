import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

// Template
import ToastTemplate from "./generated/templates/ToastTemplate.lit.js";

// Styles
import toastCss from "./generated/themes/Toast.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-toast",
	properties: /** @lends sap.ui.webcomponents.main.Title.prototype */ {
		opened: {
			type: Boolean,
		},
		animating: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Title.prototype */ {
	},
};

/**
 * @class
 */
class Toast extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return ToastTemplate;
	}

	static get styles() {
		return toastCss;
	}

	onBeforeRendering() {
	}

	onAfterRendering() {
		if (this._reopen) {
			requestAnimationFrame(_ => {
				this.opened = true;
				this._reopen = false;
				// console.log("restart");
			});
		}

		if (this.getAttribute("opened") === "") {
			// console.log("attr added");
		} else {
			// console.log("attr removed");
		}
	}

	_ontransitionstart() {
		// console.log("Animation started");
	}

	_ontransitionend() {
		// console.log("Animation ended");
		this.opened = false;
	}

	show() {
		if (this.opened) {
			this._reopen = true;
			this.opened = false;
		} else {
			this.opened = true;
		}
	}
}

Toast.define();

export default Toast;
