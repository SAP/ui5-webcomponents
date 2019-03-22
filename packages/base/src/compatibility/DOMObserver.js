// Shorthands
const w = window;

// Map of observer objects per dom node
const observers = new WeakMap();

/**
 * Implements universal DOM node observation methods.
 */
class DOMObserver {
	constructor() {
		throw new Error("Static class");
	}

	/**
	 * This function abstracts out mutation observer usage inside shadow DOM.
	 * For native shadow DOM the native mutation observer is used.
	 * When the polyfill is used, the observeChildren ShadyDOM method is used instead.
	 *
	 * @throws Exception
	 * Note: does not allow several mutation observers per node. If there is a valid use-case, this behavior can be changed.
	 *
	 * @param node
	 * @param callback
	 * @param options - Only used for the native mutation observer
	 */
	static observeDOMNode(node, callback, options) {
		let observerObject = observers.get(node);
		if (observerObject) {
			throw new Error("A mutation/ShadyDOM observer is already assigned to this node.");
		}

		if (w.ShadyDOM) {
			observerObject = w.ShadyDOM.observeChildren(node, callback);
		} else {
			observerObject = new MutationObserver(callback);
			observerObject.observe(node, options);
		}

		observers.set(node, observerObject);
	}

	/**
	 * De-registers the mutation observer, depending on its type
	 * @param node
	 */
	static unobserveDOMNode(node) {
		const observerObject = observers.get(node);
		if (!observerObject) {
			return;
		}

		if (observerObject instanceof MutationObserver) {
			observerObject.disconnect();
		} else {
			w.ShadyDOM.unobserveChildren(observerObject);
		}
		observers.delete(node);
	}
}

export default DOMObserver;
