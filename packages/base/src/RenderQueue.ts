import type UI5Element from "./UI5Element.js";

const MAX_PROCESS_COUNT = 10;

class RenderQueue {
	list: Array<UI5Element>;
	lookup: Set<UI5Element>;

	constructor() {
		this.list = []; // Used to store the web components in order
		this.lookup = new Set(); // Used for faster search
	}

	add(webComponent: UI5Element) {
		if (this.lookup.has(webComponent)) {
			return;
		}

		this.list.push(webComponent);
		this.lookup.add(webComponent);
	}

	remove(webComponent: UI5Element) {
		if (!this.lookup.has(webComponent)) {
			return;
		}

		this.list = this.list.filter(item => item !== webComponent);
		this.lookup.delete(webComponent);
	}

	shift() {
		const webComponent = this.list.shift();
		if (webComponent) {
			this.lookup.delete(webComponent);
			return webComponent;
		}
	}

	isEmpty() {
		return this.list.length === 0;
	}

	isAdded(webComponent: UI5Element) {
		return this.lookup.has(webComponent);
	}

	/**
	 * Processes the whole queue by executing the callback on each component,
	 * while also imposing restrictions on how many times a component may be processed.
	 *
	 * @param callback - function with one argument (the web component to be processed)
	 */
	process(callback: (el: UI5Element) => void) {
		let webComponent;
		const stats = new Map<UI5Element, number>();

		webComponent = this.shift();
		while (webComponent) {
			const timesProcessed = stats.get(webComponent) || 0;
			if (timesProcessed > MAX_PROCESS_COUNT) {
				throw new Error(`Web component processed too many times this task, max allowed is: ${MAX_PROCESS_COUNT}`);
			}
			callback(webComponent);
			stats.set(webComponent, timesProcessed + 1);
			webComponent = this.shift();
		}
	}
}

export default RenderQueue;
