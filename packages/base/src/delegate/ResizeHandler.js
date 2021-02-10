import NativeResize from "./NativeResize.js";
import CustomResize from "./CustomResize.js";

class ResizeHandler {
	static initialize() {
		ResizeHandler.Implementation = window.ResizeObserver ? NativeResize : CustomResize;
		ResizeHandler.Implementation.initialize();
	}

	/**
	 * @static
	 * @private
	 * @param {*} ref Reference to be observed
	 * @param {*} callback Callback to be executed
	 * @memberof ResizeHandler
	 */
	static attachListener(ref, callback) {
		ResizeHandler.Implementation.attachListener.call(ResizeHandler.Implementation, ref, callback);
	}

	/**
	 * @static
	 * @private
	 * @param {*} ref Reference to be unobserved
	 * @memberof ResizeHandler
	 */
	static detachListener(ref, callback) {
		ResizeHandler.Implementation.detachListener.call(ResizeHandler.Implementation, ref, callback);
	}


	/**
	 * @static
	 * @public
	 * @param {*} ref Reference to a UI5 Web Component or DOM Element to be observed
	 * @param {*} callback Callback to be executed
	 * @memberof ResizeHandler
	 */
	static register(ref, callback) {
		if (ref.isUI5Element) {
			ref = ref.getDomRef();
		}

		ResizeHandler.attachListener(ref, callback);
	}


	/**
	 * @static
	 * @public
	 * @param {*} ref Reference to UI5 Web Component or DOM Element to be unobserved
	 * @memberof ResizeHandler
	 */
	static deregister(ref, callback) {
		if (ref.isUI5Element) {
			ref = ref.getDomRef();
		}

		ResizeHandler.detachListener(ref, callback);
	}
}

ResizeHandler.initialize();

export default ResizeHandler;
