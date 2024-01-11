const path = require("path");

const LIB = path.join(__dirname, `../lib/`);
const SCRIPT_DIR = path.join(__dirname, `./`);

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
	// TODO still support without versions?
	if (options.versions) {
		return `node "${LIB}/copy-and-watch/index.js" --silent "src/{${options.versions.join(",")}}/*.json" dist/generated/assets/`
	} else {
		return `node "${LIB}/copy-and-watch/index.js" --silent "src/*.json" dist/generated/assets/`
	}

	return command;
}

const getScripts = (options) => {
	const createJSImportsCmd = createIconImportsCommand(options);
	const copyAssetsCmd = copyIconAssetsCommand(options);
	const tsCommand = options.typescript ? "tsc --build" : "";
	const tsCrossEnv = options.typescript ? "cross-env UI5_TS=true" : "";

	const scripts = {
		clean: "rimraf dist && rimraf src/generated",
		copy: copyAssetsCmd,
		generate: `${tsCrossEnv} nps copy build.i18n build.jsonImports`,
		generateTracked: `nps build.icons`,
		build: {
			default: `${tsCrossEnv} nps clean copy build.i18n typescript build.icons build.jsonImports`,
			i18n: {
				default: "nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `mkdirp dist/generated/i18n && node "${LIB}/i18n/defaults.js" src/i18n src/generated/i18n`,
				json: `mkdirp src/generated/assets/i18n && node "${LIB}/i18n/toJSON.js" src/i18n src/generated/assets/i18n`,
			},
			jsonImports: {
				default: "mkdirp src/generated/json-imports && nps build.jsonImports.i18n",
				i18n: `node "${LIB}/generate-json-imports/i18n.js" src/generated/assets/i18n src/generated/json-imports`,
			},
			moveGeneratedTrackedToDist: `node ${SCRIPT_DIR}/move-generated-icons.mjs`,
			icons: createJSImportsCmd,
		},
		typescript: tsCommand,
	};

	return scripts;
};

module.exports = getScripts;
