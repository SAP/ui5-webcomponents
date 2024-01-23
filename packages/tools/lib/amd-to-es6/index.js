const babelCore = require("@babel/core");
const fs = require("fs").promises;
const basePath = process.argv[2];

const transformAmdModule = async (filePath) => {
	let code = (await fs.readFile(filePath)).toString();

	code = code.replace(/sap\.ui\.require/g, "require");

	code = (await babelCore.transformAsync(code, {
		plugins: [['babel-plugin-amd-to-esm', {}]]
	})).code;
	
	return fs.writeFile(filePath, code);
}

const transformAmdModules = async () => {
	const { globby } = await import("globby");
	const fileNames = await globby(basePath.replace(/\\/g, "/") + "**/*.js");
	return Promise.all(fileNames.map(transformAmdModule).filter(x => !!x));
};

transformAmdModules().then(() => {
	console.log("Success: all amd modules are transformed to es6 modules!");
});
