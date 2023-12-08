import 'zx/globals';
import * as esbuild from 'esbuild'
import * as fs from "fs";
import * as path from "path";
import { writeFile, mkdir } from "fs/promises";
import { getFileContent } from '../postcss-css-to-esm/index.js';

const packageJSON = JSON.parse(fs.readFileSync("./package.json"))
let inputFiles = await globby("src/themes/*.css");
const restArgs = process.argv.slice(2);

const escapeVersion = version => "v" + version?.replaceAll(/[^0-9A-Za-z\-_]/g, "-");
const versionStr = escapeVersion(packageJSON.version);
const expr = /(--_?ui5)([^\,\:\)\s]+)/g

let scopingPlugin = {
    name: 'scoping',
    setup(build) {
        build.initialOptions.write = false;

        build.onEnd(result => {
            result.outputFiles.forEach(async f => {
                // scoping
                const newText = f.text.replaceAll(expr, `$1-${versionStr}$2`);
                await mkdir(path.dirname(f.path), {recursive: true});
                writeFile(f.path, newText);

                // json
                // const jsonPath = f.path.replace("dist/css2", "src/generated/assets").replace(".css", ".css.json");
                // await mkdir(path.dirname(jsonPath), {recursive: true});

                // const data = {
                //     packageName: packageJSON.name,
                //     fileName: jsonPath.substr(jsonPath.lastIndexOf("themes")),
                //     content: newText,
                // };

                // writeFile(jsonPath, JSON.stringify({_: data}))

                // JS/TS
                const jsPath = f.path.replace("dist/css2", "src/generated/").replace(".css", ".css.ts");
                await mkdir(path.dirname(jsPath), {recursive: true});
                const jsContent = getFileContent(true, jsPath, packageJSON.name, "\`" + newText + "\`", true);
                writeFile(jsPath, jsContent);
                // console.log(f.path, newText);
            });
        })
    },
}

// $`esbuild ${file} --bundle --minify --outdir=dist/css2 --outbase=src ${restArgs}`;
const result = await esbuild.build({
    entryPoints: inputFiles,
    bundle: true,
    minify: true,
    outdir: 'dist/css2',
    outbase: 'src',
    plugins: [
        scopingPlugin,
    ]
})
// console.log({result})