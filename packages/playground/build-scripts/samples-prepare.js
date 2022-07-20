const fs = require('fs/promises');
const path = require('path');
const enrichSampleWihAPI = require("./api-for-sample/index.js");

const packages = [
	"fiori",
	"main",
];

const components = [];

// Add new components here
const newComponents = [
	"Menu",
];

const main = async () => {
	await Promise.all(packages.map(async (package) => {
		const samplesPath = `../${package}/test/samples/`;

		var files = await fs.readdir(samplesPath);

		files.forEach(file => {
			components.push(file);
		});
	}));

	components.sort();

	packages.forEach(async (package) => {
		const samplesPath = `../${package}/test/samples/`;
		const api = JSON.parse((await fs.readFile(`../${package}/dist/api.json`)).toString());

		const files = await fs.readdir(samplesPath);

		files.forEach(async (file) => {
			const currentSampleName = file.slice(0, file.indexOf('.'));

			// read file
			let result = (await fs.readFile(path.join(samplesPath, file))).toString();
			
			// replace pre
			result = result.replaceAll(`<pre class="prettyprint lang-html"><xmp>`, '<pre class="highlight">{% highlight html %}');
			result = result.replaceAll(`</xmp></pre>`, '{% endhighlight %}</pre>');
			
			// add api
			result = await enrichSampleWihAPI(currentSampleName, api, result);

			// prepend front matter
			result = `---
layout: sample
title: ${currentSampleName.replace(/([A-Z])/g, " $1").trim()}
parent: Components
permalink: /playground/components/${currentSampleName}/
newComponent: ${newComponents.indexOf(currentSampleName) > -1}
nav_order: ${components.indexOf(file) + 1}
---
${result}`;

			// write result
			fs.writeFile(`docs/components/${file}`, result);

		});
	});

};

main();