const slash = require("slash");

function emptyModulePlugin({ emptyModules }) {
	return {
		name: "ui5-dev-empty-module-plugin",
		load(id) {
			if (emptyModules.some(mod => slash(id).includes(mod))) {
				return `export default ""`;
			}
			return null;
		},
	};
}

module.exports = emptyModulePlugin;
