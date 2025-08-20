import { globby } from "globby";
import * as esbuild from 'esbuild'
import * as fs from "fs";
import * as path from "path";
import { writeFile, mkdir } from "fs/promises";
import postcss from "postcss";
import combineDuplicatedSelectors from "../postcss-combine-duplicated-selectors/index.js"
import { writeFileIfChanged, stripThemingBaseContent, getFileContent } from "./shared.mjs";
import scopeVariables from "./scope-variables.mjs";

const tsMode = process.env.UI5_TS === "true";
const extension = tsMode ? ".css.ts" : ".css.js";

const packageJSON = JSON.parse(fs.readFileSync("./package.json"))

let inputFiles = await globby("src/**/parameters-bundle.css");
const restArgs = process.argv.slice(2);

const removeDuplicateSelectors = async (text) => {
    const result = await postcss(combineDuplicatedSelectors).process(text);
    return result.css;
}

const processFontFace = (text) => {
    const declarationExpr = /@font-face\s*{[^}]*}/g;

    // remove declarations from source, they are extracted in base package
    return text.replaceAll(declarationExpr, '');
}

let scopingPlugin = {
    name: 'scoping',
    setup(build) {
        build.initialOptions.write = false;

        build.onEnd(result => {
            result.outputFiles.forEach(async f => {
                // remove font-face declarations
                let newText = processFontFace(f.text);

                // remove duplicate selectors
                newText = await removeDuplicateSelectors(newText);

                // strip unnecessary theming-base-content
                newText = stripThemingBaseContent(newText);

                // scoping
                newText = scopeVariables(newText, packageJSON, f.path);
                await mkdir(path.dirname(f.path), {recursive: true});
                writeFile(f.path, newText);

                // JSON
                const jsonPath = f.path.replace(/dist[\/\\]css/, "dist/generated/assets").replace(".css", ".css.json");
                await mkdir(path.dirname(jsonPath), {recursive: true});
                writeFileIfChanged(jsonPath, JSON.stringify(newText));

                // JS/TS
                const jsPath = f.path.replace(/dist[\/\\]css/, "src/generated/").replace(".css", extension);
                const jsContent = getFileContent(packageJSON.name, "\`" + newText + "\`");
                writeFileIfChanged(jsPath, jsContent);
            });
        })
    },
}

const config = {
    entryPoints: inputFiles,
    bundle: true,
    minify: true,
    outdir: 'dist/css',
    outbase: 'src',
    plugins: [
        scopingPlugin,
    ],
    external: ["*.ttf", "*.woff", "*.woff2"],
};

if (restArgs.includes("-w")) {
    let ctx = await esbuild.context(config);
    await ctx.watch()
    console.log('watching...')
} else {
    const result = await esbuild.build(config);
}