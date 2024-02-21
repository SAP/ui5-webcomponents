let lastTarget: HTMLElement | null = null;
let lastTargetDragOverStart = Date.now();
const LONG_DRAG_OVER_THRESHOLD = 1000;

const longDragOverHandler = (targetsSelector: string) => {
	return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(arg0: DragEvent, arg1: boolean) => any>) => {
		const origHandler = descriptor.value!;

		descriptor.value = function handleDragOver(e: DragEvent) {
			let isLongDragOver = false;

			if (e.target instanceof HTMLElement) {
				const currentTarget = e.target.closest<HTMLElement>(targetsSelector);

				if (currentTarget === lastTarget && Date.now() - lastTargetDragOverStart >= LONG_DRAG_OVER_THRESHOLD) {
					isLongDragOver = true;
				} else if (currentTarget !== lastTarget) {
					lastTarget = currentTarget;
					lastTargetDragOverStart = Date.now();
				}
			}

			origHandler.apply(this, [e, isLongDragOver]);
		};

		return descriptor;
	};
};

export default longDragOverHandler;
