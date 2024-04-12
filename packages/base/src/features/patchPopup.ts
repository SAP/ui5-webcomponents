// OpenUI5's delegates object
type DelegatesMap = { [key: string]: () => void; }

// OpenUI5's Element.js subset
type Element = {
	getDomRef: () => HTMLElement | null,
	addDelegate: (delegate: DelegatesMap) => void,
	removeDelegate: (delegate: DelegatesMap) => void,
}

// The lifecycle of Popup.js is open -> _opened -> close -> _closed, we're interested in the first (open) and last (_closed)
type OpenUI5Popup = {
	prototype: {
		open: (...args: any[]) => void,
		_closed: (...args: any[]) => void,
		getOpenState: () => "CLOSED" | "CLOSING" | "OPEN" | "OPENING",
		getContent: () => Element, // this is the OpenUI5 Element/Control instance that opens the Popup (usually sap.m.Popover/sap.m.Dialog)
	}
};

const delegatesRegistry = new Map<HTMLElement, DelegatesMap>();

/**
 * Ensures a unique delegate for each element, because removeDelegate expects the same object pased to addDelegate
 * @param domRef HTML element to use the popover API
 */
const getDelegate = (domRef: HTMLElement) => {
	if (!delegatesRegistry.has(domRef)) {
		const delegate = {
			"onAfterRendering": () => {
				openNativePopover(domRef);
			},
		};
		delegatesRegistry.set(domRef, delegate);
	}

	return delegatesRegistry.get(domRef)!;
};

const openNativePopover = (domRef: HTMLElement) => {
	domRef.setAttribute("popover", "manual");
	domRef.showPopover();
};

const closeNativePopover = (domRef: HTMLElement) => {
	if (domRef.hasAttribute("popover")) {
		domRef.hidePopover();
		domRef.removeAttribute("popover");
	}
};

const patchOpen = (Popup: OpenUI5Popup) => {
	const origOpen = Popup.prototype.open;
	Popup.prototype.open = function open(...args: any[]) {
		origOpen.apply(this, args); // call open first to initiate opening
		const topLayerAlreadyInUse = !!document.body.querySelector(":popover-open"); // check if there is already something in the top layer
		const openingInitiated = ["OPENING", "OPEN"].includes(this.getOpenState());
		if (openingInitiated && topLayerAlreadyInUse) {
			const element = this.getContent();
			if (element) {
				const domRef = element.getDomRef();
				if (domRef) {
					openNativePopover(domRef);
					element.addDelegate(getDelegate(domRef)); // add onAfterRendering delegate to restore the "popover" attribute that will be removed by RenderManager on re-rendering
				}
			}
		}
	};
};

const patchClosed = (Popup: OpenUI5Popup) => {
	const _origClosed = Popup.prototype._closed;
	Popup.prototype._closed = function _closed(...args: any[]) {
		const element = this.getContent();
		const domRef = element.getDomRef();
		if (domRef && delegatesRegistry.has(domRef)) {
			element.removeDelegate(getDelegate(domRef)); // remove the onAfterRendering delegate before calling _close to avoid issues
			delegatesRegistry.delete(domRef);
		}
		_origClosed.apply(this, args); // only then call _close
		if (domRef) {
			closeNativePopover(domRef); // unset the popover attribute and close the native popover, but only if still in DOM
		}
	};
};

const createGlobalStyles = () => {
	const stylesheet = new CSSStyleSheet();
	stylesheet.replaceSync(`.sapMPopup-CTX:popover-open { inset: unset; }`);
	document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
};

const patchPopup = (Popup: OpenUI5Popup) => {
	patchOpen(Popup); // Popup.prototype.open
	patchClosed(Popup); // Popup.prototype._closed
	createGlobalStyles(); // Ensures correct popover positioning by OpenUI5 (otherwise 0,0 is the center of the screen)
};

export default patchPopup;
export type { OpenUI5Popup };
