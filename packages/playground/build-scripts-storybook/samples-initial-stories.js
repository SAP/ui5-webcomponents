const fs = require('fs/promises');
const fsDir = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const STORIES_ROOT_FOLDER_NAME = '_storiesGenerated';

const main = async () => {
	const template = await fs.readFile(path.join(__dirname, '../stories/template.mdx'), 'utf8');
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

	packages.forEach(async package => {
		const samplesPath = `../${package}/test/samples/`;
		const api = JSON.parse((await fs.readFile(`../${package}/dist/api.json`)).toString());

		// api.symbols.filter(symbol => symbol.kind === 'class')
		const files = await fs.readdir(samplesPath);

		files.forEach(async (file) => {
			console.error('Preparing initial story...', file);

			//Copy samples
			await fs.copyFile(path.join(samplesPath, file), path.join(process.cwd(), `/docs/components/${file}`));

			//Read file
			let result = (await fs.readFile(path.join(samplesPath, file))).toString();
			const $ = cheerio.load(result);

			const snippets = [];

			$('.snippet').each((i, snippet) => {
				const section = $(snippet).parent();
				section.find("pre").remove();

				snippets.push(section.html().trim().replace(/(^[ \t]*\n)/gm, "")); // remove empty lines from a sample/snippet
			});
			await generateStory(package, file, api, snippets);
			const appendDocs = api.symbols.find(s => s.module === file.split('.')[0]).appenddocs;
			if (appendDocs) {
				for (const currSymbol of appendDocs.split(' ')) {
					await generateStory(package, currSymbol + '.sample.html', api, null, file.split('.')[0])
				}
			}
		});
	});

	async function generateStory(package, file, api, snippets, parentStoryName) {

		const storyData = getStoryData(api, file.split('.')[0], snippets, parentStoryName);
		const storyDir = createStoryDirectory(package, file);

		await fs.writeFile(storyDir, storyData);
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
		storyDir += `/${file.replace('.sample.html', '.stories.mdx')}`;

		return storyDir;
	};

	function getStoryData(api, module, snippets, parentStoryName) {
		const name = api.symbols.find(s => s.module === module).basename;

		const stories = snippetsToStories(snippets);

		const storyContent = template
			.replace(/{{stories}}/g, stories.join("\n"))
			.replace(/{{name}}/g, parentStoryName? `${parentStoryName}/${name}` : name); // spacing level = 2

		return storyContent;
	};

	function snippetsToStories(snippets) {
		if (snippets) {
			return snippets.map((snippet, index) => {
				let content = snippet
					.replaceAll('\`', '\\`')
				return `
<Canvas>
	<Story name="default-${index}">
		{html\`${content}\`}
	</Story>
</Canvas>`
			});
		} else {
				return 	[`
<Canvas>
	<Story name="placeholder">
		{html\`<h3>Placeholder Story</h3>
	<div class="snippet">
		<h5>Add your story here</h5>
	</div>\`}
	</Story>
</Canvas>`]
		}
	}
};

main();
