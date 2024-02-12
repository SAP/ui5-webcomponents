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

export default longDragOverHandler;
