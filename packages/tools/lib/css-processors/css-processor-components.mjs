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
					let newText = scopeVariables(f.text, packageJSON);
					newText = newText.replaceAll(/\\/g, "\\\\"); // Escape backslashes as they might appear in css rules
					writeFile(f.path, newText);

					// JS/TS
					const jsPath = f.path.replace(/dist[\/\\]css/, "src/generated/").replace(".css", extension);
					const jsContent = getFileContent(packageJSON.name, "\`" + newText + "\`", true);

					await mkdir(path.dirname(f.path), { recursive: true });

					Promise.all([
						await writeFile(f.path, newText),
						await writeFileIfChanged(jsPath, jsContent),
					]);
				});

				await Promise.allSettled(fileProcessingPromises);
			})
		},
	};
};

const getConfig = async (inputFilesGlob, tsMode) => {
	const packageJSON = JSON.parse(fs.readFileSync("./package.json"));

	const config = {
		entryPoints: await globby([inputFilesGlob]),
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
		tsMode = false
	} = options;

	const inputFilesGlob = "src/themes/*.css";

	if (watch) {
		let ready;
		let config = await getConfig(inputFilesGlob, tsMode);
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
				config = await getConfig(inputFilesGlob, tsMode);
				ctx = await esbuild.context(config);
				ctx.watch();
			}
		});

		return { ctx, watcher };
	} else {
		const config = await getConfig(inputFilesGlob, tsMode);
		const result = await esbuild.build(config);
		return result;
	}
};

export default processComponents;
