const fs = require("fs");
const registry = require("less/lib/less/functions/function-registry");
require("less/lib/less/functions/color");
const Color = require("less/lib/less/tree/color");
const Dimension = require("less/lib/less/tree/dimension");
const lessDarken = registry.get("darken");
const lessLighten = registry.get("lighten");
const lessContrast = registry.get("contrast");
const lessFade = registry.get("fade");
const lessSaturate = registry.get("saturate");
const lessDesaturate = registry.get("desaturate");
const lessMix = registry.get("mix");
const lessSpin = registry.get("spin");
const theme = process.argv[2] || "sap_fiori_3";
const baseParamsFile = `../../src/themes-next/${theme}/base-parameters-new.css`;
const globalParamsFile = `../../src/themes-next/${theme}/global-parameters-new.css`;
const derivations = require(`../../src/themes-next/${theme}/derived-colors`).derivations;

const readFile = (filePath) => fs.readFileSync(filePath).toString();

const extractName = varRef => {
	const result = varRef.match(/var\((--\w+)\)/);
	return result[1];
};

const isStatic = value => {
	return !value.includes("var(--");
};

global.darken = async (col, value) => {
	const colorValue = await getPromiseFor(col);
	return lessDarken(new Color(colorValue.replace("#", "")), {
		value
	});
}

global.lighten = async (col, value) => {
	let colorValue = col instanceof Promise ? await col : await getPromiseFor(col);
	colorValue = colorValue.toRGB ? colorValue.toRGB() : colorValue;

	return lessLighten(new Color(colorValue.replace("#", "")), { value });
}

global.contrast = async (color, dark, light, threshold) => {
	const colorValue = await getPromiseFor(color);
	const darkValue = await getPromiseFor(dark);
	const lightValue = await getPromiseFor(light);
	const thresholdValue = await getPromiseFor(threshold);

	const col1 = new Color(colorValue.replace("#", ""))
	const col2 = new Color(darkValue.replace("#", ""));
	const col3 = new Color(lightValue.replace("#", ""))

	return lessContrast(col1, col2, col3, new Dimension(thresholdValue));
}

global.fade = async (col, value) => {
	const colorValue = await getPromiseFor(col);
	return lessFade(new Color(colorValue.replace("#", "")), {
		value
	});
}

global.saturate = async (col, value) => {
	const colorValue = await getPromiseFor(col);
	return lessSaturate(new Color(colorValue.replace("#", "")), {
		value
	});
}

global.desaturate = async (col, value) => {
	const colorValue = await getPromiseFor(col);
	return lessDesaturate(new Color(colorValue.replace("#", "")), {
		value
	});
}

global.mix = async (color1, color2, value) => {
	;
	const color1Value = await getPromiseFor(color1);
	const color2Value = await getPromiseFor(color2);
	const col1 = new Color(color1Value.replace("#", ""))
	const col2 = new Color(color2Value.replace("#", ""))
	return lessMix(col1, col2, {
		value
	});
}

global.spin = async (col, value) => {
	const colorValue = await getPromiseFor(col);
	return lessSpin(new Color(colorValue.replace("#", "")), {
		value
	});
}

const varPromises = new Map();
const unresolvedNames = new Set();
const outputVars = new Map();

const getPromiseFor = varName => {
	if (varPromises.has(varName)) {
		return varPromises.get(varName);
	}

	let promiseResolveFn;

	const refPromise = new Promise((resolve, reject) => {
		promiseResolveFn = resolve;
	});

	refPromise.resolveFn = promiseResolveFn;
	varPromises.set(varName, refPromise);

	unresolvedNames.add(varName);

	return refPromise;
}

const resolvePromiseFor = (varName, varValue) => {
	if (varPromises.has(varName)) {
		varPromises.get(varName).resolveFn(varValue);
		delete varPromises.get(varName).resolveFn;
	} else {
		varPromises.set(varName, Promise.resolve(varValue));
	}

	outputVars.set(varName, varValue);
	unresolvedNames.delete(varName);
}

const findCSSVars = styleString => {
	const couples = styleString.match(/--[^:)]+:\s*[^;}]+/g) || [];

	couples.forEach(couple => {
		const [varName, varValue] = couple.split(/:\s*/);

		if (isStatic(varValue)) {
			resolvePromiseFor(varName, varValue);
		} else { // Case: variable, that reference another variable, e.g. --a: var(--b);
			let refName = extractName(varValue); // extract the variable that we depend on, e.g. --b
			let refPromise = getPromiseFor(refName);

			refPromise.then((refValue) => {
				resolvePromiseFor(varName, refValue);
			});
		}
	});
};

const processDerivations = (derivations) => {
	Object.keys(derivations).map(async newParam => {
		const transform = derivations[newParam];
		const derivedColor = await transform();
		resolvePromiseFor(newParam, derivedColor.toRGB());
	});
}

// Step 1: Read entry params files
const baseParameters = readFile(baseParamsFile);
const globalParameters = readFile(globalParamsFile);
const allParameters = baseParameters.concat(globalParameters);

// Step 2: Find all vars and which are unresolved (has not calculated value)
findCSSVars(allParameters);

// Step 3: Process derivations
processDerivations(derivations);

// Step 4: Output the result
setTimeout(_ => {
	Array.from(outputVars.entries()).forEach(([key, value]) => {
		console.log(`${key}: ${value};`)
	});
}, 500)

// Worst case
// "--sapUiSegmentedButtonFooterBorderColor": () => lighten("--sapUiButtonBorderColor", 8),

// --sapUiButtonBorderColor: var(--sapButton_BorderColor);

// "--sapButton_BorderColor": () => darken("--sapButton_Background", 30), //should be #ababab

// "--sapButton_Background": () => darken("--sapPrimary4", 3), //should be #f7f7f7

// --sapPrimary4: #ffffff;