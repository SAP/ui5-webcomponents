import { registerFeature } from "../FeaturesRegistry.js";

const getBusyStyles = () => {
	const busyStyles = `
	.busy-indicator-wrapper {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.busy-indicator-overlay {
		display: var(--ui5_web_components_busy_indicator_display);
		position: absolute;
		inset: 0;
		background: var(--ui5_web_components_busy_indicator_background-color);
		z-index: 99;
	}

	.busy-indicator-busy-area {
		display: var(--ui5_web_components_busy_indicator_display);
		position: absolute;
		z-index: 99;
		inset: 0;
		justify-content: center;
		align-items: center;
		background-color: inherit;
		flex-direction: column;
		color: var(--_ui5_busy_indicator_color);
	}

	:host([__is-busy]) .busy-indicator-wrapper > :nth-child(2) {
		--ui5_web_components_busy_indicator_display: none;
	}

	.busy-indicator-busy-area:focus {
		outline: var(--_ui5_busy_indicator_focus_outline);
		outline-offset: -.125rem;
	}

	.busy-indicator-circle {
		width: 1rem;
		height: 1rem;
		display: inline-block;
		background-color: currentColor;
		border-radius: 50%;
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

const setBusyLit = (html, host, templateResult, forStaticArea) => {
	if (host.isOpenUI5Component && host.__isBusy && !forStaticArea) {
		templateResult = html`
		<style>${getBusyStyles()}</style>
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
};

registerFeature("OpenUI5Enablement", OpenUI5Enablement);
