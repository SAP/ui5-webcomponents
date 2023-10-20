const { defineConfig } = require('vite');
const virtualIndex = require("@ui5/webcomponents-tools/lib/dev-server/virtual-index-html-plugin.js");
const customHotUpdate = require("@ui5/webcomponents-tools/lib/dev-server/custom-hot-update-plugin.js");
const { existsSync } = require('fs');
const { dirname, join, resolve } = require('path');
const tsconfigPaths = require('vite-tsconfig-paths').default;
const {checker} = require('vite-plugin-checker');

const customResolver = (id, source, options) => {
	const isIconImporter = source.includes("packages/icons") || source.includes("packages/icons-tnt/") || source.includes("packages/icons-business-suite/")
	if (isIconImporter && id.startsWith("@ui5/webcomponents-base/dist")) {
		const importerRoot = source.replace(/packages\/icons.*/, "packages");
		const resolved = join(importerRoot, "base/src", id.replace("@ui5/webcomponents-base/dist/", "")).replace(".js", ".ts");
		return resolved;
	}
	
	if (isIconImporter && id.startsWith("../generated")) {
		const resolved = join(dirname(source), id).replace("/dist/", "/src/").replace(/\.js$/, ".ts");
		return resolved;
	}

	if (id.startsWith("./") || id.startsWith("../")) {
		//   `/sap/base/` and `sap/ui/core/` files imported from `src` are actually in dist
		//   except 4 files with are ts files in src and could be imported from `dist`
		const absoluteId = resolve(dirname(source), id);
		if (absoluteId.includes("/sap/base/") || absoluteId.includes("/sap/ui/core/")) {
			const virtSource = source.replace(/packages\/(\w+)\/src\//, "packages/$1/dist/");
			let resolved = join(dirname(virtSource), id);
			if (resolved.endsWith("sap/ui/core/Core.js") && resolved.includes("/dist/")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			if (resolved.endsWith("localization/dist/sap/base/i18n/Localization.js")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			if (resolved.endsWith("dist/sap/ui/core/Configuration.js")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			if (resolved.endsWith("dist/sap/ui/core/FormatSettings.js")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			if (resolved.endsWith("dist/sap/base/util/LoaderExtensions.js")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			return resolved;
		}
	}
}

module.exports = defineConfig(async () => {
	return {
		build: {
			emptyOutDir: false,
		},
		plugins: [await virtualIndex(), tsconfigPaths(), customHotUpdate(),
			checker({
				// e.g. use TypeScript check
				typescript: {
					tsconfigPath: "packages/fiori/tsconfig.json",
					buildMode: true,
				},
		  	}),
		],
		
		resolve: {
			alias: [
				{ find: /(\@ui5)(.*)/, replacement: "$1$2", customResolver },
				{ find: /(..\/generated)(.*)/, replacement: "$1$2", customResolver },
				// ../sap files are in dist, not src
				{ find: /^(\..*)/, replacement: "$1", customResolver },
			],
		}
	}
});
