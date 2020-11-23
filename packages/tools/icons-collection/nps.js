const path = require("path");

const LIB = path.join(__dirname, `../lib/`);

const getScripts = (options) => {

	const scripts = {
		clean: "rimraf dist",
		copy: {
			default: "nps copy.json-imports copy.icon-collection",
			"json-imports": `node "${LIB}/copy-and-watch/index.js" "src/**/*.js" dist/`,
			"icon-collection": `node "${LIB}/copy-and-watch/index.js" "src/*.json" dist/generated/assets/`
		},
		build: {
			default: "nps clean copy build.i18n build.icons",
			i18n: {
				default: "nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `mkdirp dist/generated/i18n && node "${LIB}/i18n/defaults.js" src/i18n dist/generated/i18n`,
				json: `mkdirp dist/generated/assets/i18n && node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
			},
			icons: `node "${LIB}/create-icons/index.js" "${options.collectionName}"`,
		}
	};

	return scripts;
};

module.exports = getScripts;
