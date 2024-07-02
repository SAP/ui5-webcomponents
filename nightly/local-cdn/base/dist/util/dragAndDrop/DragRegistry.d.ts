import type UI5Element from "../../UI5Element.js";
declare const setDraggedElement: (element: HTMLElement | null) => void;
type SetDraggedElementFunction = typeof setDraggedElement;
declare const DragRegistry: {
    subscribe: (subscriber: UI5Element) => void;
    unsubscribe: (subscriber: UI5Element) => void;
    addSelfManagedArea: (area: HTMLElement | ShadowRoot) => (element: HTMLElement | null) => void;
    removeSelfManagedArea: (area: HTMLElement | ShadowRoot) => void;
    getDraggedElement: () => HTMLElement | null;
};
export default DragRegistry;
export type { SetDraggedElementFunction, };
