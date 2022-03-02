import merge from "./thirdparty/merge.js";
import {
	isTabPrevious,
} from "./Keys.js";

const busyIndicatorMetadata = {
	properties: {
		__isBusy: {
			type: Boolean,
		},
	},
};

const enrichMetadata = UI5Element => {
	UI5Element.metadata = merge(UI5Element.metadata, busyIndicatorMetadata);
};

const enrichMethods = UI5ElementPrototype => {
	Object.defineProperties(UI5ElementPrototype, {
		"__redirectFocus": { value: true, writable: true },
		"__suppressFocusBack": {
			get: function () { // eslint-disable-line
				return {
					handleEvent: function handleFocusOut(e) {
						if (isTabPrevious(e)) {
							const beforeElem = this.shadowRoot.querySelector("[busy-indicator-before-span]");
							this.__redirectFocus = false;
							beforeElem.focus();
							this.__redirectFocus = true;
						}
					}.bind(this),
					capture: true,
					passive: false,
				};
			},
		},
		"isOpenUI5Component": { get: () => { return true; } },
	});

	UI5ElementPrototype.__suppressFocusIn = function handleFocusIn() {
		const busyIndicator = this.shadowRoot.querySelector("[busy-indicator]");
		if (busyIndicator && this.__redirectFocus) {
			busyIndicator.focus();
		}
	};
};

const enrich = UI5Element => {
	enrichMetadata(UI5Element);
	enrichMethods(UI5Element.prototype);
};

export default { enrich };
