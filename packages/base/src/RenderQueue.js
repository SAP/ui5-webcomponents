const MAX_PROCESS_COUNT = 4;
const ACCEPTABLE_PROCESS_COUNT = 2;

class RenderQueue {
	constructor() {
		this.list = []; // Used to store the web components in order
		this.lookup = new Set(); // Used to efficiently check if a web component is in the list
	}

	add(webComponent) {
		if (this.isAdded(webComponent)) {
			return;
		}

		this.list.push(webComponent);
		this.lookup.add(webComponent);
	}

	shift() {
		const webComponent = this.list.shift();
		if (webComponent) {
			this.lookup.delete(webComponent);
			return webComponent;
		}
	}

	getList() {
		return this.list;
	}

	isAdded(webComponent) {
		return this.lookup.has(webComponent);
	}

	/**
	 * Processes the whole queue by executing the callback on each component,
	 * while also imposing restrictions on how many times a component may be processed.
	 *
	 * @param callback - function with one argument (the web component to be processed)
	 */
	process(callback) {
		let webComponent;
		const stats = new Map();

		webComponent = this.shift();
		while (webComponent) {
			const timesProcessed = stats.get(webComponent) || 1;
			if (timesProcessed > ACCEPTABLE_PROCESS_COUNT) {
				console.warn(`Web component processed more than ${ACCEPTABLE_PROCESS_COUNT} times, is this intended?`); // eslint-disable-line
			}
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
