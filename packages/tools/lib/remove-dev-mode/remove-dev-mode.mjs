import { globby } from "globby";
import * as esbuild from 'esbuild'
import { copy } from 'esbuild-plugin-copy';
import * as fs from "fs";

let customPlugin = {
    name: 'ui5-tools',
    setup(build) {
        build.onLoad({ filter: /UI5Element.ts$/ }, async (args) => {
          let text = await fs.promises.readFile(args.path, 'utf8');
          text = text.replaceAll(/const DEV_MODE = true/g, "");
          text = text.replaceAll(/if \(DEV_MODE\)/g, "if (false)");
          return {
            contents: text,
            loader: 'ts',
          }
        })
      },
}

const getConfig = async () => {
    const config = {
        entryPoints: await globby("src/**/*.ts"),
        bundle: false,
        minify: true,
        sourcemap: true,
        outdir: 'dist/prod',
        outbase: 'src',
        plugins: [
            customPlugin,
            copy({
              assets: [
                  {
                      from: "./dist/generated/assets/i18n/*.json",
                      to: "./generated/assets/i18n", 
                  }
              ],
          })
      ]
    };
    return config;
}


const config = await getConfig();
const result = await esbuild.build(config);