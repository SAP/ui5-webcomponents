let staticAreaIndex = 1;
class StaticAreaItem extends HTMLElement {
	constructor() {
		super();
	}
}
class StaticAreaElement extends HTMLElement {
	constructor() {
		super();
	}
}

class StaticArea {
	constructor(_staticAreaTemplate, _staticAreaStyles, _renderMethod) {
		this.staticAreaTemplate = _staticAreaTemplate;
		this.staticAreaStyles = _staticAreaStyles;
		this.render = _renderMethod;
	}

	/**
	 * @protected
	 * Creates static area as first child of the body element or returns the existing one.
	 */
	static _getInstance() {
		let staticArea = document.querySelector("ui5-static-area");

		if (staticArea) {
			return staticArea;
		}

		// Create static area if it is not present
		const bodyElement = document.body;
		customElements.define("ui5-static-area", StaticAreaElement);
		staticArea = document.createElement("ui5-static-area");

		return bodyElement.insertBefore(staticArea, bodyElement.firstChild);
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
	 */
	removeFragmentFromStaticArea() {
		const staticAreaItemToRemove = document.querySelector(`static-area-item-${this.currentStaticAreaPosition}`);
		staticAreaItemToRemove.parentElement.removeChild(staticAreaItemToRemove);
	}

	/**
	 * @protected
	 */
	_updateFragment(ui5ElementContext) {
		const renderResult = this.staticAreaTemplate(ui5ElementContext),
			stylesToAdd = this.staticAreaStyles || false;
		let domNodeToRenderInCurrentControl;

		if (!this.currentStaticAreaPosition) {
			// Initial rendering of fragment
			this.currentStaticAreaPosition = this.constructor._staticAreaPosition;

			const nodeToRenderIn = this.constructor._getInstance();

			if (!customElements.get("ui5-static-area-item")) {
				customElements.define("ui5-static-area-item", StaticAreaItem);
			}

			domNodeToRenderInCurrentControl = document.createElement("ui5-static-area-item");

			domNodeToRenderInCurrentControl.attachShadow({ mode: "open" });

			domNodeToRenderInCurrentControl.classList.add(`static-area-item-${this.currentStaticAreaPosition}`);
			nodeToRenderIn.appendChild(domNodeToRenderInCurrentControl);
		} else {
			// Fragment is rendered and is invalidated
			domNodeToRenderInCurrentControl = document.querySelector(`ui5-static-area .static-area-item-${this.currentStaticAreaPosition}`);
		}

		ui5ElementContext.constructor.render(renderResult, domNodeToRenderInCurrentControl.shadowRoot, stylesToAdd, { eventContext: ui5ElementContext });
	}

	/**
	 * @protected
	 * Returns reference to the DOM element where the current fragment is added.
	 */
	getStaticAreaItemDomRef() {
		return document.querySelector(`ui5-static-area .static-area-item-${this.currentStaticAreaPosition}`).shadowRoot;
	}
};

export default StaticArea;