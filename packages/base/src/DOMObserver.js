const observers = new WeakMap();

/**
 * @param node
 * @param callback
 * @param options
 */
const observeDOMNode = (node, callback, options) => {
	const observerObject = new MutationObserver(callback);
	observerObject.observe(node, options);
	observers.set(node, observerObject);
};

/**
 * @param node
 */
const unobserveDOMNode = node => {
	const observerObject = observers.get(node);
	if (observerObject) {
		observerObject.disconnect();
		observers.delete(node);
	}
};

export {
	observeDOMNode,
	unobserveDOMNode,
};
