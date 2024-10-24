type Control = {
    getDomRef: () => HTMLElement | null;
};
type OpenUI5Popup = {
    prototype: {
        open: (...args: any[]) => void;
        _closed: (...args: any[]) => void;
        getOpenState: () => "CLOSED" | "CLOSING" | "OPEN" | "OPENING";
        getContent: () => Control | HTMLElement | null;
        onFocusEvent: (e: FocusEvent) => void;
    };
};
declare const patchPopup: (Popup: OpenUI5Popup) => void;
export default patchPopup;
export type { OpenUI5Popup };
