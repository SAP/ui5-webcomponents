import { instanceOfUI5Element } from "../UI5Element.js";

type ResizeObserverCallback = () => void;

let resizeObserver: ResizeObserver;
const observedElements = new Map<HTMLElement, Array<ResizeObserverCallback>>();

const getResizeObserver = () => {
	if (!resizeObserver) {
		resizeObserver = new window.ResizeObserver(entries => {
			entries.forEach(entry => {
				const callbacks = observedElements.get(entry.target as HTMLElement);
				callbacks?.forEach((callback: ResizeObserverCallback) => callback());
			});
		});
	}
	return resizeObserver;
};

const observe = (element: HTMLElement, callback: ResizeObserverCallback) => {
	const callbacks = observedElements.get(element) || [];

	// if no callbacks have been added for this element - start observing it
	if (!callbacks.length) {
		getResizeObserver().observe(element);
	}

	// save the callbacks in an array
	observedElements.set(element, [...callbacks, callback]);
};

const unobserve = (element: HTMLElement, callback: ResizeObserverCallback) => {
	const callbacks = observedElements.get(element) || [];
	if (callbacks.length === 0) {
		return;
	}

	const filteredCallbacks = callbacks.filter((fn: ResizeObserverCallback) => fn !== callback);
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
	static register(element: HTMLElement, callback: ResizeObserverCallback) {
		let effectiveElement: HTMLElement | undefined = element;

		if (instanceOfUI5Element(effectiveElement)) {
			effectiveElement = effectiveElement.getDomRef();
		}

		if (effectiveElement instanceof HTMLElement) {
			observe(effectiveElement, callback);
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
	static deregister(element: HTMLElement, callback: ResizeObserverCallback) {
		let effectiveElement: HTMLElement | undefined = element;

		if (instanceOfUI5Element(effectiveElement)) {
			effectiveElement = effectiveElement.getDomRef();
		}

		if (effectiveElement instanceof HTMLElement) {
			unobserve(effectiveElement, callback);
		} else {
			console.warn("Cannot deregister ResizeHandler for element", element); // eslint-disable-line
		}
	}
}

export default ResizeHandler;
