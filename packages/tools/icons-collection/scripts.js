const getScripts = (conf) => {

	const scripts = {
		clean: "rimraf dist",
		copy: 'copy-and-watch "src/**/*.js" dist/',
		build: {
			default: "nps clean copy build.i18n build.icons",
			i18n: {
				default: "nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: "mkdirp dist/generated/i18n && node ./lib/i18n/defaults.js src/i18n dist/generated/i18n",
				json: "mkdirp dist/assets/i18n && node ./lib/i18n/toJSON.js src/i18n dist/assets/i18n",
			},
			icons: "cd lib/icon-collection-bundler && node --experimental-modules index.js",
		}
	};

	return scripts;
};

module.exports = getScripts;
