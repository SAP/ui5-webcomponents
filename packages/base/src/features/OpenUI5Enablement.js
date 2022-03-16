import { registerFeature } from "../FeaturesRegistry.js";
import BusyIndicatorStyles from "../generated/css/BusyIndicator.css.js";
import merge from "../thirdparty/merge.js";
import {
	isTabPrevious,
} from "../Keys.js";

const busyIndicatorMetadata = {
	properties: {
		__isBusy: {
			type: Boolean,
		},
	},
};

const getBusyIndicatorStyles = () => {
	return BusyIndicatorStyles;
};

const wrapTemplateResultInBusyMarkup = (html, host, templateResult) => {
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
};

const enrichBusyIndicatorMetadata = UI5Element => {
	UI5Element.metadata = merge(UI5Element.metadata, busyIndicatorMetadata);
};

const enrichBusyIndicatorMethods = UI5ElementPrototype => {
	Object.defineProperties(UI5ElementPrototype, {
		"__redirectFocus": { value: true, writable: true },
		"__suppressFocusBack": {
			get() {
				const that = this;

				return {
					handleEvent: e => {
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
		const busyIndicator = this.shadowRoot.querySelector("[busy-indicator]");
		if (busyIndicator && this.__redirectFocus) {
			busyIndicator.focus();
		}
	};
};

const enrichBusyIndicatorSettings = UI5Element => {
	enrichBusyIndicatorMetadata(UI5Element);
	enrichBusyIndicatorMethods(UI5Element.prototype);
};

const OpenUI5Enablement = {
	enrichBusyIndicatorSettings,
	wrapTemplateResultInBusyMarkup,
	getBusyIndicatorStyles,
};

export default OpenUI5Enablement;

registerFeature("OpenUI5Enablement", OpenUI5Enablement);
