const scripts = {
	clean: "rimraf dist",
	lint: "eslint . --config config/.eslintrc.js",
	copy: `copy-and-watch "src/**/*.js" dist/`,
	build: {
		"default": "path-exists dist/ || nps build.all",
		all: "nps lint clean copy",
	},
};


module.exports = {
	scripts,
};
