// Map of observer objects per dom node
const observers = new WeakMap();

/**
 * @param node
 * @param callback
 */
const observeDOMNode = (node, callback) => {
	const observerObject = window.ShadyDOM.observeChildren(node, callback);
	observers.set(node, observerObject);
};

/**
 * @param node
 */
const unobserveDOMNode = node => {
	const observerObject = observers.get(node);
	if (observerObject) {
		window.ShadyDOM.unobserveChildren(observerObject);
		observers.delete(node);
	}
};

export {
	observeDOMNode,
	unobserveDOMNode,
};
