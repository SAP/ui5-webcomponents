import RenderQueue from "./RenderQueue.js";

const MAX_RERENDER_COUNT = 10;

// Tells whether a render task is currently scheduled
let renderTaskId;

// Queue for invalidated controls
const invalidatedControls = new RenderQueue();

let renderTaskPromise,
	renderTaskPromiseResolve,
	taskResult;

/**
 * Class that manages the rendering/re-rendering of controls
 * This is always asynchronous
 */
class RenderScheduler {
	constructor() {
		throw new Error("Static class");
	}

	/**
	 * Queues a control for re-rendering
	 * @param control
	 */
	static renderDeferred(control) {
		// Enqueue the control
		const res = invalidatedControls.add(control);

		// Schedule a rendering task
		RenderScheduler.scheduleRenderTask();
		return res;
	}

	static renderImmediately(control) {
		// Enqueue the control
		const res = invalidatedControls.add(control);

		// Immediately start a render task
		RenderScheduler.runRenderTask();
		return res;
	}

	/**
	 * Schedules a rendering task, if not scheduled already
	 */
	static scheduleRenderTask() {
		if (!renderTaskId) {
			// renderTaskId = window.setTimeout(RenderScheduler.renderControls, 3000); // Task
			// renderTaskId = Promise.resolve().then(RenderScheduler.renderControls); // Micro task
			renderTaskId = window.requestAnimationFrame(RenderScheduler.renderControls); // AF
		}
	}

	static runRenderTask() {
		if (!renderTaskId) {
			renderTaskId = 1; // prevent another rendering task from being scheduled, all controls should use this task
			RenderScheduler.renderControls();
		}
	}

	static renderControls() {
		// console.log("------------- NEW RENDER TASK ---------------");

		let controlInfo,
			control,
			promise;
		const renderStats = new Map();
		while (controlInfo = invalidatedControls.shift()) { // eslint-disable-line
			control = controlInfo.control;
			promise = controlInfo.promise;

			const timesRerendered = renderStats.get(control) || 0;
			if (timesRerendered > MAX_RERENDER_COUNT) {
				// console.warn("WARNING RERENDER", control);
				throw new Error(`Control re-rendered too many times this task, max allowed is: ${MAX_RERENDER_COUNT}`);
			}
			control._render();
			promise._deferredResolve();
			renderStats.set(control, timesRerendered + 1);
		}

		// wait for Mutation observer just in case
		setTimeout(() => {
			if (invalidatedControls.getList().length === 0) {
				RenderScheduler._resolveTaskPromise();
			}
		}, 200);

		renderTaskId = undefined;
	}

	/**
	 * return a promise that will be resolved once all invalidated controls are rendered
	 */
	static whenDOMUpdated() {
		if (renderTaskPromise) {
			return renderTaskPromise;
		}

		renderTaskPromise = new Promise(resolve => {
			renderTaskPromiseResolve = resolve;
			window.requestAnimationFrame(() => {
				if (invalidatedControls.getList().length === 0) {
					renderTaskPromise = undefined;
					resolve();
				}
			});
		});

		return renderTaskPromise;
	}

	static getNotDefinedComponents() {
		return Array.from(document.querySelectorAll(":not(:defined)")).filter(el => el.localName.startsWith("ui5-"));
	}

	/**
	 * return a promise that will be resolved once all ui5 webcomponents on the page have their shadow root ready
	 */
	static async whenShadowDOMReady() {
		const undefinedElements = this.getNotDefinedComponents();

		const definedPromises = undefinedElements.map(
		  el => customElements.whenDefined(el.localName)
		);
		const timeoutPromise = new Promise(resolve => setTimeout(resolve, 5000));

		await Promise.race([Promise.all(definedPromises), timeoutPromise]);
		const stillUndefined = this.getNotDefinedComponents();
		if (stillUndefined.length) {
			// eslint-disable-next-line
			console.warn("undefined elements after 5 seconds: ", [...stillUndefined].map(el => el.localName));
		}

		// TODO: track promises internally, the dom traversal is a POC only
		const ui5Components = Array.from(document.querySelectorAll("*")).filter(_ => _._shadowRootReadyPromise);
		return Promise.all(ui5Components.map(comp => comp._whenShadowRootReady()))
			.then(() => Promise.resolve());	// qunit has a boolean cheack for the promise value and the array from the Promise all is considered truthy
	}

	static async whenFinished() {
		await RenderScheduler.whenShadowDOMReady();
		await RenderScheduler.whenDOMUpdated();
	}

	static _resolveTaskPromise() {
		if (invalidatedControls.getList().length > 0) {
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
