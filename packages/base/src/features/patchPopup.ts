// The lifecycle of Popup.js is open -> _opened -> close -> _closed, we're interested in the first (open) and last (_closed)
type OpenUI5Popup = {
	prototype: {
		open: (...args: any[]) => void,
		_closed: (...args: any[]) => void,
		getOpenState: () => "CLOSED" | "CLOSING" | "OPEN" | "OPENING",
		oContent: {
			getDomRef: () => HTMLElement,
			addDelegate: (delegate: DelegatesMap) => void,
			removeDelegate: (delegate: DelegatesMap) => void,
		},
	}
};

type DelegatesMap = { [key: string]: () => void; }
const delegatesRegistry = new Map<HTMLElement, DelegatesMap>();

/**
 * Ensures a unique delegate for each element, because removeDelegate expects the same object pased to addDelegate
 * @param el HTML element to use the popover API
 */
const getDelegate = (el: HTMLElement) => {
	if (!delegatesRegistry.has(el)) {
		const delegate = {
			"onAfterRendering": () => {
				openNativePopover(el);
			},
		};
		delegatesRegistry.set(el, delegate);
	}

	return delegatesRegistry.get(el)!;
};

const openNativePopover = (el: HTMLElement) => {
	el.setAttribute("popover", "manual");
	el.showPopover();
};

const closeNativePopover = (el: HTMLElement) => {
	if (el.hasAttribute("popover")) {
		el.hidePopover();
		el.removeAttribute("popover");
	}
};

const patchPopup = (Popup: OpenUI5Popup) => {
	// 1. Patch open (show the popover before all animations have started)
	const origOpen = Popup.prototype.open;
	Popup.prototype.open = function open(...args: any[]) {
		origOpen.apply(this, args); // call open first to initiate opening
		const topLayerAlreadyInUse = !!document.body.querySelector(":popover-open"); // check if there is already something in the top layer
		const openingInitiated = ["OPENING", "OPEN"].includes(this.getOpenState());
		if (openingInitiated && topLayerAlreadyInUse) {
			const el = this.oContent.getDomRef();
			openNativePopover(el);
			this.oContent.addDelegate(getDelegate(el)); // add onAfterRendering delegate to restore the "popover" attribute that will be removed by RenderManager on re-rendering
		}
	};

	// 2. Patch _closed (hide the popover after all animations have ended)
	const _origClosed = Popup.prototype._closed;
	Popup.prototype._closed = function _closed(...args: any[]) {
		const el = this.oContent.getDomRef();
		if (delegatesRegistry.has(el)) {
			this.oContent.removeDelegate(getDelegate(el)); // remove the onAfterRendering delegate before calling _close to avoid issues
			delegatesRegistry.delete(el);
		}
		_origClosed.apply(this, args); // only then call _close
		if (el) {
			closeNativePopover(el); // unset the popover attribute and close the native popover, but only if still in DOM
		}
	};

	// 3. Create the required CSS for the expected coordinate system
	const stylesheet = new CSSStyleSheet();
	stylesheet.replaceSync(`.sapMPopup-CTX:popover-open { inset: unset; }`);
	document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
};

export default patchPopup;
export type { OpenUI5Popup };
