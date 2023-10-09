const fs = require('fs/promises');
const path = require('path');

const STORIES_ROOT_FOLDER_NAME = '../_stories';

// run the script to generate the argTypes for the stories available in the _stories folder
const main = async () => {
	const api = JSON.parse((await fs.readFile(`./.storybook/custom-elements.json`)).toString());

	// read all directories inside _stories folder and create a list of components
	const packages = await fs.readdir(path.join(__dirname, STORIES_ROOT_FOLDER_NAME));
	for (const package of packages) {
		// packages [main, fiori]

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
		const moduleAPI = api.modules?.find(currModule => currModule.declarations?.find(s => s?._ui5reference?.name === module && s?._ui5reference?.package === `@ui5/webcomponents${package !== 'main' ? `-${package}` : ''}`));
		const data = getArgsTypes(api, moduleAPI.declarations?.find(declaration => declaration._ui5reference?.name === module && declaration._ui5reference?.package === `@ui5/webcomponents${package !== 'main' ? `-${package}` : ''}`), package);


		const test = api.modules
			?.find(currModule => currModule.declarations
				?.find(s => s?._ui5reference?.name === module && s?._ui5reference?.package === `@ui5/webcomponents${package !== 'main' ? `-${package}` : ''}`))
			?.declarations
			?.find(s => s?._ui5reference?.name === module && s?._ui5reference?.package === `@ui5/webcomponents${package !== 'main' ? `-${package}` : ''}`);

		return {
			info: {
				package: `@ui5/webcomponents${package !== 'main' ? `-${package}` : ''}`,
				since: test?._ui5since
			},
			slotNames: data.slotNames,
			storyArgsTypes: JSON.stringify(data.args, null, "\t")
		};
	}

	function getArgsTypes(api, moduleAPI, package) {
		let args = {};
		let slotNames = [];

		moduleAPI?.members?.filter(member => member.kind === "field")
			.forEach(prop => {
				let typeEnum;

				if (prop.type?.references?.length) {
					for (let currModule of api.modules) {
						for (let s of currModule.declarations) {

							if (s?._ui5reference?.name === prop.type?.references[0].name && s?._ui5reference?.package === prop.type?.references[0].package && s.kind === "enum") {
								typeEnum = s;
								break;
							}
						}
					}
				}


				if (prop.readonly) {
					args[prop.name] = {
						control: {
							type: false
						},
					};
				} else if (Array.isArray(typeEnum?.members)) {
					args[prop.name] = {
						control: "select",
						options: typeEnum.members.map(a => a.name),
					};
				}
			});

		moduleAPI?.slots?.forEach(prop => {
			args[prop.name] = {
				control: {
					type: "text"
				}
			};
			slotNames.push(prop.name);
		});

		// methods parsing because Storybook does not include them in the args by default from the custom-elements.json
		// only changing the category to Methods so they are not displayed in the Properties tab
		moduleAPI?.members
			?.filter(prop => prop.kind === "method")
			.forEach((prop) => {
				prop.kind = "field";

				args[prop.name] = {
					description: prop.description,
					table: {
						category: "methods",
					},
				};

				// methods can have custom descriptions with parameters and return value
				if (prop.parameters || prop.return) {
					args[prop.name].UI5CustomData = {
						parameters: prop.parameters,
						returnValue: prop.return,
					}
				}
			});

		// events also have custom descriptions with parameters of their detail object
		moduleAPI?.events?.forEach((prop) => {
			if (prop.privacy === "public" && prop.params?.length) {
				args[prop.name] = {
					description: prop.description,
					table: {
						category: "events",
					},
					UI5CustomData: {
						parameters: prop.params,
					},
				};
			}
		});

		const packages = ["@ui5/webcomponents", "@ui5/webcomponents-fiori"]

		// recursively merging the args from the parent/parents
		const moduleAPIBeingExtended = moduleAPI.superclass && api.modules
			?.find(currModule => currModule.declarations
				?.find(s => s?._ui5reference?.name === moduleAPI.superclass?.name && s?._ui5reference?.package === moduleAPI.superclass?.package))
			?.declarations
			?.find(s => s?._ui5reference?.name === moduleAPI.superclass?.name && s?._ui5reference?.package === moduleAPI.superclass?.package);

		if (moduleAPIBeingExtended && packages.includes(moduleAPIBeingExtended._ui5reference?.package)) {
			console.log("=====")
			console.log("Current module", moduleAPI.name)
			console.log("Extended module", moduleAPIBeingExtended.name)
			const { args: nextArgs, slotNames: nextSlotNames } = getArgsTypes(api, moduleAPIBeingExtended, moduleAPIBeingExtended._ui5reference?.package === "@ui5/webcomponents" ? "main" : "fiori");
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
