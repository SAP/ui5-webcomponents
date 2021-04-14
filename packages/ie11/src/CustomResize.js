const INTERVAL = 300;
let sizeCheckInterval;
const observedElements = new Map();

const customObserve = (element, callback) => {
	const elementInfo = observedElements.get(element);
	const existingCallbacks = elementInfo ? elementInfo.callbacks : [];

	observedElements.set(element, {
		width: element.offsetWidth,
		height: element.offsetHeight,
		callbacks: [...existingCallbacks, callback],
	});

	if (!sizeCheckInterval) {
		sizeCheckInterval = setInterval(checkListeners, INTERVAL);
	}
};

const checkListeners = () => {
	observedElements.forEach((entry, element) => {
		const changed = entry.height !== element.offsetHeight || entry.width !== element.offsetWidth;
		const firstTime = !entry.processed;

		if (changed || firstTime) {
			entry.width = element.offsetWidth;
			entry.height = element.offsetHeight;
			entry.processed = true;
			entry.callbacks.forEach(callback => callback());
		}
	});
};

const customUnobserve = (element, callback) => {
	const elementInfo = observedElements.get(element);
	if (!elementInfo) {
		return;
	}

	const callbacks = elementInfo ? elementInfo.callbacks : [];
	const filteredCallbacks = callbacks.filter(fn => fn !== callback);

	if (filteredCallbacks.length === 0) {
		observedElements.delete(element);
		if (observedElements.size === 0) {
			clearInterval(sizeCheckInterval);
			sizeCheckInterval = null;
		}
	} else {
		elementInfo.callbacks = filteredCallbacks;
	}
};

export { customObserve, customUnobserve };
