const postcss = require("postcss");
const lessFunctionsFactory = require("./less-functions");

const isCalcUsed = value => {
	return value.includes("calc(");
};

const isStatic = value => {
	return !value.includes("var(--");
};

const getNormalizedColorValue = colorValue => {
	return colorValue.toCSS ? colorValue.toCSS() : colorValue;
}

const getColorValue = async (col) => {
	let colorValue = col instanceof Promise ? await col : await getPromiseFor(col);
	colorValue = getNormalizedColorValue(colorValue);

	return colorValue;
}

const lessFunctions = lessFunctionsFactory(getColorValue);

const varPromises = new Map();
const unresolvedNames = new Set();
const outputVars = new Map();
const originalRefs = new Map();

const extractName = varRef => {
	const result = varRef.match(/var\((--\w+),?.*\)/);
	return result[1];
};

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
		const resultValue = getNormalizedColorValue(derivedColor);

		resolvePromiseFor(newParam, resultValue);
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
		const match = root.source.input.from.match(/themes\/(\w+)\//) || root.source.input.from.match(/themes\\(\w+)\\/);
		const theme = match[1];

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
		let allParameters = root.toString();

		// Step2: Collect derivation functions
		const derivationFactories = require(`../../src/themes/${theme}/derived-colors`);
		let derivations = {};
		derivationFactories.forEach(factory => {
			Object.assign(derivations, factory(lessFunctions));
		});

		// Step 3: Find all vars and which are unresolved (has not calculated value)
		findCSSVars(allParameters);

		// Step 4: Process derivations
		await processDerivations(derivations);
		console.log({unresolvedNames});

		// Step 5: Restore refs
		restoreRefs();

		// Step 6: Output the result
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
});
