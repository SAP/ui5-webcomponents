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
}

export default RenderQueue;
