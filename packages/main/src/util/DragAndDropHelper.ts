import DropPlacement from "../types/DropPlacement.js";
import Orientation from "../types/Orientation.js";

const getElementAtCoordinate = (elements: Array<HTMLElement>, point: number, layoutOrientation: Orientation) => {
	let closestOffset = Number.NEGATIVE_INFINITY,
		closestElement: Element | null = null;

	// determine which element is most closest to the point
	for (let i = 0; i < elements.length; i++) {
		const el = elements[i];
		const {
			left, width, top, height,
		} = el.getBoundingClientRect();

		let offset = 0;
		if (layoutOrientation === Orientation.Vertical) {
			offset = point - top - height / 2;
		} else if (layoutOrientation === Orientation.Horizontal) {
			offset = point - left - width / 2;
		}

		if (offset <= 0 && offset > closestOffset) {
			closestOffset = offset;
			closestElement = el;
		}
	}

	if (!closestElement) {
		return null;
	}

	const {
		left, width, right, top, bottom,
	} = closestElement.getBoundingClientRect();

	let dropPlacement = DropPlacement.On;
	if (layoutOrientation === Orientation.Horizontal) {
		const distanceToLeftBorder = Math.abs(point - left),
			distanceToCenter = Math.abs((left + width / 2) - point),
			distanceToRightBorder = Math.abs(right - point);

		const shortestDistance = Math.min(
			distanceToLeftBorder,
			distanceToRightBorder,
			// this.maxNestingLevel > 0 ? distanceToCenter : distanceToLeftBorder,
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

	if (layoutOrientation === Orientation.Vertical) {
		const distanceToTopBorder = Math.abs(point - top),
			// distanceToBottomBorder = Math.abs(top - point);
			distanceToBottomBorder = Math.abs(bottom - point);

		const shortestDistance = Math.min(
			distanceToTopBorder,
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
	}

	return {
		closestElement,
		dropPlacement,
	};
};

export default getElementAtCoordinate;
