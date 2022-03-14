import { registerFeature } from "../FeaturesRegistry.js";
import BusyIndicatorStyles from "../generated/css/BusyIndicator.css.js";

const getBusyIndicatorStyles = () => {
	return BusyIndicatorStyles;
};

const setBusyLit = (html, host, templateResult, forStaticArea) => {
	if (host.isOpenUI5Component && host.__isBusy && !forStaticArea) {
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

const OpenUI5Enablement = {
	setBusyLit,
	getBusyIndicatorStyles,
};

registerFeature("OpenUI5Enablement", OpenUI5Enablement);
