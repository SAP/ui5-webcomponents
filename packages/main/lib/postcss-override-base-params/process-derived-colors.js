const postcss = require("postcss");
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

const extractName = varRef => {
	const result = varRef.match(/var\((--\w+),?.*\)/);
	return result[1];
};

const isCalcUsed = value => {
	return value.includes("calc(");
};

const isStatic = value => {
	return !value.includes("var(--");
};

const getColorValue = async (col) => {
	let colorValue = col instanceof Promise ? await col : await getPromiseFor(col);
	colorValue = colorValue.toRGB ? colorValue.toRGB() : colorValue;

	return colorValue;
}

const darken = async (col, value) => {
	const colorValue = await getColorValue(col);
	return lessDarken(new Color(colorValue.replace("#", "")), { value });
}

const lighten = async (col, value) => {
	const colorValue = await getColorValue(col);
	return lessLighten(new Color(colorValue.replace("#", "")), { value });
}

const contrast = async (color, dark, light, threshold) => {
	const colorValue = await getColorValue(color);
	const darkValue = await getColorValue(dark);
	const lightValue = await getColorValue(light);
	const col1 = new Color(colorValue.replace("#", ""));
	const col2 = new Color(darkValue.replace("#", ""));
	const col3 = new Color(lightValue.replace("#", ""));

	let thresholdValue;

	if (threshold) {
		thresholdValue = await getColorValue(threshold);
		thresholdValue = new Dimension(thresholdValue)
	}


	return lessContrast(col1, col2, col3, thresholdValue);
}

const fade = async (col, value) => {
	const colorValue = await getColorValue(col);
	return lessFade(new Color(colorValue.replace("#", "")), {
		value
	});
}

const saturate = async (col, value) => {
	const colorValue = await getColorValue(col);
	return lessSaturate(new Color(colorValue.replace("#", "")), {
		value
	});
}

const desaturate = async (col, value) => {
	const colorValue = await getColorValue(col);
	return lessDesaturate(new Color(colorValue.replace("#", "")), {
		value
	});
}

const mix = async (color1, color2, value) => {
	const color1Value = await getColorValue(color1);
	const color2Value = await getColorValue(color2);
	const col1 = new Color(color1Value.replace("#", ""))
	const col2 = new Color(color2Value.replace("#", ""))
	return lessMix(col1, col2, {
		value
	});
}

const spin = async (col, value) => {
	const colorValue = await getColorValue(col);
	return lessSpin(new Color(colorValue.replace("#", "")), {
		value
	});
}

const any = async (...derivations) => {
	let result = "";

	const derivedPromises = derivations.map(derivation => getColorValue(derivation.var));

	await Promise.all(derivedPromises).then((values) => {

		values.forEach((value, i) => {
			if (i > 0) {
				result += `, `;
			}
			result += `${derivations[i].static} ${value}`;
		})
	});

	return result;
}

const varPromises = new Map();
const unresolvedNames = new Set();
const outputVars = new Map();
const originalRefs = new Map();

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

		if (isStatic(varValue) || isCalcUsed(varValue)) {
			resolvePromiseFor(varName, varValue);
		} else { // Case: variable, that reference another variable, e.g. --a: var(--b);
			originalRefs.set(varName, varValue);

			let refName = extractName(varValue); // extract the variable that we depend on, e.g. --b
			let refPromise = getPromiseFor(refName);

			refPromise.then((refValue) => {
				resolvePromiseFor(varName, refValue);
			});
		}
	});
};

const processDerivations = async (derivations) => {
	const transformations = Object.keys(derivations).map(async newParam => {
		const transform = derivations[newParam];
		const derivedColor = await transform();
		resolvePromiseFor(newParam, derivedColor.toRGB ? derivedColor.toRGB() : derivedColor);
	});

	const timeoutPromise = new Promise(resolve => {
		setTimeout(resolve, 500);
	});

	await Promise.race([
		Promise.all(transformations),
		timeoutPromise
	]);
}

const restoreRefs = () => {
	Array.from(originalRefs.entries()).forEach(([key, value]) => {
		outputVars.set(key, value);
	})
};

const clearMaps = () => {
	varPromises.clear();
	unresolvedNames.clear();
	outputVars.clear();
	originalRefs.clear();
}

const pluginQueue = [];

module.exports = postcss.plugin('process derived colors', function (opts) {
	opts = opts || {};

	return async function (root) {
		const theme = root.source.input.from.match(/themes-next\/(\w+)\//)[1];

		const prevPlugins = [...pluginQueue];

		let pluginFinishedResolve;
		pluginFinished = new Promise(resolve => {
			pluginFinishedResolve = resolve;
		});
		pluginQueue.push(pluginFinished);

		await Promise.all(prevPlugins);
		console.log('plugin start:', theme);

		clearMaps();
		const result = [];
		// Step 1: Read entry params files
		let allParameters;
		// if (theme === "sap_belize" || theme === "sap_fiori_3") {
			allParameters = root.toString();
		// } else {
		// 	pluginFinishedResolve();
		// 	return pluginFinished;
		// }

		// collect derivation functions
		const derivationFactories = require(`../../src/themes-next/${theme}/derived-colors`);
		let derivations = {};
		derivationFactories.forEach(factory => {
			Object.assign(derivations, factory({ darken, lighten, contrast, fade, saturate, desaturate, mix, spin, any }))
		});

		// Step 2: Find all vars and which are unresolved (has not calculated value)
		findCSSVars(allParameters);

		// Step 3: Process derivations
		await processDerivations(derivations);
		console.log({unresolvedNames});
		// Step 4: Restore refs
		restoreRefs();
		// Step 4: Output the result
		Array.from(outputVars.entries()).forEach(([key, value]) => {
			result.push(`${key}: ${value};`)
		});

		const newRoot = postcss.parse(`:root { ${result.join("\n") }}`);

		root.removeAll();
		root.append(...newRoot.nodes);
		console.log('plugin end:', theme);

		pluginFinishedResolve();
		return pluginFinished;
	}
})


// Worst case
// "--sapUiSegmentedButtonFooterBorderColor": () => lighten("--sapUiButtonBorderColor", 8),

// --sapUiButtonBorderColor: var(--sapButton_BorderColor);

// "--sapButton_BorderColor": () => darken("--sapButton_Background", 30), //should be #ababab

// "--sapButton_Background": () => darken("--sapPrimary4", 3), //should be #f7f7f7

// --sapPrimary4: #ffffff;