const findNextPlacement = (item: HTMLElement, e: KeyboardEvent) => {
	let placement;
	let dropTarget;

	switch (e.key) {
	case "ArrowLeft":
	case "ArrowUp":
		placement = "Before";
		dropTarget = item.previousElementSibling as HTMLElement;
		break;
	case "ArrowRight":
	case "ArrowDown":
		placement = "After";
		dropTarget = item.nextElementSibling as HTMLElement;
		break;
	case "Home":
		placement = "Before";
		dropTarget = item.parentElement?.firstElementChild as HTMLElement;
		break;
	case "End":
		placement = "After";
		dropTarget = item.parentElement?.lastElementChild as HTMLElement;
		break;
	}

	return { placement, dropTarget };
};

export default findNextPlacement;
