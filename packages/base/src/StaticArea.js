/**
 * @class
 * @author SAP SE
 * @private
 * Static class for static area
 */
class StaticArea {
	// Create a single instance of StaticArea
	constructor() {
		if (!StaticArea.instance) {
			return StaticArea.instance;
		}

		StaticArea.instance = StaticArea._getInstance();
	}

	/**
	 * @protected
	 * Creates static area as first child of the body element or return the existing one.
	 */
	static _getInstance() {
		let staticArea = document.querySelector("ui5-static-area");

		if (staticArea) {
			return staticArea;
		}

		// Create static area if it is not present
		const bodyElement = document.body;
		staticArea = document.createElement("ui5-static-area");

		return bodyElement.insertBefore(staticArea, bodyElement.firstChild);
	}
}

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

export default StaticArea;
