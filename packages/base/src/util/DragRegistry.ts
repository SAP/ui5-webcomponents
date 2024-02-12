let draggedElement: HTMLElement | null = null;
let draggedComponent: HTMLElement | null = null;

const setDraggedComponent = (component: HTMLElement | null) => {
	draggedComponent = component;
};

const getDraggedElement = () => {
	return draggedComponent ?? draggedElement;
};

document.documentElement.addEventListener("dragstart", (e: DragEvent) => {
	if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
		return;
	}

	e.dataTransfer.dropEffect = "move";
	e.dataTransfer.effectAllowed = "move";

	draggedElement = e.target;
});

document.documentElement.addEventListener("dragend", () => {
	draggedElement = null;
	draggedComponent = null;
});

document.documentElement.addEventListener("drop", () => {
	draggedElement = null;
	draggedComponent = null;
});

let dragOverElement: HTMLElement | null = null;
let dragOverElementStart = Date.now();
const longDragOverThreshold = 1000;

const longDragOverHandler = () => {
	return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(arg0: DragEvent, arg1: boolean) => void>) => {
		const origHandler = descriptor.value!;

		descriptor.value = function handleDragOver(e: DragEvent) {
			const dragOverEventTarget = e.target;
			let isLongDragOver = false;

			if (dragOverEventTarget instanceof HTMLElement) {
				if (dragOverElement === dragOverEventTarget && Date.now() - dragOverElementStart >= longDragOverThreshold) {
					isLongDragOver = true;
				}

				if (dragOverElement !== dragOverEventTarget) {
					dragOverElement = dragOverEventTarget;
					dragOverElementStart = Date.now();
				}
			}

			origHandler.apply(this, [e, isLongDragOver]);
		};

		return descriptor;
	};
};

export {
	getDraggedElement,
	setDraggedComponent,
	longDragOverHandler,
};
