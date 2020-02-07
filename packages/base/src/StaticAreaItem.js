import { getStaticAreaInstance, removeStaticArea } from "./StaticArea.js";

const observers = new WeakMap();

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
			this.staticAreaItemDomRef.classList.add(this.ui5ElementContext._id); // used for getting the popover in the tests

			getStaticAreaInstance().appendChild(this.staticAreaItemDomRef);
		}

		this.ui5ElementContext.constructor.render(renderResult, this.staticAreaItemDomRef.shadowRoot, stylesToAdd, { eventContext: this.ui5ElementContext });

		// Clear the children of the StaticAreaItem
		this._removeAllChildren();

		// Clone the children of the mirrored slots as children of the StaticAreaItem
		const mirroredSlotsNames = this.ui5ElementContext.constructor.getMetadata().getMirroredSlotsNames();
		mirroredSlotsNames.forEach(mirroredSlotName => {
			this.ui5ElementContext[mirroredSlotName].forEach(child => {
				this._addChild(child);
			});
		});
	}

	_removeAllChildren() {
		[...this.staticAreaItemDomRef.childNodes].forEach(child => {
			this._removeChild(child);
		});
	}

	_removeChild(child) {
		const observer = observers.get(child);
		observer && observer.disconnect();
		this.staticAreaItemDomRef.removeChild(child);
	}

	_addChild(child) {
		const clone = child.cloneNode(true);
		const observer = new MutationObserver(mutationsList => {
			mutationsList.forEach(rec => {
				if (rec.type === "attributes") {
					const attName = rec.attributeName;
					clone.setAttribute(attName, child.getAttribute(attName));
				} else {
					clone.innerHTML = child.innerHTML;
				}
			});
		});
		observers.set(child, observer);
		observer.observe(child, { attributes: true, childList: true, subtree: true });
		this.staticAreaItemDomRef.appendChild(clone);
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

	get isUI5Element() {
		return true;
	}
}

if (!customElements.get("ui5-static-area-item")) {
	customElements.define("ui5-static-area-item", StaticAreaItemElement);
}

export default StaticAreaItem;
