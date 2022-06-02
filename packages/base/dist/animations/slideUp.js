import animationConfig from "./config.js";
import animate from "./animate.js";

export default ({
	element = animationConfig.element,
	duration = animationConfig.defaultDuration,
	progress: progressCallback = animationConfig.identity,
}) => {
	// Get Computed styles
	let computedStyles,
		paddingTop,
		paddingBottom,
		marginTop,
		marginBottom,
		height;

	// Store inline styles
	let storedOverflow,
		storedPaddingTop,
		storedPaddingBottom,
		storedMarginTop,
		storedMarginBottom,
		storedHeight;

	const animation = animate({
		beforeStart: () => {
			// Get Computed styles
			computedStyles = getComputedStyle(element);
			paddingTop = parseFloat(computedStyles.paddingTop);
			paddingBottom = parseFloat(computedStyles.paddingBottom);
			marginTop = parseFloat(computedStyles.marginTop);
			marginBottom = parseFloat(computedStyles.marginBottom);
			height = parseFloat(computedStyles.height);

			// Store inline styles
			storedOverflow = element.style.overflow;
			storedPaddingTop = element.style.paddingTop;
			storedPaddingBottom = element.style.paddingBottom;
			storedMarginTop = element.style.marginTop;
			storedMarginBottom = element.style.marginBottom;
			storedHeight = element.style.height;

			element.style.overflow = "hidden";
		},
		duration,
		element,
		progress(progress) {
			progressCallback(progress);

			element.style.paddingTop = `${paddingTop - (paddingTop * progress)}px`;
			element.style.paddingBottom = `${paddingBottom - (paddingBottom * progress)}px`;
			element.style.marginTop = `${marginTop - (marginTop * progress)}px`;
			element.style.marginBottom = `${marginBottom - (marginBottom * progress)}px`;
			element.style.height = `${height - (height * progress)}px`;
		},
	});

	animation.promise().then(oReason => {
		if (!(oReason instanceof Error)) {
			element.style.overflow = storedOverflow;
			element.style.paddingTop = storedPaddingTop;
			element.style.paddingBottom = storedPaddingBottom;
			element.style.marginTop = storedMarginTop;
			element.style.marginBottom = storedMarginBottom;
			element.style.height = storedHeight;
			element.style.display = "none";
		}
	});

	return animation;
};
