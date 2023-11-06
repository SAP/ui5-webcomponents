const name = "postcss-scope-vars";

const escapeVersion = version => "v" + version?.replaceAll(/[^0-9A-Za-z\-_]/g, "-");

module.exports = (options) => {
	return {
		postcssPlugin: name,
		prepare(opts) {
			const filePath = opts.root.source.input.file;
			let overrideVersion;
			if  (filePath.includes("overrides/@ui5/webcomponents-fiori")) {
				overrideVersion = require("@ui5/webcomponents-fiori/package.json").version;
			} else if  (filePath.includes("overrides/@ui5/webcomponents")) {
				overrideVersion = require("@ui5/webcomponents/package.json").version;
			}

			const versionStr = escapeVersion(overrideVersion || options?.version);

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
