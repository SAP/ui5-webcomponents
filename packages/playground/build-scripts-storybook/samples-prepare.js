const fs = require('fs/promises');
const fsDir = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const EXCLUDE_LIST = [
	"AvatarGroup.sample.html",
	"BarcodeScannerDialog.sample.html",
	"BusyIndicator.sample.html",
	"Button.sample.html",
	"Card.sample.html",
	"Carousel.sample.html",
	"CheckBox.sample.html",
	"ComboBox.sample.html",
	"DateTimePicker.sample.html",
	"Dialog.sample.html",
	"FileUploader.sample.html",
	"FlexibleColumnLayout.sample.html",
	"IllustratedMessage.sample.html",
	"Input.sample.html",
	"List.sample.html",
	"MultiInput.sample.html",
	"MessageStrip.sample.html",
	"NotificationListGroupItem.sample.html",
	"Page.sample.html",
	"NotificationListItem.sample.html",
	"Panel.sample.html",
	"Popover.sample.html",
	"ProductSwitch.sample.html",
	"ResponsivePopover.sample.html",
	"ShellBar.sample.html",
	"SideNavigation.sample.html",
	"TabContainer.sample.html",
	"Table.sample.html",
	"Toast.sample.html",
	"Tree.sample.html",
	"UploadCollection.sample.html",
	"Wizard.sample.html",
]

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

const main = async () => {
	const template = await fs.readFile(path.join(__dirname, '../stories/template.mdx'), 'utf8');
	const packages = [
		"fiori",
		"main",
	];

	const components = [];

	// TODO: handle new components 
	// Add new components here
	const newComponents = [
		"Menu",
	];

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

	packages.forEach(async package => {
		const samplesPath = `../${package}/test/samples/`;
		const api = JSON.parse((await fs.readFile(`../${package}/dist/api.json`)).toString());


		const files = await fs.readdir(samplesPath);

		files.forEach(async (file) => {
			if (EXCLUDE_LIST.includes(file)) {
				return;
			}
			console.error('Preparing samples...', file);

			//Copy samples
			await fs.copyFile(path.join(samplesPath, file), path.join(process.cwd(), `/docs/components/${file}`));

			//Read file
			let result = (await fs.readFile(path.join(samplesPath, file))).toString();
			const $ = cheerio.load(result);

			const snippets = [];

			$('.snippet').each((i, snippet) => {
				const section = $(snippet).parent();
				section.find("pre").remove();

				snippets.push(section.html().trim());
			});

			let storyDir = path.join(process.cwd(), `/_storiesGenerated/${package}`);

			if (!fsDir.existsSync(storyDir)){ // check if the package folder exists and creates one if it doesn't
				fsDir.mkdirSync(storyDir);
			}

			storyDir += `/${file.substring(0, file.indexOf('.'))}`;

			if (!fsDir.existsSync(storyDir)){ // check if the component folder exists and creates one if it doesn't
				fsDir.mkdirSync(storyDir);
			}
			storyDir += `/${file.replace('.sample.html', '.stories.mdx')}`;

			const storyData = getStory(api, file.split('.')[0], snippets);

			await fs.writeFile(storyDir, storyData.storyContent);
			await fs.writeFile(storyDir.substring(0, storyDir.lastIndexOf('/')) + '/Description.md', storyData.storyDescription);
			await fs.writeFile(storyDir.substring(0, storyDir.lastIndexOf('/')) + '/argsTypes.js', `export default ` + storyData.storyArgsTypes);
		});
	});

	function getAPI(api, module) {
		const args = {};
		const moduleAPI = api.symbols.find(s => s.module === module);

		if (moduleAPI?.properties) {
			moduleAPI.properties.forEach(prop => {
				const controlType = UI5WC_TO_STORYBOOK_TYPES_MAP[prop.type] || 'select';
				args[prop.name] = {
					description: prop.description,
					control: controlType,
					table: {
						defaultValue: {
							summary: prop.defaultValue
						},
						category: "Properties"
					},
				};
				if (controlType === 'select') {
					const typeEnum = api.symbols.find(s => s.module === 'types/' + prop.type);
					if (typeEnum && Array.isArray(typeEnum.properties)) {
						args[prop.name].options = typeEnum.properties.map(a => a.type);
					}
				}
			});
		}

		if (moduleAPI?.slots) {
			moduleAPI.slots.forEach(prop => {
				args[prop.name] = {
					description: prop.description,
					control: prop.type,
				};
			});
		}

		return {
			args,
			name: moduleAPI.basename,
			description: moduleAPI.description
		};
	}

	function getStory(api, module, snippets) {
		const data = getAPI(api, module);

		const stories = snippetsToStories(snippets);

		const storyContent = template
			.replace(/{{stories}}/g, stories.join("\n"))
			.replace(/{{name}}/g, data.name); // spacing level = 2

		return {
			storyContent: storyContent,
			storyDescription: data.description,
			storyArgsTypes: JSON.stringify(data.args, null, "\t")
		}
	};

	function snippetsToStories(snippets) {
		return snippets.map((snippet, index) => {
			let content = snippet
				.replaceAll('\`', '\\`')
			return `
<Preview>
	<Story name="default-${index}">
		{html\`${content}\`}
	</Story>
</Preview>`
		});
	}
};

main();
