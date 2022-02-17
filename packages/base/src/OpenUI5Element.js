import UI5Element from "./UI5Element.js";
import {
	isTabPrevious,
} from "./Keys.js";

const metadata = {
	properties: /** @lends sap.ui.webcomponents.main.Button.prototype */ {
		__isBusy: {
			type: Boolean,
		},
	},
};
class OpenUI5Element extends UI5Element {
	constructor() {
		super();

		this.__redirectFocus = true;
	}

	static get metadata() {
		return metadata;
	}

	get isOpenUI5Component() {
		return true;
	}

	get __isComponentBusy() {
		return this.__isBusy;
	}

	__suppressFocusIn() {
		const busyIndicator = this.shadowRoot.querySelector("[busy-indicator]");

		if (busyIndicator && this.__redirectFocus) {
			busyIndicator.focus();
		}
	}

	get __suppressFocusBack() {
		return {
			handleEvent: e => {
				if (isTabPrevious(e)) {
					const beforeElem = this.shadowRoot.querySelector("[busy-indicator-before-span]");

					this.__redirectFocus = false;
					beforeElem.focus();
					this.__redirectFocus = true;
				}
			},
			capture: true,
			passive: false,
		};
	}
}

export default OpenUI5Element;
