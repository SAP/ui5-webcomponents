const fs = require("fs").promises;

const basePath = process.argv[2];

const replaceGlobalCoreUsage = async (srcPath) => {

	const original = (await fs.readFile(srcPath)).toString();
	let replaced = original.replace(/sap\.ui\.getCore\(\)/g, `Core`);

	if (original !== replaced) {
		replaced = `import Core from 'sap/ui/core/Core';
		${replaced}`;
		return fs.writeFile(srcPath, replaced);
	}
};

const generate = async () => {
	const { globby } = await import("globby");
	const fileNames = await globby(basePath + "**/*.js");
	return Promise.all(fileNames.map(replaceGlobalCoreUsage).filter(x => !!x));
};

generate().then(() => {
	console.log("Success: Replaced global core usage in:", basePath);
});
