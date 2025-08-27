import { globby } from "globby";
import * as esbuild from 'esbuild'
import * as fs from "fs";
import * as path from "path";
import { writeFile, mkdir } from "fs/promises";
import chokidar from "chokidar";
import scopeVariables from "./scope-variables.mjs";
import { writeFileIfChanged, getFileContent } from "./shared.mjs";

const createCustomPlugin = (packageJSON, tsMode = false) => {
    const extension = tsMode ? ".css.ts" : ".css.js";

    return {
        name: 'ui5-tools',
        setup(build) {
            build.initialOptions.write = false;

            build.onEnd(async (result) => {
                const fileProcessingPromises = result.outputFiles.map(async (f) => {
                    // scoping
                    let newText = scopeVariables(f.text, packageJSON);
                    newText = newText.replaceAll(/\\/g, "\\\\"); // Escape backslashes as they might appear in css rules
                    await mkdir(path.dirname(f.path), { recursive: true });

                    // JS/TS
                    const jsPath = f.path.replace(/dist[\/\\]css/, "src/generated/").replace(".css", extension);
                    const jsContent = getFileContent(packageJSON.name, "\`" + newText + "\`", true);

                    Promise.all([
                        await writeFile(f.path, newText),
                        await writeFileIfChanged(jsPath, jsContent),
                    ])
                });

                await Promise.all(fileProcessingPromises);
            })
        },
    };
};

const getConfig = async (inputFilesGlob, packageJSON, tsMode) => {
    const config = {
        entryPoints: await globby(inputFilesGlob),
        bundle: true,
        minify: true,
        outdir: 'dist/css',
        outbase: 'src',
        plugins: [
            createCustomPlugin(packageJSON, tsMode),
        ]
    };
    return config;
};

const processComponents = async (options = {}) => {
    const {
        watch = false,
        packagePath = "./package.json",
        inputFilesGlob = "src/themes/*.css",
        outdir = 'dist/css',
        outbase = 'src',
        tsMode = false
    } = options;

    const packageJSON = JSON.parse(fs.readFileSync(packagePath));

    if (watch) {
        let ready;
        let config = await getConfig(inputFilesGlob, packageJSON, tsMode);
        let ctx = await esbuild.context(config);
        await ctx.watch();
        console.log('watching...');

        // when new component css files are added, they do not trigger a build as no one directly imports them
        // restart the watch mode with the new entry points if a css file is added.
        const watcher = chokidar.watch(inputFilesGlob);
        watcher.on("ready", () => {
            ready = true; // Initial scan is over -> waiting for new files
        });
        watcher.on("add", async path => {
            if (ready) {
                // new file
                ctx.dispose();
                config = await getConfig(inputFilesGlob, packageJSON, tsMode);
                ctx = await esbuild.context(config);
                ctx.watch();
            }
        });

        return { ctx, watcher };
    } else {
        const config = await getConfig(inputFilesGlob, packageJSON, tsMode);
        const result = await esbuild.build(config);
        return result;
    }
};

// If this file is run directly (not imported as a module)
if (import.meta.url === `file://${process.argv[1]}`) {
    const restArgs = process.argv.slice(2);
    const watchMode = restArgs.includes("-w");

    processComponents({ watch: watchMode })
        .then(() => {
            if (!watchMode) {
                console.log('Component processing completed.');
            }
        })
        .catch(console.error);
}

export default processComponents;
export { processComponents, createCustomPlugin, getConfig };
