import WCPolyfill from '../thirdparty/webcomponents-polyfill';

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
			nativeNodeValue.set.apply(this, arguments);

			// Call manually the mutation observer callback
			const parentElement = this.parentNode;
			if (parentElement instanceof Element && typeof parentElement._processChildren === "function") {
				parentElement._processChildren();
			}
		}
	});
};

export default patchNodeValue;