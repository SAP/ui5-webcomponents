let draggedElement = null;
let globalHandlersAttached = false;
const subscribers = new Set();
const selfManagedDragAreas = new Set();
const ondragstart = (e) => {
    if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
        return;
    }
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    if (!selfManagedDragAreas.has(e.target)) {
        draggedElement = e.target;
    }
};
const ondragend = () => {
    draggedElement = null;
};
const ondrop = () => {
    draggedElement = null;
};
const setDraggedElement = (element) => {
    draggedElement = element;
};
const getDraggedElement = () => {
    return draggedElement;
};
const attachGlobalHandlers = () => {
    if (globalHandlersAttached) {
        return;
    }
    document.body.addEventListener("dragstart", ondragstart);
    document.body.addEventListener("dragend", ondragend);
    document.body.addEventListener("drop", ondrop);
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
};
export default DragRegistry;
//# sourceMappingURL=DragRegistry.js.map