// @ts-nocheck
const applyMatrix = (a: number, b: number, c: number, d: number, e: number, f: number, x: number, y: number): { x: number, y: number } => {
	return { x: a * x + c * y + e, y: b * x + d * y + f };
};

function translate(x: number, y: number, tx: number, ty: number) {
	return applyMatrix(1, 0, 0, 1, tx, ty, x, y);
}
function scale(x: number, y: number, scaleX: number, scaleY: number) {
	return applyMatrix(scaleX, 0, 0, scaleY, 0, 0, x, y);
}

// let translated = translate(8, 8, -466, -26)
// let scaled = scale(translated.x, translated.y, 0.7, 0.7)
// let translated2 = translate(scaled.x, scaled.y, 466, 26)

function scaleWithOrigin(x: number, y: number, scaleX: number, scaleY: number, originX: number, originY: number) {
	const translated = translate(x, y, -1 * originX, -1 * originY);
	const scaled = scale(translated.x, translated.y, scaleX, scaleY);
	const translated2 = translate(scaled.x, scaled.y, originX, originY);
	return translated2;
}

const calculateOrigCoordinates = (x: number, y: number, transformedElement: HTMLElement | undefined) => {
	if (!transformedElement) {
		return { x, y };
	}
	let {
		// eslint-disable-next-line prefer-const
		transform, transformOrigin, marginLeft, marginTop,
	} = window.getComputedStyle(transformedElement);
	const transformArgs = transform.replace("matrix(", "").replace(")", "").split(",").map(v => parseFloat(v));

	marginLeft = parseFloat(marginLeft);
	marginTop = parseFloat(marginTop);

	const [originX, originY] = transformOrigin.split(" ").map(_x => parseFloat(_x));
	return scaleWithOrigin(x, y, 1 / transformArgs[0], 1 / transformArgs[3], originX + (marginLeft as number), originY + (marginTop as number));
};

window.calculateOrigCoordinates = calculateOrigCoordinates;
export { scaleWithOrigin, calculateOrigCoordinates };
