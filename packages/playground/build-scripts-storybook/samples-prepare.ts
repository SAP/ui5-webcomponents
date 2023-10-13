import fs from "fs/promises";
import path from "path";
import type CEM from "@ui5/webcomponents-tools/lib/cem/types.d.ts";

const STORIES_ROOT_FOLDER_NAME = '../_stories';

const isCustomElementDeclaration = (object: any): object is CEM.CustomElementDeclaration => {
	return "customElement" in object && object.customElement;
};

type ControlType = "text" | "select" | "multi-select" | boolean;

type ArgsTypes = {
	[key: string]: {
		control?: ControlType | { type: ControlType; /* See below for more */ };
		description?: string;
		mapping?: { [key: string]: { [option: string]: any } };
		name?: string;
		options?: string[];
		table?: {
			category?: string;
			defaultValue?: { summary: string; detail?: string };
			subcategory?: string;
			type?: { summary?: string; detail?: string };
		},
		UI5CustomData?: {
			parameters?: Array<CEM.Parameter>,
			returnValue?: {
				description?: string
				summary?: string
				type?: CEM.Type
			  }
		}
	}
}

type APIData = {
	info: {
		package: string;
		since: string | undefined;
	};
	slotNames: Array<string>;
	storyArgsTypes: string;
}

// run the script to generate the argTypes for the stories available in the _stories folder
const main = async () => {
	const api: CEM.MySchema = JSON.parse((await fs.readFile(`./.storybook/custom-elements.json`)).toString());

	// read all directories inside _stories folder and create a list of components
	const packages = await fs.readdir(path.join(__dirname, STORIES_ROOT_FOLDER_NAME));
	for (const currPackage of packages) {
		// packages [main, fiori]

		const packagePath = path.join(__dirname, STORIES_ROOT_FOLDER_NAME, currPackage);
		const packageStats = await fs.stat(packagePath);
		if (packageStats.isDirectory()) {
			const componentsInPackage = await fs.readdir(packagePath);
			for (const component of componentsInPackage) {
				// components [Button, Card, ...]
				const componentPath = path.join(packagePath, component);
				const componentStats = await fs.stat(componentPath);
				if (componentStats.isDirectory()) {
					generateStoryDoc(componentPath, component, api, currPackage);
				}
			}
		}
	}

	async function generateStoryDoc(componentPath: string, component: string, api: CEM.MySchema, componentPackage: string) {
		console.log(`Generating argTypes for story ${component}`);
		const apiData = getAPIData(api, component, componentPackage);

		if (!apiData) {
			return;
		}

		const { storyArgsTypes, slotNames, info } = apiData;

		await fs.writeFile(componentPath + '/argTypes.ts', `export default ${storyArgsTypes};
export const componentInfo = ${JSON.stringify(info, null, 4)};
export type StoryArgsSlots = {
	${slotNames.map(slotName => `${slotName}: string;`).join('\n	')}
}`);
	};

	function getAPIData(api: CEM.MySchema, module: string, componentPackage: string): APIData | undefined {
		const moduleAPI = api.modules?.find(currModule => currModule.declarations?.find(s => s._ui5reference?.name === module && s._ui5reference?.package === `@ui5/webcomponents${componentPackage !== 'main' ? `-${componentPackage}` : ''}`));
		const declaration = moduleAPI?.declarations?.find(s => s._ui5reference?.name === module && s._ui5reference?.package === `@ui5/webcomponents${componentPackage !== 'main' ? `-${componentPackage}` : ''}`);

		if (!declaration) {
			return;
		}

		const data = getArgsTypes(api, declaration as CEM.CustomElementDeclaration, componentPackage);

		return {
			info: {
				package: `@ui5/webcomponents${componentPackage !== 'main' ? `-${componentPackage}` : ''}`,
				since: declaration?._ui5since
			},
			slotNames: data.slotNames,
			storyArgsTypes: JSON.stringify(data.args, null, "\t")
		};
	}

	function getArgsTypes(api: CEM.MySchema, moduleAPI: CEM.CustomElementDeclaration | CEM.ClassDeclaration, componentPackage: string): { args: any, slotNames: Array<string> } {
		let args: ArgsTypes = {};
		let slotNames: Array<string> = [];

		moduleAPI.members
			?.filter((member): member is CEM.ClassField => "kind" in member && member.kind === "field")
			.forEach(prop => {
				let typeEnum: CEM.EnumDeclaration | undefined;

				if (prop.type?.references?.length) {
					for (let currModule of api.modules) {
						if (!currModule.declarations) {
							continue;
						}

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
				} else if (typeEnum && Array.isArray(typeEnum.members)) {
					args[prop.name] = {
						control: "select",
						options: typeEnum.members.map(a => a.name),
					};
				}
			});

		if (isCustomElementDeclaration(moduleAPI)) {
			moduleAPI.slots?.forEach(prop => {
				args[prop.name] = {
					control: {
						type: "text"
					}
				};
				slotNames.push(prop.name);
			});
		}

		// methods parsing because Storybook does not include them in the args by default from the custom-elements.json
		// only changing the category to Methods so they are not displayed in the Properties tab
		moduleAPI.members
			?.filter((member): member is CEM.ClassMethod => "kind" in member && member.kind === "method")
			.forEach((prop) => {
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

				(prop as unknown as CEM.ClassField).kind = "field";
			});

		// events also have custom descriptions with parameters of their detail objec
		if (isCustomElementDeclaration(moduleAPI)) {
			moduleAPI.events?.forEach((prop) => {
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
		}

		const packages = ["@ui5/webcomponents", "@ui5/webcomponents-fiori"]

		// recursively merging the args from the parent/parents
		const moduleAPIBeingExtended = moduleAPI.superclass && api.modules
			?.find(currModule => currModule.declarations
				?.find(s => s?._ui5reference?.name === moduleAPI.superclass?.name && s?._ui5reference?.package === moduleAPI.superclass?.package))
			?.declarations
			?.find(s => s?._ui5reference?.name === moduleAPI.superclass?.name && s?._ui5reference?.package === moduleAPI.superclass?.package) as CEM.ClassDeclaration;

		const referencePackage = moduleAPIBeingExtended?._ui5reference?.package

		if (moduleAPIBeingExtended && referencePackage && packages.includes(referencePackage)) {
			const { args: nextArgs, slotNames: nextSlotNames } = getArgsTypes(api, moduleAPIBeingExtended, referencePackage === "@ui5/webcomponents" ? "main" : "fiori");
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
