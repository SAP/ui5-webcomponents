import { globby } from "globby";
import * as esbuild from 'esbuild'
import * as fs from "fs";
import * as path from "path";
import { writeFile, mkdir } from "fs/promises";
import postcss from "postcss";
import combineDuplicatedSelectors from "../postcss-combine-duplicated-selectors/index.js"
import { writeFileIfChanged, getFileContent } from "./shared.mjs";
import scopeVariables from "./scope-variables.mjs";

const processThemingPackageFile = async (f) => {
    const selector = ':root';
    const result = await postcss().process(f.text);

    const newRule = postcss.rule({ selector });

    result.root.walkRules(selector, rule => {
        rule.walkDecls(decl => {
            if (!decl.prop.startsWith('--sapFontUrl')) {
                newRule.append(decl.clone());
            }
        });
    });

    return newRule.toString();
};

const processComponentPackageFile = async (f, packageJSON) => {
    const result = await postcss(combineDuplicatedSelectors).process(f.text);

    return scopeVariables(result.css, packageJSON, f.path);
}

const createScopingPlugin = (packageJSON, tsMode = false) => {
    const extension = tsMode ? ".css.ts" : ".css.js";

    return {
        name: 'scoping',
        setup(build) {
            build.initialOptions.write = false;

            build.onEnd(async (result) => {
                const fileProcessingPromises = result.outputFiles.map(async (f) => {
                    let newText = f.path.includes("packages/theming") ? await processThemingPackageFile(f) : await processComponentPackageFile(f, packageJSON);

                    // JSON
                    const jsonPath = f.path.replace(/dist[\/\\]css/, "dist/generated/assets").replace(".css", ".css.json");
                    await writeFileIfChanged(jsonPath, JSON.stringify(newText));

                    // JS/TS
                    const jsPath = f.path.replace(/dist[\/\\]css/, "src/generated/").replace(".css", extension);
                    const jsContent = getFileContent(packageJSON.name, "\`" + newText + "\`");

                    await Promise.all([
                        await mkdir(path.dirname(f.path), { recursive: true }),
                        await mkdir(path.dirname(jsonPath), { recursive: true })
                    ]);

                    await Promise.all([
                        await writeFile(f.path, newText),
                        await writeFileIfChanged(jsonPath, JSON.stringify(newText)),
                        await writeFileIfChanged(jsPath, jsContent),
                    ])
                });

                await Promise.all(fileProcessingPromises);
            })
        },
    };
};

const processThemes = async (options = {}) => {
    const {
        watch = false,
        packagePath = "./package.json",
        inputPattern = "src/**/parameters-bundle.css",
        outdir = 'dist/css',
        outbase = 'src',
        tsMode = false,
    } = options;

    const packageJSON = JSON.parse(fs.readFileSync(packagePath));
    const inputFiles = await globby([inputPattern]);

    const config = {
        entryPoints: inputFiles,
        bundle: true,
        minify: true,
        outdir,
        outbase,
        plugins: [
            createScopingPlugin(packageJSON, tsMode),
        ],
        external: ["*.ttf", "*.woff", "*.woff2"],
    };

    if (watch) {
        let ctx = await esbuild.context(config);
        await ctx.watch();
        console.log('watching...');
        return ctx;
    } else {
        const result = await esbuild.build(config);
        return result;
    }
};

// If this file is run directly (not imported as a module)
if (import.meta.url === `file://${process.argv[1]}`) {
    const restArgs = process.argv.slice(2);
    const watchMode = restArgs.includes("-w");

    processThemes({ watch: watchMode })
        .then(() => {
            if (!watchMode) {
                console.log('Theme processing completed.');
            }
        })
        .catch(console.error);
}

export default processThemes;
export { processThemes, createScopingPlugin, processThemingPackageFile, processComponentPackageFile };