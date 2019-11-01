import resolve from "rollup-plugin-node-resolve";
import run from "rollup-plugin-run";
import commonjs from "rollup-plugin-commonjs";

export default {
    input: "index.js",
    output: {
        file: "icon-collection-bundler.cjs.js",
        format: "cjs",
    },
    plugins: [
        resolve(),
        commonjs(),
        run(),
    ]
}