const path = require("path");

const LIB = path.join(__dirname, `../lib/`);

const getScripts = () => {

	const scripts = {
		clean: "rimraf dist",
		copy: {
			default: "nps copy.json-imports copy.icon-collections",
			"json-imports": `node "${LIB}/copy-and-watch/index.js" "src/**/*.js" dist/`,
			"icon-collections": `node "${LIB}/copy-and-watch/index.js" "src/icon-collections/**/*.json" dist/generated/assets/icon-collections/`
		},
		build: {
			default: "nps clean copy build.i18n build.icons",
			i18n: {
				default: "nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `mkdirp dist/generated/i18n && node "${LIB}/i18n/defaults.js" src/i18n dist/generated/i18n`,
				json: `mkdirp dist/generated/assets/i18n && node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
			},
			icons: `node "${LIB}/create-icons/index.js"`,
		}
	};

	return scripts;
};

module.exports = getScripts;
