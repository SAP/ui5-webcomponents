const observers = new WeakMap<Node, MutationObserver>();

/**
 * @param node
 * @param callback
 * @param options
 */
const observeDOMNode = (node: Node, callback: MutationCallback, options?: MutationObserverInit) => {
	const observer = new MutationObserver(callback);
	observers.set(node, observer);
	observer.observe(node, options);
};

/**
 * @param node
 */
const unobserveDOMNode = (node: Node) => {
	const observer = observers.get(node);
	if (observer) {
		observer.disconnect();
		observers.delete(node);
	}
};

export {
	observeDOMNode,
	unobserveDOMNode,
};
