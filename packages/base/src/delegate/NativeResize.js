let resizeObserver;
const observedElements = new Map();

const getResizeObserver = () => {
	if (!resizeObserver) {
		resizeObserver = new window.ResizeObserver(entries => {
			entries.forEach(entry => {
				const callbacks = observedElements.get(entry.target);
				callbacks.forEach(callback => callback());
			});
		});
	}
	return resizeObserver;
};

const nativeObserve = (element, callback) => {
	const callbacks = observedElements.get(element) || [];

	// if no callbacks have been added for this element - start observing it
	if (!callbacks.length) {
		getResizeObserver().observe(element);
	}

	// save the callbacks in an array
	observedElements.set(element, [...callbacks, callback]);
};

const nativeUnobserve = (element, callback) => {
	const callbacks = observedElements.get(element) || [];
	if (callbacks.length === 0) {
		return;
	}

	const filteredCallbacks = callbacks.filter(fn => fn !== callback);
	if (filteredCallbacks.length === 0) {
		getResizeObserver().unobserve(element);
		observedElements.delete(element);
	} else {
		observedElements.set(element, filteredCallbacks);
	}
};

export { nativeObserve, nativeUnobserve };
