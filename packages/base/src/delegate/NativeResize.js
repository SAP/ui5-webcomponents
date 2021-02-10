class NativeResize {
	static initialize() {
		NativeResize.resizeObserver = new window.ResizeObserver(entries => {
			// call attached callbacks
			entries.forEach(entry => {
				const callbacks = NativeResize.observedObjects.get(entry.target);

				callbacks.forEach(el => el());
			});
		});

		NativeResize.observedObjects = new Map();
	}

	static attachListener(ref, callback) {
		const observedDOMs = NativeResize.observedObjects;
		const callbacks = observedDOMs.get(ref) || [];

		// if no callbacks has been added for this ref - start observing it
		if (!callbacks.length) {
			NativeResize.resizeObserver.observe(ref);
		}

		// save the callbacks in an array
		observedDOMs.set(ref, [...callbacks, callback]);
	}

	static detachListener(ref, callback) {
		const callbacks = NativeResize.observedObjects.get(ref) || [];
		const filteredCallbacks = callbacks.filter(fn => fn !== callback);

		if (!callbacks.length || (callbacks.length === filteredCallbacks.length && callbacks.length !== 0)) {
			return;
		}

		NativeResize.observedObjects.set(ref, filteredCallbacks);

		if (!filteredCallbacks.length) {
			NativeResize.resizeObserver.unobserve(ref);
			NativeResize.observedObjects.delete(ref);
		}
	}
}

export default NativeResize;
