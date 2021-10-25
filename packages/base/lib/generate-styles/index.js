const fs = require('fs/promises');
const path = require('path');
const mkdirp = require('mkdirp');
const CleanCSS = require('clean-css');

(async () => {
	await mkdirp("dist/generated/css/");
	(await fs.readdir("src/css/")).filter(file => file.endsWith(".css")).forEach(async file => {
		let content = await fs.readFile(path.join("src/css/", file));
		const res = new CleanCSS().minify(`${content}`);
		content = `export default \`${res.styles}\`;`;
		await fs.writeFile(path.join("dist/generated/css/", `${file}.js`), content);
	});
})();

