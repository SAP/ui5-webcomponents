const path = require("path");
const name = "postcss-scope-vars";

const escapeVersion = version => "v" + version?.replaceAll(/[^0-9A-Za-z\-_]/g, "-");

/**
 * Tries to detect an override for a package
 * @param {*} filePath For example: /my_project/src/themes/overrides/@ui5/webcomponents/my_custom_theme/parameters-bundle.css
 * @returns 
 */
const getOverrideVersion = filePath => {
	console.log(filePath);
	if (!filePath.includes(`overrides${path.sep}`)) {
		return; // The "overrides/" directory is the marker
	}
	const override = filePath.split(`overrides${path.sep}`)[1]; // For example, this will be: @ui5/webcomponents/my_custom_theme/parameters-bundle.css
	if (!override) {
		return; // There must be other directories after overrides/, the path can't end with it
	}
	const parts = override.split(path.sep);
	if (parts.length < 3) {
		return; // There must be at least a directory for the theme that is being overridden (my_custom_theme) and the name of the CSS file after the name of the package that is overridden
	}
	const packageName = parts.slice(0, -2).join(path.sep); // After the last 2 parts are removed (my_custom_theme and parameters-bundle.css from the example), the rest is the package

	let overrideVersion;
	try {
		overrideVersion = require(`${packageName}${path.sep}package.json`).version;
	} catch (e) {
		console.log(`Error requiring package ${packageName}: ${e.message}`);
	}

	return overrideVersion;
}

module.exports = (options) => {
	return {
		postcssPlugin: name,
		prepare(opts) {
			const filePath = opts.root.source.input.file;
			const versionStr = escapeVersion(getOverrideVersion(filePath) || options?.version);

			return {
				Declaration: (declaration) => {
					if (declaration.__ui5_replaced) {
						return;
					}
					// add version after ui5
					const expr = /(--_?ui5)([^\,\:\)\s]+)/g
					declaration.prop = declaration.prop.replaceAll(expr, `$1-${versionStr}$2`)
					declaration.value = declaration.value.replaceAll(expr, `$1-${versionStr}$2`)
					declaration.__ui5_replaced = true;
				},
			};
		},
	};
};

module.exports.postcss = true;
