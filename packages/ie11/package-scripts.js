const resolve = require("resolve");

const generateHash = resolve.sync("@ui5/webcomponents-tools/lib/hash/generate.js");
const hashIsUpToDate = resolve.sync("@ui5/webcomponents-tools/lib/hash/upToDate.js");
const UP_TO_DATE = `node ${hashIsUpToDate} dist/ hash.txt && echo "Up to date."`;

const scripts = {
	clean: "rimraf dist",
	lint: "eslint . --config config/.eslintrc.js",
	copy: `copy-and-watch "src/**/*.js" dist/`,
	build: `${UP_TO_DATE} || nps lint clean copy hash`,
	watch: `nps "copy --watch --skip-initial-copy"`,
	start: "nps watch",
	hash: `node ${generateHash} dist/ hash.txt`,
};

module.exports = {
	scripts,
};
