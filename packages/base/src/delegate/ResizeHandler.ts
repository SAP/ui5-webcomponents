import { instanceOfUI5Element } from "../UI5Element.js";

let resizeObserver: ResizeObserver;
const observedElements = new Map<HTMLElement, Array<Function>>();

const getResizeObserver = () => {
	if (!resizeObserver) {
		resizeObserver = new window.ResizeObserver(entries => {
			entries.forEach(entry => {
				const callbacks = observedElements.get(entry.target as HTMLElement);
				callbacks?.forEach((callback: Function) => callback());
			});
		});
	}
	return resizeObserver;
};

let observe = (element: HTMLElement, callback: Function) => {
	const callbacks = observedElements.get(element) || [];

	// if no callbacks have been added for this element - start observing it
	if (!callbacks.length) {
		getResizeObserver().observe(element);
	}

	// save the callbacks in an array
	observedElements.set(element, [...callbacks, callback]);
};

let unobserve = (element: HTMLElement, callback: Function) => {
	const callbacks = observedElements.get(element) || [];
	if (callbacks.length === 0) {
		return;
	}

	const filteredCallbacks = callbacks.filter((fn: Function) => fn !== callback);
	if (filteredCallbacks.length === 0) {
		getResizeObserver().unobserve(element);
		observedElements.delete(element);
	} else {
		observedElements.set(element, filteredCallbacks);
	}
};

/**
 * Allows to register/deregister resize observers for a DOM element
 *
 * @public
 * @class
  */
class ResizeHandler {
	/**
	 * @static
	 * @public
	 * @param {*} element UI5 Web Component or DOM Element to be observed
	 * @param {*} callback Callback to be executed
	 */
	static register(element: HTMLElement, callback: Function) {
		if (instanceOfUI5Element(element)) {
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
	static deregister(element: HTMLElement, callback: Function) {
		if (instanceOfUI5Element(element)) {
			element = element.getDomRef();
		}

		if (element instanceof HTMLElement) {
			unobserve(element, callback);
		} else {
			console.warn("Cannot deregister ResizeHandler for element", element); // eslint-disable-line
		}
	}

	/**
	 * Set a function to be executed whenever a DOM node needs to be observed for size change.
	 * @public
	 * @param fn
	 */
	// @ts-ignore
	const setResizeHandlerObserveFn = fn => {
		observe = fn;
	};

	/**
	 * Set a function to be executed whenever a DOM node needs to no longer be observed for size changes
	 * @public
	 * @param fn
	 */
	// @ts-ignore
	const setResizeHandlerUnobserveFn = fn => {
		unobserve = fn;
	};
}

export default ResizeHandler;
