import type { Timeout } from "../types.js";

function throttle(func: () => void, delay: number): () => void {
	let lastArgs: [] | null = null; // used to ensure an explicit last call after the delay
	let throttleTimeout: Timeout | null = null;

	return function throttled(...args) {
		if (throttleTimeout) {
			lastArgs = args;
			return;
		}

		func(...args);
		throttleTimeout = setTimeout(() => {
			if (lastArgs) {
				func(...lastArgs);
				lastArgs = null;
			}
			throttleTimeout = null;
		}, delay);
	};
}

export default throttle;
