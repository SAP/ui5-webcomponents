import RenderQueue from "./RenderQueue.js";
import { getAllRegisteredTags } from "./CustomElementsRegistry.js";

// Queue for invalidated web components
const invalidatedWebComponents = new RenderQueue();

// When set, a render task is running or pending
let renderTaskId;

// When set, someone wants to know when the current rendering cycle will have finished
let renderTaskPromise,
	renderTaskPromiseResolve;

let mutationObserverTimer;

/**
 * Returns a promise that resolves when all imported UI5 Web Components have been defined in window.customElements
 *
 * @returns {Promise<any>}
 */
const whenCustomElementsDefined = () => {
	const definedPromises = getAllRegisteredTags().map(tag => customElements.whenDefined(tag));
	return Promise.all(definedPromises);
};

/**
 * Class that manages the rendering/re-rendering of web components
 */
class RenderScheduler {
	/**
	 * Queues a web component for re-rendering
	 * @param webComponent
	 */
	static renderDeferred(webComponent) {
		// Enqueue the web component
		invalidatedWebComponents.add(webComponent);

		// Schedule a rendering task
		RenderScheduler.scheduleRenderTask();
	}

	static renderAsSoonAsPossible(webComponent) {
		// Enqueue the web component
		invalidatedWebComponents.add(webComponent);

		// Immediately start a render task
		RenderScheduler.runRenderTask();
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
				if (invalidatedWebComponents.getList().length === 0) {
					RenderScheduler._resolveTaskPromise();
				}
			}, 200);
		}

		renderTaskId = undefined;
	}

	/**
	 * Awaits until all component instances are rendered
	 *
	 * @public
	 * @returns {Promise<void>}
	 */
	static whenAllRendered() {
		// If no task is scheduled or running, there's nothing to wait for
		if (!renderTaskId) {
			return Promise.resolve();
		}

		// Otherwise, create a promise (if not already created) and wait for renderWebComponents to run/finish and resolve it
		if (!renderTaskPromise) {
			renderTaskPromise = new Promise(resolve => {
				renderTaskPromiseResolve = resolve;
			});
		}

		return renderTaskPromise;
	}

	static _resolveTaskPromise() {
		if (renderTaskPromiseResolve) {
			renderTaskPromiseResolve();
			renderTaskPromiseResolve = undefined;
			renderTaskPromise = undefined;
		}
	}

	/**
	 * Awaits until all imported components are defined and all their instances have been rendered
	 *
	 * @public
	 * @returns {Promise<void>}
	 */
	static async whenFinished() {
		await whenCustomElementsDefined();
		await RenderScheduler.whenAllRendered();
	}
}

export default RenderScheduler;
