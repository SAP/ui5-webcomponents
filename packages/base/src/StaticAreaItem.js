import { getStaticAreaInstance, removeStaticArea } from "./StaticArea.js";

/**
 * @class
 * @author SAP SE
 * @private
 * Defines and takes care of ui5-static-are-item items
 */
class StaticAreaItem {
	constructor(_ui5ElementContext) {
		this.ui5ElementContext = _ui5ElementContext;
	}

	/**
	 * @protected
	 */
	_updateFragment() {
		const renderResult = this.ui5ElementContext.constructor.staticAreaTemplate(this.ui5ElementContext),
			stylesToAdd = this.ui5ElementContext.constructor.staticAreaStyles || false;

		if (!this.staticAreaItemDomRef) {
			// Initial rendering of fragment

			this.staticAreaItemDomRef = document.createElement("ui5-static-area-item");
			this.staticAreaItemDomRef.attachShadow({ mode: "open" });
			this.staticAreaItemDomRef.classList.add(this.ui5ElementContext._id);

			getStaticAreaInstance().appendChild(this.staticAreaItemDomRef);
		}

		this.ui5ElementContext.constructor.render(renderResult, this.staticAreaItemDomRef.shadowRoot, stylesToAdd, { eventContext: this.ui5ElementContext });
	}

	/**
	 * @protected
	 */
	_removeFragmentFromStaticArea() {
		const staticArea = getStaticAreaInstance();

		staticArea.removeChild(this.staticAreaItemDomRef);

		this.staticAreaItemDomRef = null;

		// remove static area
		if (staticArea.childElementCount < 1) {
			removeStaticArea();
		}
	}

	/**
	 * @protected
	 * Returns reference to the DOM element where the current fragment is added.
	 */
	getDomRef() {
		return this.staticAreaItemDomRef.shadowRoot;
	}
}

class StaticAreaItemElement extends HTMLElement {
	constructor() {
		super();
	}
}

customElements.define("ui5-static-area-item", StaticAreaItemElement);

export default StaticAreaItem;
