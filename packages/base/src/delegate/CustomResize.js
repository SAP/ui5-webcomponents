const INTERVAL = 300;

class CustomResize {
	static initialize() {
		CustomResize.initialized = false;
		CustomResize.resizeInterval = undefined;
		CustomResize.resizeListeners = new Map();
	}

	static attachListener(ref, callback) {
		const observedObject = CustomResize.resizeListeners.get(ref);
		const existingCallbacks = observedObject ? observedObject.callbacks : [];

		CustomResize.resizeListeners.set(ref, {
			width: ref ? ref.offsetWidth : 0,
			height: ref ? ref.offsetHeight : 0,
			callbacks: existingCallbacks.concat(callback),
		});

		CustomResize.initListener();
	}

	static initListener() {
		if (CustomResize.resizeListeners.size > 0 && !CustomResize.initialized) {
			CustomResize.resizeInterval = setInterval(CustomResize.checkListeners.bind(CustomResize), INTERVAL);
		}
	}

	static checkListeners() {
		CustomResize.resizeListeners.forEach((entry, ref) => {
			const changed = CustomResize.checkSizes(entry, ref);

			if (changed || (entry && !entry._hasBeenRendered)) {
				CustomResize.updateSizes(entry, ref.offsetWidth, ref.offsetHeight);
				entry.callbacks.forEach(el => el());
				entry._hasBeenRendered = true;
			}
		});
	}

	static updateSizes(sizes, newWidth, newHeight) {
		sizes.width = newWidth;
		sizes.height = newHeight;
	}

	static checkSizes(entry, ref) {
		const oldHeight = entry.height;
		const oldWidth = entry.width;
		const newHeight = ref.offsetHeight;
		const newWidth = ref.offsetWidth;

		return ((oldHeight !== newHeight) || oldWidth !== newWidth);
	}

	static detachListener(ref, callback) {
		const listenerObject = CustomResize.resizeListeners.get(ref);
		const callbacks = listenerObject ? listenerObject.callbacks : [];
		const filteredCallbacks = callbacks.filter(fn => fn !== callback);

		if (!listenerObject || (callbacks.length === filteredCallbacks.length && callbacks.length !== 0)) {
			return;
		}

		CustomResize.resizeListeners.set(ref, Object.assign(listenerObject, { callbacks: filteredCallbacks }));

		if (!filteredCallbacks.length) {
			listenerObject.callbacks = null;
			CustomResize.resizeListeners.delete(ref);
		}

		if (CustomResize.resizeListeners.size === 0) {
			CustomResize.initialized = false;
			clearInterval(CustomResize.resizeInterval);
		}
	}
}

export default CustomResize;
