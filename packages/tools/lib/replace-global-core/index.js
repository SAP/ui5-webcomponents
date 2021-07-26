const fs = require("fs");
const glob = require("glob");

const basePath = process.argv[2];

const replaceGlobalCoreUsage = (srcPath) => {

	const original = fs.readFileSync(srcPath).toString();
	let replaced = original.replace(/sap\.ui\.getCore\(\)/g, `Core`);

	if (original !== replaced) {
		replaced = `import Core from 'sap/ui/core/Core';
		${replaced}`;
		fs.writeFileSync(srcPath, replaced);
	}
};

const fileNames = glob.sync(basePath + "**/*.js");
fileNames.forEach(replaceGlobalCoreUsage);
console.log("Success: Replaced global core usage in:", basePath);
