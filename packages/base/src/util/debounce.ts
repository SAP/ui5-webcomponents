/**
 * Delays function execution by given threshold.
 * @param fn {Function}
 * @param delay {Integer}
 */
let debounceInterval: ReturnType<typeof setTimeout> | null = null;

const debounce = (fn: Function, delay: number) => {
	debounceInterval && clearTimeout(debounceInterval);
	debounceInterval = setTimeout(() => {
		debounceInterval = null;
		fn();
	}, delay);
};

export default debounce;
