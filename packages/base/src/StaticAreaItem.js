import StaticArea from "./StaticArea.js";

let staticAreaIndex = 1;

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
		let domNodeToRenderInCurrentControl;

		if (!this.currentStaticAreaPosition) {
			// Initial rendering of fragment
			this.currentStaticAreaPosition = this.constructor._staticAreaPosition;

			domNodeToRenderInCurrentControl = document.createElement("ui5-static-area-item");
			domNodeToRenderInCurrentControl.attachShadow({ mode: "open" });
			domNodeToRenderInCurrentControl.classList.add(`static-area-item-${this.currentStaticAreaPosition}`);

			StaticArea._getInstance().appendChild(domNodeToRenderInCurrentControl);
		} else {
			// Fragment is rendered and is invalidated
			domNodeToRenderInCurrentControl = document.querySelector(`ui5-static-area .static-area-item-${this.currentStaticAreaPosition}`);
		}

		this.ui5ElementContext.constructor.render(renderResult, domNodeToRenderInCurrentControl.shadowRoot, stylesToAdd, { eventContext: this.ui5ElementContext });
	}

	/**
	 * @protected
	 */
	_removeFragmentFromStaticArea() {
		const staticArea = StaticArea._getInstance();

		const staticAreaItemToRemove = staticArea.querySelector(`.static-area-item-${this.currentStaticAreaPosition}`);
		staticArea.removeChild(staticAreaItemToRemove);

		this.currentStaticAreaPosition = null;

		// remove static area
		if (staticArea.childElementCount < 1) {
			staticArea.destroy();

			// start new indexing
			staticAreaIndex = 1;
		}
	}

	/**
	 * @private
	 * @static
	 * Static method that returns the index of the next item in the static area.
	 */
	static get _staticAreaPosition() {
		return staticAreaIndex++;
	}

	/**
	 * @protected
	 * Returns reference to the DOM element where the current fragment is added.
	 */
	getDomRef() {
		return document.querySelector(`ui5-static-area .static-area-item-${this.currentStaticAreaPosition}`).shadowRoot;
	}
}

class StaticAreaItemElement extends HTMLElement {
	constructor() {
		super();
	}
}

customElements.define("ui5-static-area-item", StaticAreaItemElement);

export default StaticAreaItem;
