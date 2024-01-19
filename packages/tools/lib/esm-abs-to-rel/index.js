const parser = require("@babel/parser");
const generator = require("@babel/generator").default;

const fs = require("fs").promises;
const path = require("path");
const basePath = process.argv[2];

const convertImports = async (srcPath) => {
	let changed = false;
	let code = (await fs.readFile(srcPath)).toString();
	// console.log("File processing started: ", srcPath);

	if (code.includes("import(")) {
		// esprima can't parse this, but it's from the project files
		return;
	}

	const tree = parser.parse(code, {sourceType: "module"});
	const importer = srcPath.replace(basePath, "");
	const importerDir = path.dirname(importer);
	// console.log("Importer -> ", importer);

	tree?.program?.body?.forEach(node => {
		if (node.type === "ImportDeclaration") {
			let importee = node.source.value;
			console.log(importee);
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
		const code = generator(tree).code;
		// console.log(code);

		return fs.writeFile(srcPath, code);
	}
}

const generate = async () => {
	const { globby } = await import("globby");
	const fileNames = await globby(basePath.replace(/\\/g, "/") + "**/*.js");
	return Promise.all(fileNames.map(convertImports).filter(x => !!x));
};

generate().then(() => {
	console.log("Success: Converted absolute imports to relative for files in:", basePath);
});
