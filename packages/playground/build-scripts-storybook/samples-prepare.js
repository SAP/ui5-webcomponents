const fs = require('fs/promises');
const fsDir = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const UI5WC_TO_STORYBOOK_TYPES_MAP = {
	'string': 'text',
	'String': 'text',
	'array': 'object',
	'Array': 'object',
	'boolean': 'boolean',
	'object': 'object',
	'Object': 'object',
	'Integer': 'number',
	'Float': 'number',
	'Number': 'number',
	'File': 'file',
	'HTMLElement': 'text',
	'CSSColor': 'color'
}

const STORIES_ROOT_FOLDER_NAME = '_storiesGenerated';

const main = async () => {
	const packages = [
		"fiori",
		"main",
	];

	const components = [];

	packages.forEach(async package => {
		const samplesPath = `../${package}/test/samples/`;

		var files = await fs.readdir(samplesPath);

		//handling error
		if (!files) {
			return console.log('Unable to scan directory: ' + err);
		}

		files.forEach(file => {
			components.push(file);
		});
	});

	components.sort();

	const baseAPI = JSON.parse((await fs.readFile(`../base/dist/api.json`)).toString());

	packages.forEach(async package => {
		const samplesPath = `../${package}/test/samples/`;
		const api = JSON.parse((await fs.readFile(`../${package}/dist/api.json`)).toString());

		const files = await fs.readdir(samplesPath);

		files.forEach(async (file) => {
			console.error('Preparing samples...', file);

			//Copy samples
			await fs.copyFile(path.join(samplesPath, file), path.join(process.cwd(), `/docs/components/${file}`));

			//Read file
			let result = (await fs.readFile(path.join(samplesPath, file))).toString();
			const $ = cheerio.load(result);

			await generateStoryDoc(package, file, api);
			const appendDocs = api.symbols.find(s => s.module === file.split('.')[0]).appenddocs;
			if (appendDocs) {
				for (const currSymbol of appendDocs.split(' ')) {
					await generateStoryDoc(package, currSymbol + '.sample.html', api)
				}
			}
		});
	});

	async function generateStoryDoc(package, file, api) {

		const apiData = getAPIData(api, file.split('.')[0]);
		const storyDir = createStoryDirectory(package, file);

		await fs.writeFile(storyDir + '/Description.md', apiData.storyDescription);
		await fs.writeFile(storyDir + '/argsTypes.js', `export default ` + apiData.storyArgsTypes);
	};

	function createStoryDirectory(package, file) {
		let storyDir = path.join(process.cwd(), `/${STORIES_ROOT_FOLDER_NAME}/${package}`);

		if (!fsDir.existsSync(storyDir)){ // check if the package folder exists and creates one if it doesn't
			fsDir.mkdirSync(storyDir);
		}

		storyDir += `/${file.substring(0, file.indexOf('.'))}`;

		if (!fsDir.existsSync(storyDir)){ // check if the component folder exists and creates one if it doesn't
			fsDir.mkdirSync(storyDir);
		}

		return storyDir;
	};

	function getAPIData(api, module) {
		const moduleAPI = api.symbols.find(s => s.module === module);
		const args = getArgsTypes(api, moduleAPI);

		return {
			storyDescription: moduleAPI.description.replaceAll('<br>', '<br/>'),
			storyArgsTypes: JSON.stringify(args, null, "\t")
		};
	}

	function getArgsTypes(api, moduleAPI) {
		let args = {};
		if (moduleAPI?.events) {
			moduleAPI.events.forEach(event => {
				if (event.visibility && event.visibility === 'public') {
					args[event.name] = {
						action: event.name,
						table: {
							category: "Events"
						},
					};
				}
			})
		}
		if (moduleAPI?.properties) {
			moduleAPI.properties.forEach(prop => {
				if (prop.visibility && prop.visibility === 'public') {
					const controlType = UI5WC_TO_STORYBOOK_TYPES_MAP[prop.type] || 'select';
					args[prop.name] = {
						description: prop.description.replaceAll('<br>', '<br/>'),
						control: controlType,
						table: {
							defaultValue: {
								summary: prop.defaultValue
							},
							category: "Properties"
						},
					};
					if (controlType === 'select') {
						const typeEnum = api.symbols.find(s => s.module === 'types/' + prop.type) || baseAPI.symbols.find(s => s.module === 'types/' + prop.type);
						if (typeEnum && Array.isArray(typeEnum.properties)) {
							args[prop.name].options = typeEnum.properties.map(a => a.type);
						}
					}
				}
			});
		}

		if (moduleAPI?.slots) {
			moduleAPI.slots.forEach(slot => {
				if (slot.visibility && slot.visibility === 'public') {
					args[slot.name] = {
						description: slot.description.replaceAll('<br>', '<br/>'),
						control: slot.type,
						table: {
							category: "Slots"
						},
					};
				}
			});
		}

		// recursively merging the args from the parent/parents
		const moduleAPIBeingExtended = api.symbols.find(s => s.module === moduleAPI.extends) || baseAPI.symbols.find(s => s.module === moduleAPI.extends);
		if (moduleAPIBeingExtended) {
			args = {...args, ...getArgsTypes(api, moduleAPIBeingExtended)};
		}

		return args;
	}

};

main();
