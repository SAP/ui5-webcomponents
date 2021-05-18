const resolve = require("resolve");
const generateHash = resolve.sync("@ui5/webcomponents-tools/lib/hash/generate.js");
const hashIsUpToDate = resolve.sync("@ui5/webcomponents-tools/lib/hash/upToDate.js");
const UP_TO_DATE = `false`;
const UP_TO_DATE2 = `node ${hashIsUpToDate} dist/ hash.txt && echo "Up to date."`;
const scripts = {
  clean: "find . -type f -print0 | git check-ignore -z --stdin | xargs -0 rm",
  lint: "eslint src/ --config config/.eslintrc.js",
  build: {
    "default": `${UP_TO_DATE} || nps build.all hash`,
    all: "nps lint clean copy.used-modules copy.cldr copy.overlay build.replace-amd build.replace-export-true build.replace-export-false build.amd-to-es6 build.replace-global-core-usage build.esm-abs-to-rel build.jsonImports copy.src copy.transpiled",
    "replace-amd": "replace-in-file sap.ui.define define temp/**/*.js",
    "replace-export-true": `replace-in-file ", /* bExport= */ true" "" temp/**/*.js`,
    "replace-export-false": `replace-in-file ", /* bExport= */ false" "" temp/**/*.js`,
    "amd-to-es6": "amdtoes6 --src=temp --replace --glob=**/*.js",
    "replace-global-core-usage": "node ./lib/replace-global-core/index.js temp/",
    "esm-abs-to-rel": "node ./lib/esm-abs-to-rel/index.js temp/",
    jsonImports: "node ./lib/generate-json-imports/cldr.js"
  },
  copy: {
    "used-modules": "node ./lib/copy-list/index.js ./used-modules.txt temp/",
    cldr: `copy-and-watch "../../node_modules/@openui5/sap.ui.core/src/sap/ui/core/cldr/*.json" ./generated/assets/cldr/`,
    overlay: `copy-and-watch "overlay/**/*.js" temp/`,
    src: `copy-and-watch "src/**/*.js" ./`,
    transpiled: `copy-and-watch "temp/**/*.js" ./`,
  },
  watch: {
    default: "nps watch.src",
    src: `nps "copy.src --watch --skip-initial-copy"`
  },
  start: "nps watch",
  hash: `find . -type f -print0 | git check-ignore -z --stdin | xargs -0 md5 | sort | md5`,
  hash2: `node ${generateHash} dist/ hash.txt`
};
module.exports = {
  scripts
};
