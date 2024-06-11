import { globby } from "globby";
import * as esbuild from 'esbuild'
import * as fs from "fs";
import * as path from "path";
import { writeFile, mkdir } from "fs/promises";
import scopeVariables from "./scope-variables.mjs";

const packageJSON = JSON.parse(fs.readFileSync("./package.json"))
const inputFiles = await globby("src/styles/*.module.css");
const restArgs = process.argv.slice(2);

let componentStylesPlugin = {
    name: 'component-styles',
    setup(build) {
        build.initialOptions.write = false;

        build.onEnd(result => {
            result.outputFiles.forEach(async f => {
                // scoping
                const newText = scopeVariables(f.text, packageJSON);
                await mkdir(path.dirname(f.path), {recursive: true});
                writeFile(f.path, newText);
                writeFile(f.path.replace(".module.css", ".css"), newText);
            });
        })
    },
}

const config = {
    entryPoints: inputFiles,
    outdir: 'dist',
    bundle: true,
    outbase: 'src',
    loader: {
        ".module.css": "global-css"
    },
    plugins: [
        componentStylesPlugin,
    ]
};

if (restArgs.includes("-w")) {
    let ctx = await esbuild.context(config);
    await ctx.watch()
    console.log('watching...')
} else {
    await esbuild.build(config);
}