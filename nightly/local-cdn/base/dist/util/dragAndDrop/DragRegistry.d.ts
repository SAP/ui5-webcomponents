import type UI5Element from "../../UI5Element.js";
import type MovePlacement from "../../types/MovePlacement.js";
declare const setDraggedElement: (element: HTMLElement | null) => void;
type SetDraggedElementFunction = typeof setDraggedElement;
type DragAndDropSettings = {
    /**
     * Allow cross-browser and file drag and drop.
     */
    crossDnD?: boolean;
    /**
     * Pass the original event in the event parameters.
     */
    originalEvent?: boolean;
};
type MoveEventDetail = {
    originalEvent: Event;
    source: {
        element: HTMLElement;
    };
    destination: {
        element: HTMLElement;
        placement: `${MovePlacement}`;
    };
};
declare const DragRegistry: {
    subscribe: (subscriber: UI5Element) => void;
    unsubscribe: (subscriber: UI5Element) => void;
    addSelfManagedArea: (area: HTMLElement | ShadowRoot) => (element: HTMLElement | null) => void;
    removeSelfManagedArea: (area: HTMLElement | ShadowRoot) => void;
    getDraggedElement: () => HTMLElement | null;
};
export default DragRegistry;
export type { SetDraggedElementFunction, DragAndDropSettings, MoveEventDetail, };
