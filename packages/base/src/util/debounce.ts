import { Timeout } from "../types.js";

/**
 * Delays function execution by given threshold.
 * @param fn {Function}
 * @param delay {Integer}
 */
let debounceInterval: Timeout | null = null;

const debounce = (fn: () => void, delay: number) => {
	debounceInterval && clearTimeout(debounceInterval);
	debounceInterval = setTimeout(() => {
		debounceInterval = null;
		fn();
	}, delay);
};

export default debounce;
