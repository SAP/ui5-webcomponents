const esprima = require("esprima");
const escodegen = require("escodegen");

const fs = require("fs").promises;
const path = require("path");
const basePath = process.argv[2];

const convertImports = async (srcPath) => {
	let changed = false;
	// console.log("scanning imports of", srcPath);
	let code = (await fs.readFile(srcPath)).toString();
	const tree = esprima.parseModule(code);
	const importer = srcPath.replace(basePath, "");
	const importerDir = path.dirname(importer);
	// console.log("-> ", importer);
	tree.body.forEach(node => {
		if (node.type === "ImportDeclaration") {
			let importee = node.source.value;
			if (importee.startsWith(".")) {
				// add .js extension if missing
				if (!importee.endsWith(".js")) {
					node.source.value += ".js"
					changed = true;
				}
				return;
			}
			let importeeDir = path.dirname(importee);
			let importeeFile = path.basename(importee);
			let relativePath = path.relative(importerDir, importeeDir);
			if (relativePath.length === 0) {
				relativePath = "."
			}
			if (!relativePath.startsWith(".")) {
				relativePath = "./" + relativePath;
			}

			relativePath = relativePath.replace(/\\/g, "/"); // the browser expects unix paths
			let relativeImport = `${relativePath}/${importeeFile}.js`;
			// console.log(importee + " --> " + relativeImport);
			node.source.value = relativeImport;
			changed = true;
		}
	});

	if (changed) {
		return fs.writeFile(srcPath, escodegen.generate(tree));
	}
}

const generate = async () => {
	const { globby } = await import("globby");
	const fileNames = await globby(basePath + "**/*.js");
	return Promise.all(fileNames.map(convertImports).filter(x => !!x));
};

generate().then(() => {
	console.log("Success: Converted absolute imports to relative for files in:", basePath);
});
