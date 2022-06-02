import animate from "./animate.js";
import animationConfig from "./config.js";

export default ({
	element = animationConfig.element,
	duration = animationConfig.duration,
	progress: progressCallback = animationConfig.identity,
	dx = 0,
	dy = 0,
}) => {
	let scrollLeft;
	let scrollTop;

	return animate({
		beforeStart: () => {
			scrollLeft = element.scrollLeft;
			scrollTop = element.scrollTop;
		},
		duration,
		element,
		progress: progress => {
			progressCallback(progress);

			element.scrollLeft = scrollLeft + (progress * dx); // easing - linear
			element.scrollTop = scrollTop + (progress * dy); // easing - linear
		},
	});
};
