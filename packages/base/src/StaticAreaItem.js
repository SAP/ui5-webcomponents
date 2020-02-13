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
		this._rendered = false;
	}

	/**
	 * @protected
	 */
	_updateFragment() {
		const renderResult = this.ui5ElementContext.constructor.staticAreaTemplate(this.ui5ElementContext),
			stylesToAdd = this.ui5ElementContext.constructor.staticAreaStyles || false;

		this._ensureInstance();
		this.ui5ElementContext.constructor.render(renderResult, this.staticAreaItemDomRef.shadowRoot, stylesToAdd, { eventContext: this.ui5ElementContext });
		this._rendered = true;
	}

	_ensureInstance() {
		if (!this.staticAreaItemDomRef) {
			// Initial rendering of fragment

			this.staticAreaItemDomRef = document.createElement("ui5-static-area-item");
			this.staticAreaItemDomRef.attachShadow({ mode: "open" });
			this.staticAreaItemDomRef.classList.add(this.ui5ElementContext._id); // used for getting the popover in the tests

			getStaticAreaInstance().appendChild(this.staticAreaItemDomRef);
		}
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
	 */
	_updateContentDensity(isCompact) {
		if (!this.staticAreaItemDomRef) {
			return;
		}

		if (isCompact) {
			this.staticAreaItemDomRef.classList.add("sapUiSizeCompact");
			this.staticAreaItemDomRef.classList.add("ui5-content-density-compact");
		} else {
			this.staticAreaItemDomRef.classList.remove("sapUiSizeCompact");
			this.staticAreaItemDomRef.classList.remove("ui5-content-density-compact");
		}
	}

	/**
	 * @protected
	 * Returns reference to the DOM element where the current fragment is added.
	 */
	getDomRef() {
		if (!this._rendered) {
			this._updateFragment();
		}
		return this.staticAreaItemDomRef.shadowRoot;
	}
}

class StaticAreaItemElement extends HTMLElement {
	constructor() {
		super();
	}

	get isUI5Element() {
		return true;
	}
}

if (!customElements.get("ui5-static-area-item")) {
	customElements.define("ui5-static-area-item", StaticAreaItemElement);
}

export default StaticAreaItem;
