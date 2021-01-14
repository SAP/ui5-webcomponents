// Map of observer objects per dom node
const observers = new WeakMap();

/**
 * Implements universal DOM node observation methods.
 */
class DOMObserver {
	/**
	 * @param node
	 * @param callback
	 */
	static observeDOMNode(node, callback) {
		const observerObject = window.ShadyDOM.observeChildren(node, callback);
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

		window.ShadyDOM.unobserveChildren(observerObject);
		observers.delete(node);
	}
}

export default DOMObserver;
