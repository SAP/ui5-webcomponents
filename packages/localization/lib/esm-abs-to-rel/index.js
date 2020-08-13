// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

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
		fs.writeFileSync(srcPath, escodegen.generate(tree));
	}
}

const fileNames = glob.sync(basePath + "**/*.js");
// console.log(fileNames);
fileNames.forEach(convertImports);
console.log("Success: Converted absolute imports to relative for files in:", basePath)
