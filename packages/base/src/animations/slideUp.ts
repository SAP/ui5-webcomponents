import animate, { duration } from "./animate.js";

const slideUp = async (element: HTMLElement) => {
	// Get Computed styles
	let computedStyles: CSSStyleDeclaration,
		paddingTop: number,
		paddingBottom: number,
		marginTop: number,
		marginBottom: number,
		height: number;

	// Store inline styles
	let storedOverflow: string,
		storedPaddingTop: string,
		storedPaddingBottom: string,
		storedMarginTop: string,
		storedMarginBottom: string,
		storedHeight: string;

	const animation = animate({
		beforeStart: () => {
			// Get Computed styles
			const el = element;
			computedStyles = getComputedStyle(el);
			paddingTop = parseFloat(computedStyles.paddingTop);
			paddingBottom = parseFloat(computedStyles.paddingBottom);
			marginTop = parseFloat(computedStyles.marginTop);
			marginBottom = parseFloat(computedStyles.marginBottom);
			height = parseFloat(computedStyles.height);

			// Store inline styles
			storedOverflow = el.style.overflow;
			storedPaddingTop = el.style.paddingTop;
			storedPaddingBottom = el.style.paddingBottom;
			storedMarginTop = el.style.marginTop;
			storedMarginBottom = el.style.marginBottom;
			storedHeight = el.style.height;

			el.style.overflow = "hidden";
		},
		duration,
		element,
		advance: progress => {
			element.style.paddingTop = `${paddingTop - (paddingTop * progress)}px`;
			element.style.paddingBottom = `${paddingBottom - (paddingBottom * progress)}px`;
			element.style.marginTop = `${marginTop - (marginTop * progress)}px`;
			element.style.marginBottom = `${marginBottom - (marginBottom * progress)}px`;
			element.style.height = `${height - (height * progress)}px`;
		},
	});

	const reason = await animation.promise();

	if (!(reason instanceof Error)) {
		// beforeStart is called before these assignments - "!" non-null assertion is safe.
		element.style.overflow = storedOverflow!;
		element.style.paddingTop = storedPaddingTop!;
		element.style.paddingBottom = storedPaddingBottom!;
		element.style.marginTop = storedMarginTop!;
		element.style.marginBottom = storedMarginBottom!;
		element.style.height = storedHeight!;
		element.style.display = "none";
	}

	return animation;
};

export default slideUp;
