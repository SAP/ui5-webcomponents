import { registerFeature } from "../FeaturesRegistry.js";

const getBusyStyles = () => {
	const busyStyles = `
	.ui5-busy-indicator-circles-wrapper {
		line-height: 0;
	}
	.ui5-busy-indicator-circle {
		display: inline-block;
		background-color: currentColor;
		border-radius: 50%;
	}
	.ui5-busy-indicator-overlay {
		display: var(--ui5_web_components_busy_indicator_display);
		position: absolute;
		inset: 0;
		background: rgba(247, 247, 247, 0.72);
	}
	.ui5-busy-indicator-circle::before {
		content: "";
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
	.ui5-busy-indicator-circle {
		width: 1rem;
		height: 1rem;
	}
	.ui5-busy-indicator-root {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: inherit;
	}
	.ui5-busy-indicator-busy-area {
		display: var(--ui5_web_components_busy_indicator_display);
		position: absolute;
		z-index: 99;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		justify-content: center;
		align-items: center;
		background-color: inherit;
		flex-direction: column;
	}
	.ui5-busy-indicator-busy-area:focus {
		outline: 1px dotted #000;
		outline-offset: -.125rem;
	}
	.circle-animation-0 {
		animation: grow 1.6s infinite cubic-bezier(0.32, 0.06, 0.85, 1.11);
	}
	.circle-animation-1 {
		animation: grow 1.6s infinite cubic-bezier(0.32, 0.06, 0.85, 1.11);
		animation-delay: 200ms;
	}
	.circle-animation-2 {
		animation: grow 1.6s infinite cubic-bezier(0.32, 0.06, 0.85, 1.11);
		animation-delay: 400ms;
	}
	@keyframes grow {
		0%, 50%, 100% {
			-webkit-transform: scale(0.5);
			-moz-transform: scale(0.5);
			-ms-transform: scale(0.5);
			transform: scale(0.5);
		}
		25% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}`;

	return busyStyles;
};

const setBusyLit = (html, host, templateResult) => {
	if (host.isOpenUI5Component && host.__isComponentBusy) {
		templateResult = html`
		<style>${getBusyStyles()}</style>
		<div style="position:relative; height: 100%; width: 100%;">
			<span tabindex="0" busy-indicator-before-span @focusin=${host.__suppressFocusIn}></span>
			${templateResult}
				<div class="ui5-busy-indicator-overlay" part="busy-indicator"></div>
				<div
				part="busy-indicator"
				busy-indicator
				class="ui5-busy-indicator-busy-area"
				tabindex="0"
				role="progressbar"
				@keydown=${host.__suppressFocusBack}
				aria-valuemin="0"
				aria-valuemax="100"
				aria-valuetext="Busy"
				>
					<div class="ui5-busy-indicator-circles-wrapper">
						<div class="ui5-busy-indicator-circle circle-animation-0"></div>
						<div class="ui5-busy-indicator-circle circle-animation-1"></div>
						<div class="ui5-busy-indicator-circle circle-animation-2"></div>
					</div>
				</div>
			</div>`;
	}

	return templateResult;
};

const OpenUI5Enablement = {
	setBusyLit,
};

registerFeature("OpenUI5Enablement", OpenUI5Enablement);
