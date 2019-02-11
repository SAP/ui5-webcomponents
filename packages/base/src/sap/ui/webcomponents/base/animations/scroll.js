import animate from './animate';
import animationConfig from './config';

export default ({
	element = animationConfig.element,
	duration = animationConfig.duration,
	progress: progressCallback = animationConfig.identity,
	dx = 0,
	dy = 0
}) => {
	let scrollLeft;
	let scrollTop;

	return animate({
		beforeStart: _ => {
			scrollLeft = element.scrollLeft;
			scrollTop = element.scrollTop;
		},
		duration: duration,
		element: element,
		progress: progress => {
			progressCallback(progress);

			element.scrollLeft = scrollLeft + (progress * dx); // easing - linear
			element.scrollTop = scrollTop + (progress * dy); // easing - linear
		}
	});
};