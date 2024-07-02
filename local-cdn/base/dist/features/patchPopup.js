const patchFocusEvent = (Popup) => {
    const origFocusEvent = Popup.prototype.onFocusEvent;
    Popup.prototype.onFocusEvent = function onFocusEvent(e) {
        const isTypeFocus = e.type === "focus" || e.type === "activate";
        const target = e.target;
        if (!isTypeFocus || !target.closest("[ui5-popover],[ui5-responsive-popover],[ui5-dialog]")) {
            origFocusEvent.call(this, e);
        }
    };
};
const patchPopup = (Popup) => {
    patchFocusEvent(Popup); // Popup.prototype.onFocusEvent
};
export default patchPopup;
//# sourceMappingURL=patchPopup.js.map