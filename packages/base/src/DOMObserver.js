const observers = new WeakMap();

class DOMObserver {
	/**
	 * @param node
	 * @param callback
	 * @param options
	 */
	static observeDOMNode(node, callback, options) {
		const observerObject = new MutationObserver(callback);
		observerObject.observe(node, options);
		observers.set(node, observerObject);
	}

	/**
	 * @param node
	 */
	static unobserveDOMNode(node) {
		const observerObject = observers.get(node);
		if (!observerObject) {
			return;
		}

		observerObject.disconnect();
		observers.delete(node);
	}
}

export default DOMObserver;
