// OpenUI5's Control.js subset
import getSharedResource from "../getSharedResource.js";
// contains all OpenUI5 and Web Component popups that are currently opened
const AllOpenedPopupsRegistry = getSharedResource("AllOpenedPopupsRegistry", { openedRegistry: [] });
const addOpenedPopup = (popup) => {
    AllOpenedPopupsRegistry.openedRegistry.push(popup);
};
const removeOpenedPopup = (popup) => {
    const index = AllOpenedPopupsRegistry.openedRegistry.indexOf(popup);
    if (index > -1) {
        AllOpenedPopupsRegistry.openedRegistry.splice(index, 1);
    }
};
const getTopmostPopup = () => {
    return AllOpenedPopupsRegistry.openedRegistry[AllOpenedPopupsRegistry.openedRegistry.length - 1];
};
const openNativePopover = (domRef) => {
    domRef.setAttribute("popover", "manual");
    domRef.showPopover();
};
const closeNativePopover = (domRef) => {
    if (domRef.hasAttribute("popover")) {
        domRef.hidePopover();
        domRef.removeAttribute("popover");
    }
};
const isNativePopoverOpen = (root = document) => {
    if (root.querySelector(":popover-open")) {
        return true;
    }
    return Array.from(root.querySelectorAll("*")).some(element => {
        const shadowRoot = element.shadowRoot;
        return shadowRoot && isNativePopoverOpen(shadowRoot);
    });
};
const patchOpen = (Popup) => {
    const origOpen = Popup.prototype.open;
    Popup.prototype.open = function open(...args) {
        origOpen.apply(this, args); // call open first to initiate opening
        const topLayerAlreadyInUse = isNativePopoverOpen();
        const openingInitiated = ["OPENING", "OPEN"].includes(this.getOpenState());
        if (openingInitiated && topLayerAlreadyInUse) {
            const element = this.getContent();
            if (element) {
                const domRef = element instanceof HTMLElement ? element : element?.getDomRef();
                if (domRef) {
                    openNativePopover(domRef);
                }
            }
        }
        addOpenedPopup(this);
    };
};
const patchClosed = (Popup) => {
    const _origClosed = Popup.prototype._closed;
    Popup.prototype._closed = function _closed(...args) {
        const element = this.getContent();
        const domRef = element instanceof HTMLElement ? element : element?.getDomRef();
        _origClosed.apply(this, args); // only then call _close
        if (domRef) {
            closeNativePopover(domRef); // unset the popover attribute and close the native popover, but only if still in DOM
        }
        removeOpenedPopup(this);
    };
};
const patchFocusEvent = (Popup) => {
    const origFocusEvent = Popup.prototype.onFocusEvent;
    Popup.prototype.onFocusEvent = function onFocusEvent(e) {
        // If the popup is the topmost one, we call the original focus event handler from the OpenUI5 Popup,
        // otherwise the focus event is handled by the Web Component Popup.
        if (this === getTopmostPopup()) {
            origFocusEvent.call(this, e);
        }
    };
};
const createGlobalStyles = () => {
    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(`.sapMPopup-CTX:popover-open { inset: unset; }`);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
};
const patchPopup = (Popup) => {
    patchOpen(Popup); // Popup.prototype.open
    patchClosed(Popup); // Popup.prototype._closed
    createGlobalStyles(); // Ensures correct popover positioning by OpenUI5 (otherwise 0,0 is the center of the screen)
    patchFocusEvent(Popup); // Popup.prototype.onFocusEvent
};
export { patchPopup, addOpenedPopup, removeOpenedPopup, getTopmostPopup, };
//# sourceMappingURL=patchPopup.js.map