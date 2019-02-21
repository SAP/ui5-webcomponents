class RenderQueue {
	constructor() {
		this.list = []; // Used to store the controls in order
		this.promises = new Map(); // Used to store promises for control rendering
	}

	add(control) {
		if (this.promises.has(control)) {
			return this.promises.get(control);
		}

		let deferredResolve;
		const promise = new Promise(resolve => {
			deferredResolve = resolve;
		});
		promise._deferredResolve = deferredResolve;

		this.list.push(control);
		this.promises.set(control, promise);

		return promise;
	}

	shift() {
		const control = this.list.shift();
		if (control) {
			const promise = this.promises.get(control);
			this.promises.delete(control);
			return { control, promise };
		}
	}

	getList() {
		return this.list;
	}

	isAdded(control) {
		return this.promises.has(control);
	}
}

export default RenderQueue;
