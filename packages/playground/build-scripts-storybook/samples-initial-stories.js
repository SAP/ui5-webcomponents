const fs = require('fs/promises');
const fsDir = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const STORIES_ROOT_FOLDER_NAME = '_stories';

const main = async () => {
	const template = await fs.readFile(path.join(__dirname, './template'), 'utf8');
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
				const rawHtml = section
					.html()
					.trim()
					.replaceAll('\`', '\\`') // escape backticks
					.replaceAll('\$', '\\$') // escape $ for the template string
					.replace(/(^[ \t]*\n)/gm, "") // remove empty lines from a sample/snippet
					.replaceAll("<br>", "<br/>");

				snippets.push(rawHtml);
			});
			await generateStory(package, file, api, snippets);
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
		storyDir += `/${file.replace('.sample.html', '.stories.js')}`;

		return storyDir;
	};

	function getStoryData(api, moduleName, snippets, parentStoryName) {
		const module = api.symbols.find(s => s.module === moduleName);
		const name = module.basename;
		const tagname = module.tagname;
		let subComponents = [];

		const stories = snippetsToStories(snippets);

		if (module.appenddocs) {
			subComponents = module.appenddocs.split(' ').map(subModuleName => {
				const subModule = api.symbols.find(s => s.module === subModuleName);
				if (subModule) return `'${subModuleName}' : '${subModule.tagname}'`;
			});
		}

		const storyContent = template
			.replace(/{{stories}}/g, stories.join("\n"))
			.replace(/{{name}}/g, parentStoryName? `${parentStoryName}/${name}` : name) // spacing level = 2
			.replace(/{{tagname}}/g, tagname)
			.replace(/{{subcomponents}}/g, subComponents.length ? subComponents.filter(Boolean).join(', ') : '');

		return storyContent;
	};

	function getInline(snippet) {
		// check if the snippet has inline script tags
		const hasInlineScript = snippet.includes('<script>')

		if (!hasInlineScript) {
			return '';
		}

		return `inline={false}`
	}

	function snippetsToStories(snippets) {
		if (snippets) {
			return snippets.map((snippet, index) => {
				return `
export const Template${index} = () => html\`
${snippet}
\`;`
			});
		} else {
				return 	[`

export const Template = () => html\`
<h3>Placeholder Story</h3>
<div class="snippet">
	<h5>Add your story here</h5>
</div>
\`;`
]
		}
	}
};

main();
