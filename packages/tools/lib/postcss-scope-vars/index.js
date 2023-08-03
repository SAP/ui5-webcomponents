const name = "postcss-scope-vars";

module.exports = (options) => {
	console.log({options});
	options = Object.assign({}, options);
	const versionStr = "v" + options?.version?.replaceAll(".", "-");
	return {
		postcssPlugin: name,
		prepare() {
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
