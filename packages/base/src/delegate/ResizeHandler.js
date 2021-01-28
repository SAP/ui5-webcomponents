import { nativeObserve, nativeUnobserve } from "./NativeResize.js";

let observe = nativeObserve;
let unobserve = nativeUnobserve;

/**
 * Set a callback to be executed whenever a DOM node needs to be observed for size change.
 * @public
 * @param callback
 */
const setResizeHandlerObserveCallback = callback => {
	observe = callback;
};

/**
 * Set a callback to be executed whenever a DOM node needs to no longer be observed for size changes
 * @public
 * @param callback
 */
const setResizeHandlerUnobserveCallback = callback => {
	unobserve = callback;
};

class ResizeHandler {
	/**
	 * @static
	 * @public
	 * @param {*} element UI5 Web Component or DOM Element to be observed
	 * @param {*} callback Callback to be executed
	 */
	static register(element, callback) {
		if (element.isUI5Element) {
			element = element.getDomRef();
		}

		if (element instanceof HTMLElement) {
			observe(element, callback);
		} else {
			console.warn("Cannot register ResizeHandler for element", element); // eslint-disable-line
		}
	}

	/**
	 * @static
	 * @public
	 * @param {*} element UI5 Web Component or DOM Element to be unobserved
	 * @param {*} callback Callback to be removed
	 */
	static deregister(element, callback) {
		if (element.isUI5Element) {
			element = element.getDomRef();
		}

		if (element instanceof HTMLElement) {
			unobserve(element, callback);
		} else {
			console.warn("Cannot deregister ResizeHandler for element", element); // eslint-disable-line
		}
	}
}

export default ResizeHandler;
export { setResizeHandlerObserveCallback, setResizeHandlerUnobserveCallback };
