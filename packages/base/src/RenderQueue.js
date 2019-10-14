class RenderQueue {
	constructor() {
		this.list = []; // Used to store the web components in order
		this.promises = new Map(); // Used to store promises for web component rendering
	}

	add(webComponent) {
		if (this.promises.has(webComponent)) {
			return this.promises.get(webComponent);
		}

		let deferredResolve;
		const promise = new Promise(resolve => {
			deferredResolve = resolve;
		});
		promise._deferredResolve = deferredResolve;

		this.list.push(webComponent);
		this.promises.set(webComponent, promise);

		return promise;
	}

	shift() {
		const webComponent = this.list.shift();
		if (webComponent) {
			const promise = this.promises.get(webComponent);
			this.promises.delete(webComponent);
			return { webComponent, promise };
		}
	}

	getList() {
		return this.list;
	}

	isAdded(webComponent) {
		return this.promises.has(webComponent);
	}
}

export default RenderQueue;
