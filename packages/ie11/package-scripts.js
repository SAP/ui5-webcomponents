const scripts = {
	clean: "rimraf dist",
	lint: "eslint . --config config/.eslintrc.js",
	copy: `copy-and-watch "src/**/*.js" dist/`,
	build: "nps lint clean copy",
	watch: `nps "copy --watch --skip-initial-copy"`,
	start: "nps watch",
};


module.exports = {
	scripts,
};
