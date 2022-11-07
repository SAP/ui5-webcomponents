const fs = require('fs/promises');
const path = require('path');

const STORIES_ROOT_FOLDER_NAME = '../_stories';

// run the script to generate the argTypes for the stories available in the _stories folder
const main = async () => {

	const baseAPI = JSON.parse((await fs.readFile(`../base/dist/api.json`)).toString());

	// read all directories inside _stories folder and create a list of components
	const packages = await fs.readdir(path.join(__dirname, STORIES_ROOT_FOLDER_NAME));
	for (const package of packages) {
		// packages [main, fiori]
		const api = JSON.parse((await fs.readFile(`../${package}/dist/api.json`)).toString());

		const packagePath = path.join(__dirname, STORIES_ROOT_FOLDER_NAME, package);
		const packageStats = await fs.stat(packagePath);
		if (packageStats.isDirectory()) {
			const componentsInPackage = await fs.readdir(packagePath);
			for (const component of componentsInPackage) {
				// components [Button, Card, ...]
				const componentPath = path.join(packagePath, component);
				const componentStats = await fs.stat(componentPath);
				if (componentStats.isDirectory()) {
					generateStoryDoc(componentPath, component, api);
				}
			}
		}
	}

	async function generateStoryDoc(componentPath, component, api) {
		console.log(`Generating argTypes for story ${component}`);
		const apiData = getAPIData(api, component);

		await fs.writeFile(componentPath + '/argTypes.js', `export default ` + apiData.storyArgsTypes);
	};

	function getAPIData(api, module) {
		const moduleAPI = api.symbols.find(s => s.module === module);
		const args = getArgsTypes(api, moduleAPI);

		return {
			storyArgsTypes: JSON.stringify(args, null, "\t")
		};
	}

	function getArgsTypes(api, moduleAPI) {
		let args = {};
		
		moduleAPI?.properties?.forEach(prop => {
			if (prop.visibility === 'public') {
				const typeEnum = api.symbols.find(s => s.name === prop.type) || baseAPI.symbols.find(s => s.name === prop.type);
				if (Array.isArray(typeEnum?.properties)) {
					args[prop.name] = {
						control: "select",
						options: typeEnum.properties.map(a => a.type),
					};
				}
			}
		});

		// recursively merging the args from the parent/parents
		const moduleAPIBeingExtended = api.symbols.find(s => s.module === moduleAPI.extends) || baseAPI.symbols.find(s => s.module === moduleAPI.extends);
		if (moduleAPIBeingExtended) {
			args = {...args, ...getArgsTypes(api, moduleAPIBeingExtended)};
		}

		return args;
	}
};

main();
