import EventProvider from "./EventProvider.js";
import RenderQueue from "./RenderQueue.js";
import { getAllRegisteredTags } from "./CustomElementsRegistry.js";
import { isRtlAware } from "./locale/RTLAwareRegistry.js";
import type UI5Element from "./UI5Element.js";
import { PromiseResolve, Timeout } from "./types.js";

type BeforeComponentRenderCallback = (webComponent: UI5Element) => void;

const registeredElements = new Set<UI5Element>();
const eventProvider = new EventProvider<UI5Element, void>();

const invalidatedWebComponents = new RenderQueue(); // Queue for invalidated web components

let renderTaskPromise: Promise<void> | undefined,
	renderTaskPromiseResolve: PromiseResolve | undefined;

let mutationObserverTimer: Timeout | undefined;

let queuePromise: Promise<void> | null;

/**
 * Schedules a render task (if not already scheduled) to render the component
 *
 * @param webComponent
 * @returns {Promise}
 */
const renderDeferred = async (webComponent: UI5Element) => {
	// Enqueue the web component
	invalidatedWebComponents.add(webComponent);

	// Schedule a rendering task
	await scheduleRenderTask();
};

/**
 * Renders a component synchronously and adds it to the registry of rendered components
 *
 * @param webComponent
 */
const renderImmediately = (webComponent: UI5Element) => {
	eventProvider.fireEvent("beforeComponentRender", webComponent);
	registeredElements.add(webComponent);
	webComponent._render();
};

/**
 * Cancels the rendering of a component, if awaiting to be rendered, and removes it from the registry of rendered components
 *
 * @param webComponent
 */
const cancelRender = (webComponent: UI5Element) => {
	invalidatedWebComponents.remove(webComponent);
	registeredElements.delete(webComponent);
};

/**
 * Schedules a rendering task, if not scheduled already
 */
const scheduleRenderTask = async () => {
	if (!queuePromise) {
		queuePromise = new Promise<void>(resolve => {
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

	renderTaskPromise = new Promise<void>(resolve => {
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

const renderFinished = async () => {
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

/**
 * Re-renders all UI5 Elements on the page, with the option to specify filters to rerender only some components.
 *
 * Usage:
 * reRenderAllUI5Elements() -> re-renders all components
 * reRenderAllUI5Elements({tag: "ui5-button"}) -> re-renders only instances of ui5-button
 * reRenderAllUI5Elements({rtlAware: true}) -> re-renders only rtlAware components
 * reRenderAllUI5Elements({languageAware: true}) -> re-renders only languageAware components
 * reRenderAllUI5Elements({themeAware: true}) -> re-renders only themeAware components
 * reRenderAllUI5Elements({rtlAware: true, languageAware: true}) -> re-renders components that are rtlAware or languageAware
 * etc...
 *
 * @public
 * @param {object|undefined} filters - Object with keys that can be "rtlAware" or "languageAware"
 * @returns {Promise<void>}
 */
const reRenderAllUI5Elements = async (filters?: {tag?: string, rtlAware?: boolean, languageAware?: boolean, themeAware?: boolean}) => {
	registeredElements.forEach((element: UI5Element) => {
		const ctor = element.constructor as typeof UI5Element;
		const tag = ctor.getMetadata().getTag();
		const rtlAware = isRtlAware(ctor);
		const languageAware = ctor.getMetadata().isLanguageAware();
		const themeAware = ctor.getMetadata().isThemeAware();
		if (!filters || (filters.tag === tag) || (filters.rtlAware && rtlAware) || (filters.languageAware && languageAware) || (filters.themeAware && themeAware)) {
			renderDeferred(element);
		}
	});
	await renderFinished();
};

const attachBeforeComponentRender = (listener: BeforeComponentRenderCallback) => {
	eventProvider.attachEvent("beforeComponentRender", listener);
};

const detachBeforeComponentRender = (listener: BeforeComponentRenderCallback) => {
	eventProvider.detachEvent("beforeComponentRender", listener);
};

export {
	renderDeferred,
	renderImmediately,
	cancelRender,
	renderFinished,
	reRenderAllUI5Elements,
	attachBeforeComponentRender,
	detachBeforeComponentRender,
};
