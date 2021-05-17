const observers = new WeakMap(); // We want just one observer per node, store them here -> DOM nodes are keys

/**
 * Default implementation with MutationObserver for browsers with native support
 */
let _createObserver = (node, callback, options) => {
	const observer = new MutationObserver(callback);
	observer.observe(node, options);
	return observer;
};

/**
 * Default implementation with MutationObserver for browsers with native support
 */
let _destroyObserver = observer => {
	observer.disconnect();
};

/**
 * Allows to create an alternative DOM observer implementation
 * @param createFn
 */
const setCreateObserverCallback = createFn => {
	if (typeof createFn === "function") {
		_createObserver = createFn;
	}
};

/**
 * Allows to create an alternative DOM observer implementation
 * @param destroyFn
 */
const setDestroyObserverCallback = destroyFn => {
	if (typeof destroyFn === "function") {
		_destroyObserver = destroyFn;
	}
};

/**
 * @param node
 * @param callback
 * @param options
 */
const observeDOMNode = (node, callback, options) => {
	const observer = _createObserver(node, callback, options);
	observers.set(node, observer);
};

/**
 * @param node
 */
const unobserveDOMNode = node => {
	const observer = observers.get(node);
	if (observer) {
		_destroyObserver(observer);
		observers.delete(node);
	}
};

export {
	setCreateObserverCallback,
	setDestroyObserverCallback,
	observeDOMNode,
	unobserveDOMNode,
};
