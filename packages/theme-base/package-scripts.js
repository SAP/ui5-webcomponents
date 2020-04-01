const path = require("path");
const resolve = require("resolve");
const assets = require('@ui5/webcomponents-tools/assets-meta.js');

const jsonImportsScript = resolve.sync("@ui5/webcomponents-tools/lib/generate-json-imports/themes.js");

const allThemes = assets.themes.all;
const buildLessCommandsNames = allThemes.map(theme => `build.less.${theme}`).join(" ");
const buildLessCommands = {};
allThemes.forEach(theme => buildLessCommands[theme] = `lessc src/themes/${theme}/parameters-bundle.less dist/themes/${theme}/parameters-bundle.css`);

module.exports = {
	scripts: {
		clean: "rimraf dist",
		build: {
			default: "nps clean build.src build.less build.postcss build.jsonImports",
			src: `copy-and-watch "src/**/*.js" dist/`,
			less: {
				default: `nps ${buildLessCommandsNames}`,
				...buildLessCommands
			},
			postcss: "postcss dist/**/parameters-bundle.css --config config/postcss.themes --base dist/ --dir dist/css/",
			jsonImports: `node "${jsonImportsScript}"`,
		},
		start: "nps build watch",
		watch: {
			default: 'concurrently "nps watch.src" "nps watch.less" "nps watch.postcss"',
			src: `copy-and-watch --watch "src/**/*.js" dist/`,
			less: 'chokidar "src/themes/**/*.less" -c "nps build.less"',
			postcss: 'nps "build.postcss -w"',
		},
	},
};
