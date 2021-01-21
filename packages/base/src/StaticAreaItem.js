import RenderScheduler from "./RenderScheduler.js";
import getEffectiveStyle from "./theming/getEffectiveStyle.js";
import executeTemplate from "./renderer/executeTemplate.js";
import isLegacyBrowser from "./isLegacyBrowser.js";
import getConstructableStyle from "./theming/getConstructableStyle.js";

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
	}

	/**
	 * Updates the shadow root of the static area item with the latest state, if rendered
	 * @protected
	 */
	update() {
		if (this._rendered) {
			this._updateContentDensity();
			this._updateShadowRoot();
		}
	}

	/**
	 * Sets the correct content density based on the owner element's state
	 * @private
	 */
	_updateContentDensity() {
		if (this.ownerElement.isCompact) {
			this.classList.add("sapUiSizeCompact");
			this.classList.add("ui5-content-density-compact");
		} else {
			this.classList.remove("sapUiSizeCompact");
			this.classList.remove("ui5-content-density-compact");
		}
	}

	/**
	 * Renders the template in the shadow root of the static area item
	 * @private
	 */
	_updateShadowRoot() {
		const renderResult = executeTemplate(this.ownerElement.constructor.staticAreaTemplate, this.ownerElement);
		let stylesToPrepend;

		if (document.adoptedStyleSheets) { // Chrome
			this.shadowRoot.adoptedStyleSheets = getConstructableStyle(this.ownerElement.constructor, true);
		} else if (!isLegacyBrowser()) { // FF, Safari
			stylesToPrepend = getEffectiveStyle(this.ownerElement.constructor, true);
		}

		this.ownerElement.constructor.render(renderResult, this.shadowRoot, stylesToPrepend, { eventContext: this.ownerElement });
	}

	/**
	 * @protected
	 * Returns reference to the DOM element where the current fragment is added.
	 */
	async getDomRef() {
		this._updateContentDensity();
		if (!this._rendered) {
			this._rendered = true;
			this._updateShadowRoot();
		}
		await RenderScheduler.whenDOMUpdated(); // Wait for the content of the ui5-static-area-item to be rendered
		return this.shadowRoot;
	}

	/**
	 * @protected
	 * @param refName
	 * @returns {Element}
	 */
	getStableDomRef(refName) {
		return this.shadowRoot.querySelector(`[data-ui5-stable=${refName}]`);
	}
}

if (!customElements.get("ui5-static-area-item")) {
	customElements.define("ui5-static-area-item", StaticAreaItem);
}

export default StaticAreaItem;
