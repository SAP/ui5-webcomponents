import MultipleDragGhostCss from "../../generated/css/MultipleDragGhost.css.js";
import { getI18nBundle } from "../../i18nBundle.js";
import { DRAG_DROP_MULTIPLE_TEXT, } from "../../generated/i18n/i18n-defaults.js";
const MIN_MULTI_DRAG_COUNT = 2;
let customDragElementPromise = null;
let draggedElement = null;
let globalHandlersAttached = false;
const subscribers = new Set();
const selfManagedDragAreas = new Set();
const ondragstart = (e) => {
    if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
        return;
    }
    if (!selfManagedDragAreas.has(e.target)) {
        draggedElement = e.target;
    }
    handleMultipleDrag(e);
};
const handleMultipleDrag = async (e) => {
    if (!customDragElementPromise || !e.dataTransfer) {
        return;
    }
    const dragElement = await customDragElementPromise;
    // Add to document body temporarily
    document.body.appendChild(dragElement);
    e.dataTransfer.setDragImage(dragElement, 0, 0);
    // Clean up the temporary element after the drag operation starts
    requestAnimationFrame(() => {
        dragElement.remove();
    });
};
const ondragend = () => {
    draggedElement = null;
    customDragElementPromise = null;
};
const ondrop = () => {
    draggedElement = null;
    customDragElementPromise = null;
};
const setDraggedElement = (element) => {
    draggedElement = element;
};
const getDraggedElement = () => {
    return draggedElement;
};
const createDefaultMultiDragElement = async (count) => {
    const dragElement = document.createElement("div");
    const i18nBundle = await getI18nBundle("@ui5/webcomponents-base");
    const dragElementShadow = dragElement.attachShadow({ mode: "open" });
    const styles = new CSSStyleSheet();
    styles.replaceSync(MultipleDragGhostCss);
    dragElementShadow.adoptedStyleSheets = [styles];
    dragElementShadow.textContent = i18nBundle.getText(DRAG_DROP_MULTIPLE_TEXT, count);
    return dragElement;
};
/**
 * Starts a multiple drag operation by creating a drag ghost element.
 * The drag ghost will be displayed when dragging multiple items.
 *
 * @param {number} count - The number of items being dragged.
 * @param {DragEvent} e - The drag event that triggered the operation.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const startMultipleDrag = (count, e) => {
    if (count < MIN_MULTI_DRAG_COUNT) {
        console.warn(`Cannot start multiple drag with count ${count}. Minimum is ${MIN_MULTI_DRAG_COUNT}.`); // eslint-disable-line
        return;
    }
    customDragElementPromise = createDefaultMultiDragElement(count);
};
const attachGlobalHandlers = () => {
    if (globalHandlersAttached) {
        return;
    }
    document.body.addEventListener("dragstart", ondragstart);
    document.body.addEventListener("dragend", ondragend);
    document.body.addEventListener("drop", ondrop);
    globalHandlersAttached = true;
};
const detachGlobalHandlers = () => {
    document.body.removeEventListener("dragstart", ondragstart);
    document.body.removeEventListener("dragend", ondragend);
    document.body.removeEventListener("drop", ondrop);
    globalHandlersAttached = false;
};
const subscribe = (subscriber) => {
    subscribers.add(subscriber);
    if (!globalHandlersAttached) {
        attachGlobalHandlers();
    }
};
const unsubscribe = (subscriber) => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0 && globalHandlersAttached) {
        detachGlobalHandlers();
    }
};
const addSelfManagedArea = (area) => {
    selfManagedDragAreas.add(area);
    return setDraggedElement;
};
const removeSelfManagedArea = (area) => {
    selfManagedDragAreas.delete(area);
};
const DragRegistry = {
    subscribe,
    unsubscribe,
    addSelfManagedArea,
    removeSelfManagedArea,
    getDraggedElement,
    startMultipleDrag,
};
export default DragRegistry;
export { startMultipleDrag, };
//# sourceMappingURL=DragRegistry.js.map