/**
 * Delays function execution by given threshold.
 * @param fn {Function}
 * @param delay {Integer}
 */
let debounceInterval: NodeJS.Timeout | null = null;

const debounce = (fn: Function, delay: number) => {
	clearTimeout(debounceInterval as NodeJS.Timeout);
	debounceInterval = setTimeout(() => {
		debounceInterval = null;
		fn();
	}, delay);
};

export default debounce;
