const path = require("path");

const LIB = path.join(__dirname, `../lib/`);

const createIconImportsCommand = (options) => {
	if (!options.versions) {
		return `node "${LIB}/create-icons/index.js" "${options.collectionName}"`;
	}

	const command  = { default: "nps" };
	options.versions.forEach((v) => {
		command.default += ` build.icons.create${v}`;
		command[`create${v}`] = `node "${LIB}/create-icons/index.js" "${options.collectionName}" "${v}"`;
	});

	return command;
}

const copyIconAssetsCommand = (options) => {
	if (!options.versions) {
		return 	{
			default: "nps copy.json-imports copy.icon-collection",
			"json-imports": `node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.js" dist/`,
			"icon-collection": `node "${LIB}/copy-and-watch/index.js" --silent "src/*.json" dist/generated/assets/`,
		}
	}

	const command  = {
		default: "nps copy.json-imports ",
		"json-imports": `node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.js" dist/`,
	};

	options.versions.forEach((v) => {
		command.default += ` copy.icon-collection${v}`;
		command[`icon-collection${v}`] = `node "${LIB}/copy-and-watch/index.js" --silent "src/${v}/*.json" dist/generated/assets/${v}/`;
	});

	return command;
}

const getScripts = (options) => {
	const createJSImportsCmd = createIconImportsCommand(options);
	const copyAssetsCmd = copyIconAssetsCommand(options);

	const scripts = {
		clean: "rimraf dist",
		copy: copyAssetsCmd,
		build: {
			default: `nps clean copy build.i18n build.icons build.jsonImports`,
			i18n: {
				default: "nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `mkdirp dist/generated/i18n && node "${LIB}/i18n/defaults.js" src/i18n dist/generated/i18n`,
				json: `mkdirp dist/generated/assets/i18n && node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
			},
			jsonImports: {
				default: "mkdirp dist/generated/json-imports && nps build.jsonImports.i18n",
				i18n: `node "${LIB}/generate-json-imports/i18n.js" dist/generated/assets/i18n dist/generated/json-imports`,
			},
			icons: createJSImportsCmd,
		},
	};

	return scripts;
};

module.exports = getScripts;
