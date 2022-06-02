const patchNodeValue = () => {
	if (!window.ShadyDOM) {
		return;
	}
	const nativeNodeValue = Object.getOwnPropertyDescriptor(Node.prototype, "nodeValue");
	Object.defineProperty(Node.prototype, "nodeValue", {
		get() {
			return nativeNodeValue.get.apply(this);
		},
		set(text) {
			nativeNodeValue.set.apply(this, arguments); // eslint-disable-line

			// Call manually the mutation observer callback
			const parentElement = this.parentNode;
			if (parentElement instanceof HTMLElement && parentElement.isUI5Element) {
				parentElement._processChildren();
			}
		},
	});
};

patchNodeValue();

export default {};
