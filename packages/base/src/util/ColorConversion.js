/**
 *
 * @param {String} color Color in one of the following formats: RGBA or HEX
 */
const getRGBColor = color => {
	if (color.startsWith("rgba")) {
		return RGBAToRGB(color);
	}

	if (color.startsWith("rgb")) {
		return RGBToRGB(color);
	}

	// HEX
	if (color.indexOf("#") > -1) {
		color = color.slice(1, color.length);
	}
	return HEXToRGB(color);
};

const RGBAToRGB = color => {
	const openingBracketIndex = color.indexOf("("),
		commasIndexes = [];

	for (let i = 0; i < color.length; i++) {
		if (color[i] === ",") {
			commasIndexes.push(i);
		}
	}

	return {
		r: parseInt(color.slice(openingBracketIndex + 1, commasIndexes[0]).trim()),
		g: parseInt(color.slice(commasIndexes[0] + 1, commasIndexes[1]).trim()),
		b: parseInt(color.slice(commasIndexes[1] + 1, commasIndexes[2]).trim()),
	};
};

const RGBToRGB = color => {
	const openingBracketIndex = color.indexOf("("),
		closingBraketIndex = color.indexOf(")"),
		commasIndexes = [];

	for (let i = 0; i < color.length; i++) {
		if (color[i] === ",") {
			commasIndexes.push(i);
		}
	}

	return {
		r: parseInt(color.slice(openingBracketIndex + 1, commasIndexes[0]).trim()),
		g: parseInt(color.slice(commasIndexes[0] + 1, commasIndexes[1]).trim()),
		b: parseInt(color.slice(commasIndexes[1] + 1, closingBraketIndex).trim()),
	};
};

const HSLToRGB = (color = {
	h: undefined,
	s: undefined,
	l: undefined,
}) => {
	// Formula taken from https://www.rapidtables.com/convert/color/hsl-to-rgb.html
	const C = (1 - Math.abs((2 * color.l) - 1)) * color.s,
		X = C * (1 - Math.abs(((color.h / 60) % 2) - 1)),
		m = color.l - C / 2;

	let tempColor = {};
	switch (Math.round(color.h / 60)) {
	// 0 ≤ H < 60
	case 0:
		tempColor = {
			r: C,
			g: X,
			b: 0,
		};
		break;

	// 60 ≤ H < 120
	case 1:
		tempColor = {
			r: X,
			g: C,
			b: 0,
		};
		break;

	// 120 ≤ H < 180
	case 2:
		tempColor = {
			r: 0,
			g: C,
			b: X,
		};
		break;

	// 180 ≤ H < 240
	case 3:
		tempColor = {
			r: 0,
			g: X,
			b: C,
		};
		break;

	// 240 ≤ H < 300
	case 4:
		tempColor = {
			r: X,
			g: 0,
			b: C,
		};
		break;

	// 300 ≤ H < 360
	default:
		tempColor = {
			r: C,
			g: 0,
			b: X,
		};
	}

	return {
		r: Math.floor((tempColor.r + m) * 255),
		g: Math.floor((tempColor.g + m) * 255),
		b: Math.floor((tempColor.b + m) * 255),
	};
};

const HEXToRGB = hex => {
	// Please make sure you pass a valid 6 digit hex color
	// In the implementation of this method we assume that the hex argument is a 6 digit valid hex color

	const rgbValues = {
		r: hex.substr(0, 2),
		g: hex.substr(2, 2),
		b: hex.substr(4, 2),
	};

	const rgbKeys = Object.keys(rgbValues);

	rgbKeys.forEach(key => {
		rgbValues[key] = parseInt(rgbValues[key], 16);
	});

	return rgbValues;
};

const RGBToHSL = (color = {
	r: undefined,
	g: undefined,
	b: undefined,
}) => {
	const R = color.r / 255,
		G = color.g / 255,
		B = color.b / 255,
		max = Math.max(R, G, B),
		min = Math.min(R, G, B),
		delta = max - min;

	let h,
		s;

	// Hue calculation
	if (delta === 0) {
		h = 0;
	} else if (max === R) {
		h = 60 * (((G - B) / delta) % 6);
	} else if (max === G) {
		h = 60 * (((B - R) / delta) + 2);
	} else if (max === B) {
		h = 60 * (((R - G) / delta) + 4);
	}

	// Lightness calculation
	const l = (max + min) / 2;

	// Saturation calculation
	if (delta === 0) {
		s = 0;
	} else {
		s = delta / (1 - Math.abs(2 * l - 1));
	}

	return {
		h,
		s,
		l,
	};
};

export {
	getRGBColor,
	HSLToRGB,
	HEXToRGB,
	RGBToHSL,
};
