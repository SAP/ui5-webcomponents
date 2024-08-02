import MovePlacement from "../../types/MovePlacement.js";
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
	let placements: Array<MovePlacement> = [];

	switch (closestPoint) {
	case distToBeforePoint:
		placements = [MovePlacement.Before];
		break;
	case distToCenterPoint:
		placements = [MovePlacement.On, distToBeforePoint < distToAfterPoint ? MovePlacement.Before : MovePlacement.After];
		break;
	case distToAfterPoint:
		placements = [MovePlacement.After];
		break;
	}

	return placements;
};

const findClosestPosition = (elements: Array<HTMLElement>, point: number, layoutOrientation: Orientation) => {
	let shortestDist = Number.POSITIVE_INFINITY;
	let closestElement: HTMLElement | null = null;

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

export default findClosestPosition;
