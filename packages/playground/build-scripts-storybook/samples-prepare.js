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
					generateStoryDoc(componentPath, component, api, package);
				}
			}
		}
	}

	async function generateStoryDoc(componentPath, component, api, package) {
		console.log(`Generating argTypes for story ${component}`);
		const apiData = getAPIData(api, component, package);
		const { storyArgsTypes, slotNames, info } = apiData;

		await fs.writeFile(componentPath + '/argTypes.ts', `export default ${storyArgsTypes};
export const componentInfo = ${JSON.stringify(info, null, 4)};
export type StoryArgsSlots = {
	${slotNames.map(slotName => `${slotName}: string;`).join('\n	')}
}`);
	};

	function getAPIData(api, module, package) {
		const moduleAPI = api.symbols.find(s => s.module === module);
		const data = getArgsTypes(api, moduleAPI);

		return {
			info: {
				package: `@ui5/webcomponents${package !== 'main' ? `-${package}` : ''}`,
				since: moduleAPI.since
			},
			slotNames: data.slotNames,
			storyArgsTypes: JSON.stringify(data.args, null, "\t")
		};
	}

	function getArgsTypes(api, moduleAPI) {
		let args = {};
		let slotNames = [];
		
		moduleAPI?.properties?.forEach(prop => {
			if (prop.visibility === 'public') {
				const typeEnum = api.symbols.find(s => s.name === prop.type) || baseAPI.symbols.find(s => s.name === prop.type);
				if (prop.readonly) { 
					args[prop.name] = {
						control: {
							type: false
						},
					};
				} else if (Array.isArray(typeEnum?.properties)) {
					args[prop.name] = {
						control: "select",
						options: typeEnum.properties.map(a => a.type),
					};
				}
			}
		});

		moduleAPI?.slots?.forEach(prop => {
			if (prop.visibility === 'public') {
				args[prop.name] = {
					control: {
						type: "text"
					}
				};
				slotNames.push(prop.name);
			}
		});

		// methods parsing because Storybook does not include them in the args by default from the custom-elements.json
		// only changing the category to Methods so they are not displayed in the Properties tab
		moduleAPI?.methods?.forEach((prop) => {
            if (prop.visibility === "public") {
                args[prop.name] = {
					description: prop.description,
                    table: {
                        category: "methods",
                    },
                };

				// methods can have custom descriptions with parameters and return value
				if (prop.parameters || prop.returnValue) {
					args[prop.name].UI5CustomData = {
						parameters: prop.parameters,
						returnValue: prop.returnValue,
					}
				}
            }
        });

        // events also have custom descriptions with parameters of their detail object
        moduleAPI?.events?.forEach((prop) => {
            if (prop.visibility === "public" && prop.parameters) {
                args[prop.name] = {
					description: prop.description,
					table: {
						category: "events",
					},
                    UI5CustomData: {
                        parameters: prop.parameters,
                    },
                };
            }
        });

		// recursively merging the args from the parent/parents
		const moduleAPIBeingExtended = api.symbols.find(s => s.name === moduleAPI.extends) || baseAPI.symbols.find(s => s.module === moduleAPI.extends);
		if (moduleAPIBeingExtended) {
			const { args: nextArgs, slotNames: nextSlotNames } = getArgsTypes(api, moduleAPIBeingExtended);
			args = { ...args, ...nextArgs };
			slotNames = [...slotNames, ...nextSlotNames].filter((v, i, a) => a.indexOf(v) === i);
		}

		return {
			args,
			slotNames
		};
	}
};

main();
