import WebComponent from '../WebComponent';
import NativeResize from './NativeResize';
import CustomResize from './CustomResize';

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
	 * @param {*} ref Reference to a UI5 Control or DOM Element to be observed
	 * @param {*} callback Callback to be executed
	 * @memberof ResizeHandler
	 */
	static register(ref, callback) {

		if (ref instanceof WebComponent) {
			ref = ref.getDomRef();
		}

		ResizeHandler.attachListener(ref, callback);
	}


	/**
	 * @static
	 * @public
	 * @param {*} ref Reference to UI5 Control or DOM Element to be unobserved
	 * @memberof ResizeHandler
	 */
	static deregister(ref, callback) {

		if (ref instanceof WebComponent) {
			ref = ref.getDomRef();
		}

		ResizeHandler.detachListener(ref, callback);
	}
}

ResizeHandler.initialize();

export default ResizeHandler;