import fs from "fs/promises";
import path from "path";
import type {
	ClassDeclaration,
	CustomElementDeclaration,
	Package,
	Parameter,
	Type,
	ClassField,
	ClassMethod,
	EnumDeclaration,
	InterfaceDeclaration,
	FunctionDeclaration,
	CustomElementMixinDeclaration,
	MixinDeclaration,
	VariableDeclaration
} from "@ui5/webcomponents-tools/lib/cem/types-internal";

const STORIES_ROOT_FOLDER_NAME = '../_stories';

const isCustomElementDeclaration = (object: any): object is CustomElementDeclaration => {
	return "customElement" in object && object.customElement;
};

type Declaration = CustomElementDeclaration | EnumDeclaration | ClassDeclaration | InterfaceDeclaration | FunctionDeclaration | MixinDeclaration | VariableDeclaration | CustomElementMixinDeclaration

type ControlType = "text" | "select" | "multi-select" | boolean;

type ArgsTypes = Record<string, {
	control?: ControlType | { type: ControlType };
	description?: string;
	mapping?: Record<string, Record<string, any>>;
	name?: string;
	options?: string[];
	table?: {
		category?: string;
		defaultValue?: { summary: string; detail?: string };
		subcategory?: string;
		type?: { summary?: string; detail?: string };
	};
	UI5CustomData?: {
		parameters?: Array<Parameter>;
		returnValue?: {
			description?: string;
			summary?: string;
			type?: Type;
		};
	};
}>;

type APIData = {
	info: {
		package: string;
		since: string | undefined;
	};
	slotNames: Array<string>;
	storyArgsTypes: string;
};

// run the script to generate the argTypes for the stories available in the _stories folder
const main = async () => {
	const api: Package = JSON.parse((await fs.readFile(`./.storybook/custom-elements.json`)).toString());

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
					const folderContent = await fs.readdir(componentPath);
					await Promise.all(folderContent.map(async (subComponent, index) => {
						const subComponentPath = path.join(componentPath, subComponent);
						const subComponentStats = await fs.stat(subComponentPath);

						if (subComponentStats.isDirectory()) {
							generateStoryDoc(subComponentPath, subComponent, api, currPackage);
						}
					}))

					generateStoryDoc(componentPath, component, api, currPackage);
				}
			}
		}
	}
};

const generateStoryDoc = async (componentPath: string, component: string, api: Package, componentPackage: string) => {
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

const getAPIData = (api: Package, module: string, componentPackage: string): APIData | undefined => {
	const moduleAPI = api.modules?.find(currModule => currModule.declarations?.find(s => s.name === module && s._ui5package === `@ui5/webcomponents${componentPackage !== 'main' ? `-${componentPackage}` : ''}`));
	const declaration = moduleAPI?.declarations?.find(s => s.name === module && s._ui5package === `@ui5/webcomponents${componentPackage !== 'main' ? `-${componentPackage}` : ''}`);

	if (!declaration) {
		return;
	}

	const data = getArgsTypes(api, declaration as CustomElementDeclaration);

	return {
		info: {
			package: `@ui5/webcomponents${componentPackage !== 'main' ? `-${componentPackage}` : ''}`,
			since: (declaration as CustomElementDeclaration)?._ui5since
		},
		slotNames: data.slotNames,
		storyArgsTypes: JSON.stringify(data.args, null, "\t")
	};
};

const getArgsTypes = (api: Package, moduleAPI: CustomElementDeclaration | ClassDeclaration) => {
	let args: ArgsTypes = {};
	let slotNames: string[] = [];

	moduleAPI.members
		?.filter((member): member is ClassField => "kind" in member && member.kind === "field")
		.forEach(prop => {
			let typeEnum: EnumDeclaration | undefined;

			if (prop.type?.references?.length) {
				for (const currModule of api.modules) {
					if (!currModule.declarations) {
						continue;
					}

					for (const s of currModule.declarations) {
						if (s.name === prop.type?.references[0].name && s._ui5package === prop.type?.references[0].package && s.kind === "enum") {
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
				},
				table: {
					type: {
						summary: prop._ui5type?.text
					}
				}
			};
			slotNames.push(prop.name);
		});
	}

	moduleAPI.members
		?.filter((member): member is ClassMethod => "kind" in member && member.kind === "method")
		.forEach((prop) => {
			args[prop.name] = {
				description: prop.description,
				table: {
					category: "methods",
				},
			};

			if (prop.parameters || prop.return) {
				args[prop.name].UI5CustomData = {
					parameters: prop.parameters,
					returnValue: prop.return,
				};
			}

			(prop as unknown as ClassField).kind = "field";
		});

	// events also have custom descriptions with parameters of their detail objec
	if (isCustomElementDeclaration(moduleAPI)) {
		moduleAPI.events?.forEach((prop) => {
			if (prop._ui5privacy === "public" && prop._ui5parameters?.length) {
				args[prop.name] = {
					description: prop.description,
					control: {
						type: false
					},
					table: {
						category: "events",
					},
					UI5CustomData: {
						parameters: prop._ui5parameters,
					},
				};
			}
		});
	}

	const packages = ["@ui5/webcomponents", "@ui5/webcomponents-fiori"];

	// recursively merging the args from the parent/parents
	let moduleAPIBeingExtended;

	if (moduleAPI.superclass && api.modules) {
		for (const currModule of api.modules) {
			if (!currModule.declarations || !moduleAPI.superclass?.name || !moduleAPI.superclass?.package) {
				continue;
			}

			moduleAPIBeingExtended = findReference(currModule.declarations, moduleAPI.superclass?.name, moduleAPI.superclass.package);
		}
	}

	const referencePackage = moduleAPIBeingExtended?._ui5package;

	if (moduleAPIBeingExtended && referencePackage && packages.includes(referencePackage)) {
		const { args: nextArgs, slotNames: nextSlotNames } = getArgsTypes(api, moduleAPIBeingExtended as ClassDeclaration);
		args = { ...args, ...nextArgs };
		slotNames = [...slotNames, ...nextSlotNames].filter((v, i, a) => a.indexOf(v) === i);
	}

	return {
		args,
		slotNames
	};
};

const findReference = (something: Array<Declaration>, componentName: string, componentPackage: string): Declaration | undefined => {
	return something.find(s => s.name === componentName && s._ui5package === componentPackage)
}

main();
