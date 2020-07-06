import RenderQueue from "./RenderQueue.js";
import { getAllRegisteredTags } from "./CustomElementsRegistry.js";
import { isRtlAware } from "./locale/RTLAwareRegistry.js";

const registeredElements = new Set();

// Tells whether a render task is currently scheduled
let renderTaskId;

// Queue for invalidated web components
const invalidatedWebComponents = new RenderQueue();

let renderTaskPromise,
	renderTaskPromiseResolve;

let mutationObserverTimer;

/**
 * Class that manages the rendering/re-rendering of web components
 * This is always asynchronous
 */
class RenderScheduler {
	constructor() {
		throw new Error("Static class");
	}

	/**
	 * Schedules a render task (if not already scheduled) to render the component
	 *
	 * @param webComponent
	 * @returns {Promise}
	 */
	static renderDeferred(webComponent) {
		// Enqueue the web component
		const whenQueueProcessed = invalidatedWebComponents.add(webComponent);

		// Schedule a rendering task
		RenderScheduler.scheduleRenderTask();

		return whenQueueProcessed;
	}

	/**
	 * Immediately runs a render task (or uses an already running task) to render the component
	 * Note: This method returns a promise because of the use case when the component is added to an already running render task
	 *
	 * @param webComponent
	 * @returns {Promise}
	 */
	static renderImmediately(webComponent) {
		// Enqueue the web component
		const whenQueueProcessed = invalidatedWebComponents.add(webComponent);

		// Immediately start a render task
		RenderScheduler.runRenderTask();

		return whenQueueProcessed;
	}

	static cancelRender(webComponent) {
		invalidatedWebComponents.remove(webComponent);
	}

	/**
	 * Schedules a rendering task, if not scheduled already
	 */
	static scheduleRenderTask() {
		if (!renderTaskId) {
			// renderTaskId = window.setTimeout(RenderScheduler.renderWebComponents, 3000); // Task
			// renderTaskId = Promise.resolve().then(RenderScheduler.renderWebComponents); // Micro task
			renderTaskId = window.requestAnimationFrame(RenderScheduler.renderWebComponents); // AF
		}
	}

	static runRenderTask() {
		if (!renderTaskId) {
			renderTaskId = 1; // prevent another rendering task from being scheduled, all web components should use this task
			RenderScheduler.renderWebComponents();
		}
	}

	static renderWebComponents() {
		// console.log("------------- NEW RENDER TASK ---------------");

		invalidatedWebComponents.process(component => component._render());

		// wait for Mutation observer just in case
		if (!mutationObserverTimer) {
			mutationObserverTimer = setTimeout(() => {
				mutationObserverTimer = undefined;
				if (invalidatedWebComponents.isEmpty()) {
					RenderScheduler._resolveTaskPromise();
				}
			}, 200);
		}

		renderTaskId = undefined;
	}

	/**
	 * return a promise that will be resolved once all invalidated web components are rendered
	 */
	static whenDOMUpdated() {
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
	}

	static whenAllCustomElementsAreDefined() {
		const definedPromises = getAllRegisteredTags().map(tag => customElements.whenDefined(tag));
		return Promise.all(definedPromises);
	}

	static async whenFinished() {
		await RenderScheduler.whenAllCustomElementsAreDefined();
		await RenderScheduler.whenDOMUpdated();
	}

	static _resolveTaskPromise() {
		if (!invalidatedWebComponents.isEmpty()) {
			// More updates are pending. Resolve will be called again
			return;
		}

		if (renderTaskPromiseResolve) {
			renderTaskPromiseResolve.call(this);
			renderTaskPromiseResolve = undefined;
			renderTaskPromise = undefined;
		}
	}

	static register(element) {
		registeredElements.add(element);
	}

	static deregister(element) {
		registeredElements.delete(element);
	}

	/**
	 * Re-renders all UI5 Elements on the page, with the option to specify filters to rerender only some components.
	 *
	 * Usage:
	 * reRenderAllUI5Elements() -> rerenders all components
	 * reRenderAllUI5Elements({rtlAware: true}) -> re-renders only rtlAware components
	 * reRenderAllUI5Elements({languageAware: true}) -> re-renders only languageAware components
	 * reRenderAllUI5Elements({rtlAware: true, languageAware: true}) -> re-renders components that are rtlAware or languageAware
	 *
	 * @public
	 * @param {Object|undefined} filters - Object with keys that can be "rtlAware" or "languageAware"
	 */
	static reRenderAllUI5Elements(filters) {
		registeredElements.forEach(element => {
			const rtlAware = isRtlAware(element.constructor);
			const languageAware = element.constructor.getMetadata().isLanguageAware();
			if (!filters || (filters.rtlAware && rtlAware) || (filters.languageAware && languageAware)) {
				RenderScheduler.renderDeferred(element);
			}
		});
	}
}

export default RenderScheduler;
