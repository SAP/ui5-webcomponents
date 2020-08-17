import getSingletonElementInstance from "./util/getSingletonElementInstance.js";

const getStaticAreaInstance = () => getSingletonElementInstance("ui5-static-area");

const removeStaticArea = () => {
	getStaticAreaInstance().destroy();
};

class StaticAreaElement extends HTMLElement {
	constructor() {
		super();
	}

	get isUI5Element() {
		return true;
	}

	destroy() {
		const staticAreaDomRef = document.querySelector(this.tagName.toLowerCase());
		staticAreaDomRef.parentElement.removeChild(staticAreaDomRef);
	}
}

if (!customElements.get("ui5-static-area")) {
	customElements.define("ui5-static-area", StaticAreaElement);
}

export {
	getStaticAreaInstance,
	removeStaticArea,
};
