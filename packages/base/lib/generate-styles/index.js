const fs = require('fs').promises;
const path = require('path');
const CleanCSS = require('clean-css');

const generate = async () => {
	await fs.mkdir("dist/generated/css/");

	const files = (await fs.readdir("src/css/")).filter(file => file.endsWith(".css"));
	const filesPromises = files.map(async file => {
		let content = await fs.readFile(path.join("src/css/", file));
		const res = new CleanCSS().minify(`${content}`);
		content = `export default {
	packageName: "@ui5/webcomponents-base",
	fileName: "${file}",
	content: \`${res.styles}\`
};`;

		return fs.writeFile(path.join("dist/generated/css/", `${file}.js`), content);
	});

	return Promise.all(filesPromises);
};

generate().then(() => {
	console.log("Styles files generated.");
});
