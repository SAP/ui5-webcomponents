const esprima = require("esprima");
const escodegen = require("escodegen");

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const basePath = process.argv[2];

const convertImports = (srcPath) => {
	let changed = false;
	// console.log("scanning imports of", srcPath);
	let code = fs.readFileSync(srcPath).toString();
	if (code.includes("import.meta.url")) {
		console.log(`skipping convertion for ${srcPath} due to import.meta.url usage`);
		return;
	}
	const tree = esprima.parseModule(code);
	const importer = srcPath.replace(basePath, "");
	const importerDir = path.dirname(importer);
	tree.body.forEach(node => {
		if (node.type === "ImportDeclaration" && node.source.value.endsWith(".less")) {
			let importee = node.source.value;
			node.source.value = importee.replace(".less", ".json");
			changed = true;
			// console.log(importee, "from", importer);
		}
	});

	if (changed) {
		fs.writeFileSync(srcPath, escodegen.generate(tree));
	}
}

const fileNames = glob.sync(basePath + "**/*.js");
// console.log(fileNames);
fileNames.forEach(convertImports);
console.log("Success: Converted .less imports to .json for path: ", basePath);
