import DropPlacement from "../../types/DropPlacement.js";
import Orientation from "../../types/Orientation.js";

const closestPlacement = (point: number, beforePoint: number, centerPoint: number, afterPoint: number) => {
	const distToBeforePoint = Math.abs(point - beforePoint);
	const distToCenterPoint = Math.abs(point - centerPoint);
	const distToAfterPoint = Math.abs(point - afterPoint);
	const closestPoint = Math.min(
		distToBeforePoint,
		distToCenterPoint,
		distToAfterPoint,
	);
	let dropPlacements: Array<DropPlacement> = [];

	switch (closestPoint) {
	case distToBeforePoint:
		dropPlacements = [DropPlacement.Before];
		break;
	case distToCenterPoint:
		dropPlacements = [DropPlacement.On, distToBeforePoint < distToAfterPoint ? DropPlacement.Before : DropPlacement.After];
		break;
	case distToAfterPoint:
		dropPlacements = [DropPlacement.After];
		break;
	}

	return dropPlacements;
};

const findClosestDropPosition = (elements: Array<HTMLElement>, point: number, layoutOrientation: Orientation) => {
	let shortestDist = Number.POSITIVE_INFINITY,
		closestElement: HTMLElement | null = null;

	// determine which element is most closest to the point
	for (let i = 0; i < elements.length; i++) {
		const el = elements[i];
		const {
			left, width, top, height,
		} = el.getBoundingClientRect();

		let elemCenter;
		if (layoutOrientation === Orientation.Vertical) {
			elemCenter = top + height / 2;
		} else { // Horizontal
			elemCenter = left + width / 2;
		}

		const distanceToCenter = Math.abs(point - elemCenter);

		if (distanceToCenter < shortestDist) {
			shortestDist = distanceToCenter;
			closestElement = el;
		}
	}

	if (!closestElement) {
		return null;
	}

	const {
		width, height, left, right, top, bottom,
	} = closestElement.getBoundingClientRect();
	let placements;

	if (layoutOrientation === Orientation.Vertical) {
		placements = closestPlacement(point, top, top + height / 2, bottom);
	} else { // Horizontal
		placements = closestPlacement(point, left, left + width / 2, right);
	}

	return {
		element: closestElement,
		placements,
	};
};

export default findClosestDropPosition;
