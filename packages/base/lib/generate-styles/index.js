import fs from 'fs/promises';
import path from "path";
import CleanCSS from "clean-css";

const generate = async () => {
	await fs.mkdir("src/generated/css/", {recursive: true});

	const files = (await fs.readdir("src/css/")).filter(file => file.endsWith(".css"));
	const filesPromises = files.map(async file => {
		let content = await fs.readFile(path.join("src/css/", file));
		const res = new CleanCSS().minify(`${content}`);
		content = `import type { StyleData } from "../../types.js";

const styleData: StyleData = {
	packageName: "@ui5/webcomponents-base",
	fileName: "${file}",
	content: \`${res.styles}\`,
};

export default styleData;
`;

		return fs.writeFile(path.join("src/generated/css/", `${file}.ts`), content);
	});

	return Promise.all(filesPromises);
};

generate().then(() => {
	console.log("Styles files generated.");
});
