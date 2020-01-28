const getStaticAreaInstance = () => {
	let staticArea = document.querySelector("ui5-static-area");

	if (staticArea) {
		return staticArea;
	}

	// Create static area if it is not present
	const bodyElement = document.body;
	staticArea = document.createElement("ui5-static-area");

	return bodyElement.insertBefore(staticArea, bodyElement.firstChild);
};

const removeStaticArea = () => {
	getStaticAreaInstance().destroy();
};

class StaticAreaElement extends HTMLElement {
	constructor() {
		super();
	}

	destroy() {
		const staticAreaDomRef = document.querySelector(this.tagName.toLowerCase());
		staticAreaDomRef.parentElement.removeChild(staticAreaDomRef);
	}
}

customElements.define("ui5-static-area", StaticAreaElement);

export {
	getStaticAreaInstance,
	removeStaticArea,
};
