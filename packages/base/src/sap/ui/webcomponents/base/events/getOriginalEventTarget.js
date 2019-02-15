const getOriginalEventTarget = function getOriginalEventTarget(event) {
	// Default - composedPath should be used (also covered by polyfill)
	if (typeof event.composedPath === "function") {
		const composedPath = event.composedPath();
		if (Array.isArray(composedPath) && composedPath.length) {
			return composedPath[0];
		}
	}

	// Fallback
	return event.target;
};

export default getOriginalEventTarget;
