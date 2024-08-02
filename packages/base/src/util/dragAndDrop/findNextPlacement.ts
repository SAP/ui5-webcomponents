const findNextPlacement = (items: Array<HTMLElement>, item: HTMLElement, e: KeyboardEvent) => {
	let placement;
	let index = items.indexOf(item);

	switch (e.key) {
	case "ArrowLeft":
	case "ArrowUp":
		placement = "Before";
		index--;
		break;
	case "ArrowRight":
	case "ArrowDown":
		placement = "After";
		index++;
		break;
	case "Home":
		placement = "Before";
		index = 0;
		break;
	case "End":
		placement = "After";
		index = items.length - 1;
		break;
	}

	const dropTarget = items[index];

	return { placement, dropTarget };
};

export default findNextPlacement;
