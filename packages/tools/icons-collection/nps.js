const path = require("path");
const resolve = require("resolve");

const generateHash = resolve.sync("@ui5/webcomponents-tools/lib/hash/generate.js");
const hashIsUpToDate = resolve.sync("@ui5/webcomponents-tools/lib/hash/upToDate.js");
const UP_TO_DATE = `node ${hashIsUpToDate} dist/ hash.txt && echo "Up to date."`;

const LIB = path.join(__dirname, `../lib/`);

const getScripts = (options) => {

	const scripts = {
		clean: "rimraf dist",
		copy: {
			default: "nps copy.json-imports copy.icon-collection",
			"json-imports": `node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.js" dist/`,
			"icon-collection": `node "${LIB}/copy-and-watch/index.js" --silent "src/*.json" dist/generated/assets/`
		},
		build: {
			default: `${UP_TO_DATE} || nps clean copy build.i18n build.icons build.jsonImports hash`,
			i18n: {
				default: "nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `mkdirp dist/generated/i18n && node "${LIB}/i18n/defaults.js" src/i18n dist/generated/i18n`,
				json: `mkdirp dist/generated/assets/i18n && node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
			},
			jsonImports: {
				default: "mkdirp dist/generated/json-imports && nps build.jsonImports.i18n",
				i18n: `node "${LIB}/generate-json-imports/i18n.js" dist/generated/assets/i18n dist/generated/json-imports`,
			},
			icons: `node "${LIB}/create-icons/index.js" "${options.collectionName}"`,
		},
		hash: `node ${generateHash} dist/ hash.txt`,
	};

	return scripts;
};

module.exports = getScripts;
