import EventProvider from "./EventProvider.js";
import RenderQueue from "./RenderQueue.js";
import { getAllRegisteredTags } from "./CustomElementsRegistry.js";
import { isRtlAware } from "./locale/RTLAwareRegistry.js";

const registeredElements = new Set();
const eventProvider = new EventProvider();

// Queue for invalidated web components
const invalidatedWebComponents = new RenderQueue();

let renderTaskPromise,
	renderTaskPromiseResolve;

let mutationObserverTimer;

let queuePromise;


/**
 * Schedules a render task (if not already scheduled) to render the component
 *
 * @param webComponent
 * @returns {Promise}
 */
const renderDeferred = async webComponent => {
	// Enqueue the web component
	invalidatedWebComponents.add(webComponent);

	// Schedule a rendering task
	await scheduleRenderTask();
};

/**
 * Renders a component synchronously
 *
 * @param webComponent
 */
const renderImmediately = webComponent => {
	eventProvider.fireEvent("beforeComponentRender", webComponent);
	webComponent._render();
};

/**
 * Cancels the rendering of a component, added to the queue with renderDeferred
 *
 * @param webComponent
 */
const cancelRender = webComponent => {
	invalidatedWebComponents.remove(webComponent);
};

/**
 * Schedules a rendering task, if not scheduled already
 */
const scheduleRenderTask = async () => {
	if (!queuePromise) {
		queuePromise = new Promise(resolve => {
			window.requestAnimationFrame(() => {
				// Render all components in the queue

				// console.log(`--------------------RENDER TASK START------------------------------`); // eslint-disable-line
				invalidatedWebComponents.process(renderImmediately);
				// console.log(`--------------------RENDER TASK END------------------------------`); // eslint-disable-line

				// Resolve the promise so that callers of renderDeferred can continue
				queuePromise = null;
				resolve();

				// Wait for Mutation observer before the render task is considered finished
				if (!mutationObserverTimer) {
					mutationObserverTimer = setTimeout(() => {
						mutationObserverTimer = undefined;
						if (invalidatedWebComponents.isEmpty()) {
							_resolveTaskPromise();
						}
					}, 200);
				}
			});
		});
	}

	await queuePromise;
};

/**
 * return a promise that will be resolved once all invalidated web components are rendered
 */
const whenDOMUpdated = () => {
	if (renderTaskPromise) {
		return renderTaskPromise;
	}

	renderTaskPromise = new Promise(resolve => {
		renderTaskPromiseResolve = resolve;
		window.requestAnimationFrame(() => {
			if (invalidatedWebComponents.isEmpty()) {
				renderTaskPromise = undefined;
				resolve();
			}
		});
	});

	return renderTaskPromise;
};

const whenAllCustomElementsAreDefined = () => {
	const definedPromises = getAllRegisteredTags().map(tag => customElements.whenDefined(tag));
	return Promise.all(definedPromises);
};

const whenFinished = async () => {
	await whenAllCustomElementsAreDefined();
	await whenDOMUpdated();
};

const _resolveTaskPromise = () => {
	if (!invalidatedWebComponents.isEmpty()) {
		// More updates are pending. Resolve will be called again
		return;
	}

	if (renderTaskPromiseResolve) {
		renderTaskPromiseResolve();
		renderTaskPromiseResolve = undefined;
		renderTaskPromise = undefined;
	}
};

const register = element => {
	registeredElements.add(element);
};

const deregister = element => {
	registeredElements.delete(element);
};

/**
 * Re-renders all UI5 Elements on the page, with the option to specify filters to rerender only some components.
 *
 * Usage:
 * reRenderAllUI5Elements() -> rerenders all components
 * reRenderAllUI5Elements({tag: "ui5-button"}) -> re-renders only instances of ui5-button
 * reRenderAllUI5Elements({rtlAware: true}) -> re-renders only rtlAware components
 * reRenderAllUI5Elements({languageAware: true}) -> re-renders only languageAware components
 * reRenderAllUI5Elements({rtlAware: true, languageAware: true}) -> re-renders components that are rtlAware or languageAware
 * etc...
 *
 * @public
 * @param {Object|undefined} filters - Object with keys that can be "rtlAware" or "languageAware"
 */
const reRenderAllUI5Elements = filters => {
	registeredElements.forEach(element => {
		const tag = element.constructor.getMetadata().getTag();
		const rtlAware = isRtlAware(element.constructor);
		const languageAware = element.constructor.getMetadata().isLanguageAware();
		if (!filters || (filters.tag === tag) || (filters.rtlAware && rtlAware) || (filters.languageAware && languageAware)) {
			renderDeferred(element);
		}
	});
};

const attachBeforeComponentRender = listener => {
	eventProvider.attachEvent("beforeComponentRender", listener);
};

const detachBeforeComponentRender = listener => {
	eventProvider.detachEvent("beforeComponentRender", listener);
};

export {
	renderDeferred,
	renderImmediately,
	cancelRender,
	whenFinished,
	register,
	deregister,
	reRenderAllUI5Elements,
	attachBeforeComponentRender,
	detachBeforeComponentRender,
};
