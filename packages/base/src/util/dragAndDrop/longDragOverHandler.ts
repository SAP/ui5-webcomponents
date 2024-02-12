let lastTarget: HTMLElement | null = null;
let lastTargetDragOverStart = Date.now();
const longDragOverThreshold = 1000;

const longDragOverHandler = (elementToTarget: (element: HTMLElement) => HTMLElement | null) => {
	return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(arg0: DragEvent, arg1: boolean) => any>) => {
		const origHandler = descriptor.value!;

		descriptor.value = function handleDragOver(e: DragEvent) {
			if (!(e.target instanceof HTMLElement)) {
				return;
			}

			const currentTarget = elementToTarget(e.target);

			if (!currentTarget) {
				return;
			}

			let isLongDragOver = false;

			if (currentTarget === lastTarget && Date.now() - lastTargetDragOverStart >= longDragOverThreshold) {
				isLongDragOver = true;
			}

			if (currentTarget !== lastTarget) {
				lastTarget = currentTarget;
				lastTargetDragOverStart = Date.now();
			}

			origHandler.apply(this, [e, isLongDragOver]);
		};

		return descriptor;
	};
};

export default longDragOverHandler;
