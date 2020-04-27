import RenderQueue from "./RenderQueue.js";
import { getAllRegisteredTags } from "./CustomElementsRegistry.js";

const MAX_RERENDER_COUNT = 10;

// Tells whether a render task is currently scheduled
let renderTaskId;

// Queue for invalidated web components
const invalidatedWebComponents = new RenderQueue();

let renderTaskPromise,
	renderTaskPromiseResolve,
	taskResult;

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
	 * Queues a web component for re-rendering
	 * @param webComponent
	 */
	static renderDeferred(webComponent) {
		// Enqueue the web component
		const res = invalidatedWebComponents.add(webComponent);

		// Schedule a rendering task
		RenderScheduler.scheduleRenderTask();
		return res;
	}

	static renderImmediately(webComponent) {
		// Enqueue the web component
		const res = invalidatedWebComponents.add(webComponent);

		// Immediately start a render task
		RenderScheduler.runRenderTask();
		return res;
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

		let webComponentInfo,
			webComponent,
			promise;
		const renderStats = new Map();
		while (webComponentInfo = invalidatedWebComponents.shift()) { // eslint-disable-line
			webComponent = webComponentInfo.webComponent;
			promise = webComponentInfo.promise;

			const timesRerendered = renderStats.get(webComponent) || 0;
			if (timesRerendered > MAX_RERENDER_COUNT) {
				// console.warn("WARNING RERENDER", webComponent);
				throw new Error(`Web component re-rendered too many times this task, max allowed is: ${MAX_RERENDER_COUNT}`);
			}
			webComponent._render();
			promise._deferredResolve();
			renderStats.set(webComponent, timesRerendered + 1);
		}

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
	 * return a promise that will be resolved once all invalidated web components are rendered
	 */
	static whenDOMUpdated() {
		if (renderTaskPromise) {
			return renderTaskPromise;
		}

		renderTaskPromise = new Promise(resolve => {
			renderTaskPromiseResolve = resolve;
			window.requestAnimationFrame(() => {
				if (invalidatedWebComponents.getList().length === 0) {
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
		if (invalidatedWebComponents.getList().length > 0) {
			// More updates are pending. Resolve will be called again
			return;
		}

		if (renderTaskPromiseResolve) {
			renderTaskPromiseResolve.call(this, taskResult);
			renderTaskPromiseResolve = undefined;
			renderTaskPromise = undefined;
		}
	}
}

export default RenderScheduler;
