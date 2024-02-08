import DropPlacement from "../types/DropPlacement.js";
import Orientation from "../types/Orientation.js";

const getElementAtCoordinate = (elements: Array<HTMLElement>, point: number, layoutOrientation: Orientation, maxNestingLevel: number) => {
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
	let dropPlacement = DropPlacement.On;

	if (layoutOrientation === Orientation.Vertical) {
		const distanceToTopBorder = Math.abs(point - top),
			distanceToCenter = Math.abs(point - (top + height / 2)),
			distanceToBottomBorder = Math.abs(point - bottom);

		const shortestDistance = Math.min(
			distanceToTopBorder,
			// eslint-disable-next-line no-warning-comments
			maxNestingLevel > 0 ? distanceToCenter : distanceToTopBorder, // TODO: integrate with DropIndicator
			distanceToBottomBorder,
		);

		switch (shortestDistance) {
		case distanceToTopBorder:
			dropPlacement = DropPlacement.Before;
			break;
		case distanceToBottomBorder:
			dropPlacement = DropPlacement.After;
			break;
		}
	} else { // Horizontal
		const distanceToLeftBorder = Math.abs(point - left),
			distanceToCenter = Math.abs(point - (left + width / 2)),
			distanceToRightBorder = Math.abs(point - right);

		const shortestDistance = Math.min(
			distanceToLeftBorder,
			maxNestingLevel > 0 ? distanceToCenter : distanceToLeftBorder,
			distanceToRightBorder,
		);

		switch (shortestDistance) {
		case distanceToLeftBorder:
			dropPlacement = DropPlacement.Before;
			break;
		case distanceToCenter:
			dropPlacement = DropPlacement.On;
			break;
		case distanceToRightBorder:
			dropPlacement = DropPlacement.After;
			break;
		}
	}

	return {
		closestElement,
		dropPlacement,
	};
};

export default getElementAtCoordinate;
