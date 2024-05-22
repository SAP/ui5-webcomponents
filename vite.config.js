const { defineConfig } = require('vite');
const virtualIndex = require("@ui5/webcomponents-tools/lib/dev-server/virtual-index-html-plugin.js");
const customHotUpdate = require("@ui5/webcomponents-tools/lib/dev-server/custom-hot-update-plugin.js");
const ssrDomShimLoader = require("@ui5/webcomponents-tools/lib/dev-server/ssr-dom-shim-loader.js");
const { existsSync } = require('fs');
const { dirname, join, resolve } = require('path');
const tsconfigPaths = require('vite-tsconfig-paths').default;
const { checker } = require('vite-plugin-checker');

const toPosixPath = (pathStr) => pathStr.split(path.sep).join(path.posix.sep);

const customResolver = (id, source) => {
    const isIconImporter = source.includes("packages/icons") ||
        source.includes("packages/icons-tnt/") ||
        source.includes("packages/icons-business-suite/");

    const resolvePath = (base, replacement) => join(base, replacement).replace(".js", ".ts");

    if (isIconImporter) {
        if (id.startsWith("@ui5/webcomponents-base/dist")) {
            const importerRoot = source.replace(/packages\/icons.*/, "packages");
            return resolvePath(importerRoot, `base/src/${id.replace("@ui5/webcomponents-base/dist/", "")}`);
        }

        if (id.startsWith("../generated")) {
            let absoluteId = join(dirname(source), id);
            absoluteId = toPosixPath(absoluteId);
            return absoluteId.replace("/dist/", "/src/").replace(/\.js$/, ".ts");
        }
    }

    if (id.endsWith(".json")) {
        let absoluteId = join(dirname(source), id);
        absoluteId = toPosixPath(absoluteId);
        return absoluteId.replace("/src/", "/dist/");
    }

    if (id.startsWith("./") || id.startsWith("../")) {
        let absoluteId = resolve(dirname(source), id);
        absoluteId = toPosixPath(absoluteId);

        if (absoluteId.includes("/sap/base/") || absoluteId.includes("/sap/ui/core/")) {
            const virtSource = source.replace(/packages\/(\w+)\/src\//, "packages/$1/dist/");
            let resolved = join(dirname(virtSource), id);
            resolved = toPosixPath(resolved);

            const specialCases = [
                "sap/ui/core/Core.js",
                "localization/dist/sap/base/i18n/Localization.js",
                "dist/sap/ui/core/Configuration.js",
                "dist/sap/ui/core/FormatSettings.js",
                "dist/sap/base/util/LoaderExtensions.js",
                "dist/sap/base/util/ObjectPath.js"
            ];

            for (const specialCase of specialCases) {
                if (resolved.endsWith(specialCase)) {
                    return resolved.replace("/dist/", "/src/").replace(".js", ".ts");
                }
            }

            return resolved;
        }
    }

    if (source.includes("fiori/src/") && id.includes("/illustrations") && !id.includes("AllIllustrations") && id.startsWith(".")) {
        let absoluteId = resolve(dirname(source), id);
        absoluteId = toPosixPath(absoluteId);
        return absoluteId.replace("/src/", "/dist
