type OpenUI5Popup = {
    setInitialZIndex: (zIndex: number) => void;
    getNextZIndex: () => number;
    prototype: {
        onFocusEvent: (e: FocusEvent) => void;
    };
};
declare const patchPopup: (Popup: OpenUI5Popup) => void;
export default patchPopup;
export type { OpenUI5Popup };
