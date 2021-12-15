import "./StaticArea.js";
import updateShadowRoot from "./updateShadowRoot.js";
import { renderFinished } from "./Render.js";
import getEffectiveContentDensity from "./util/getEffectiveContentDensity.js";
import { getEffectiveScopingSuffixForTag } from "./CustomElementsScope.js";
import getEffectiveDir from "./locale/getEffectiveDir.js";

/**
 *
 * @class
 * @author SAP SE
 * @private
 */
class StaticAreaItem extends HTMLElement {
	constructor() {
		super();
		this._rendered = false;
		this.attachShadow({ mode: "open" });
	}

	/**
	 * @protected
	 * @param ownerElement The UI5Element instance that owns this static area item
	 */
	setOwnerElement(ownerElement) {
		this.ownerElement = ownerElement;
		this.classList.add(this.ownerElement._id); // used for getting the popover in the tests
		if (typeof this.constructor.mappingCallback === "function") {
			this.constructor.mappingCallback(this, this.ownerElement);
		}
	}

	/**
	 * Updates the shadow root of the static area item with the latest state, if rendered
	 * @protected
	 */
	update() {
		if (this._rendered) {
			this._updateContentDensity();
			this._updateDirection();
			updateShadowRoot(this.ownerElement, true);
		}
	}

	/**
	 * Sets the correct content density based on the owner element's state
	 * @private
	 */
	_updateContentDensity() {
		if (getEffectiveContentDensity(this.ownerElement) === "compact") {
			this.classList.add("sapUiSizeCompact");
			this.classList.add("ui5-content-density-compact");
		} else {
			this.classList.remove("sapUiSizeCompact");
			this.classList.remove("ui5-content-density-compact");
		}
	}

	_updateDirection() {
		const dir = getEffectiveDir(this.ownerElement);
		if (dir) {
			this.setAttribute("dir", dir);
		} else {
			this.removeAttribute("dir");
		}
	}

	/**
	 * @protected
	 * Returns reference to the DOM element where the current fragment is added.
	 */
	async getDomRef() {
		this._updateContentDensity();
		if (!this._rendered) {
			this._rendered = true;
			updateShadowRoot(this.ownerElement, true);
		}
		await renderFinished(); // Wait for the content of the ui5-static-area-item to be rendered
		return this.shadowRoot;
	}

	static getTag() {
		const pureTag = "ui5-static-area-item";
		const suffix = getEffectiveScopingSuffixForTag(pureTag);
		if (!suffix) {
			return pureTag;
		}

		return `${pureTag}-${suffix}`;
	}

	static createInstance() {
		if (!customElements.get(StaticAreaItem.getTag())) {
			customElements.define(StaticAreaItem.getTag(), StaticAreaItem);
		}

		return document.createElement(this.getTag());
	}

	/**
	 * Provide a callback that will be executed when a static area item is connected to its owner element.
	 * The callback will be executed with 2 parameters - the static area item and the owner element.
	 * Example:
	 * StaticAreaItem.setMappingCallback((staticAreaItem, ownerElement) => {
	 *  staticAreaItem.setAttribute("someAttr", ownerElement.getAttribute("someAttr"));
	 * });
	 *
	 * @public
	 * @since 1.1.0
	 * @param callback
	 */
	static setMappingCallback(callback) {
		this.mappingCallback = callback;
	}
}

export default StaticAreaItem;
