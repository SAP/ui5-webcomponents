import { TemplateResult } from "lit-html";
import { registerFeature } from "../FeaturesRegistry.js";
// @ts-ignore
import BusyIndicatorStyles from "../generated/css/BusyIndicator.css.js";
import merge from "../thirdparty/merge.js";
import {
	isTabPrevious,
} from "../Keys.js";

import UI5Element from "../UI5Element.js";
import OpenUI5Element from "./OpenUI5Element.js";

const busyIndicatorMetadata = {
	properties: {
		__isBusy: {
			type: Boolean,
		},
	},
};

class OpenUI5Enablement {

	static wrapTemplateResultInBusyMarkup(html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult, host: OpenUI5Element, templateResult: TemplateResult) {
		if (host.isOpenUI5Component && host.__isBusy) {
			templateResult = html`
			<div class="busy-indicator-wrapper">
				<span tabindex="0" busy-indicator-before-span @focusin=${host.__suppressFocusIn}></span>
				${templateResult}
				<div class="busy-indicator-overlay"></div>
				<div busy-indicator
					class="busy-indicator-busy-area"
					tabindex="0"
					role="progressbar"
					@keydown=${host.__suppressFocusBack}
					aria-valuemin="0"
					aria-valuemax="100"
					aria-valuetext="Busy">
					<div>
						<div class="busy-indicator-circle circle-animation-0"></div>
						<div class="busy-indicator-circle circle-animation-1"></div>
						<div class="busy-indicator-circle circle-animation-2"></div>
					</div>
				</div>
			</div>`;
		}

		return templateResult;
	}

	static enrichBusyIndicatorSettings(element: typeof UI5Element) {
		OpenUI5Enablement.enrichBusyIndicatorMetadata(element);
		OpenUI5Enablement.enrichBusyIndicatorMethods(element.prototype);
	}

	static enrichBusyIndicatorMetadata(element: typeof UI5Element) {
		element.metadata = merge(element.metadata, busyIndicatorMetadata);
	}

	static enrichBusyIndicatorMethods(UI5ElementPrototype: typeof OpenUI5Element.prototype) {
		Object.defineProperties(UI5ElementPrototype, {
			"__redirectFocus": { value: true, writable: true },
			"__suppressFocusBack": {
				get() {
					const that = this;

					return {
						handleEvent: (e: KeyboardEvent) => {
							if (isTabPrevious(e)) {
								const beforeElem = that.shadowRoot.querySelector("[busy-indicator-before-span]");
								that.__redirectFocus = false;
								beforeElem.focus();
								that.__redirectFocus = true;
							}
						},
						capture: true,
						passive: false,
					};
				},
			},
			"isOpenUI5Component": { get: () => { return true; } },
		});

		UI5ElementPrototype.__suppressFocusIn = function handleFocusIn() {
			const busyIndicator = this.shadowRoot?.querySelector("[busy-indicator]") as HTMLElement;
			if (busyIndicator && this.__redirectFocus) {
				busyIndicator.focus();
			}
		};

		UI5ElementPrototype.getDomRef = function getDomRef() {
			// If a component set _getRealDomRef to its children, use the return value of this function
			if (typeof this._getRealDomRef === "function") {
				return this._getRealDomRef();
			}

			if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
				return;
			}

			const children = [...this.shadowRoot.children].filter(child => !["link", "style"].includes(child.localName));

			if (children.length !== 1) {
				console.warn(`The shadow DOM for ${(this.constructor as typeof UI5Element).getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`); // eslint-disable-line
			}

			if (this.__isBusy) {
				const busyDomEl = children[0].querySelector(".busy-indicator-wrapper > :not([busy-indicator-before-span]):not(.busy-indicator-overlay):not(.busy-indicator-busy-area)") as HTMLElement;
				return busyDomEl ? busyDomEl : undefined;
			}

			return children[0] as HTMLElement;
		};
	}

	static getBusyIndicatorStyles () {
		return BusyIndicatorStyles;
	}
}

registerFeature("OpenUI5Enablement", OpenUI5Enablement);

export default OpenUI5Enablement;
