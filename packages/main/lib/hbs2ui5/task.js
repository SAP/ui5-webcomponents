const hbs2lit = require('../hbs2lit');
const litRenderer = require('./RenderTemplates/LitRenderer');
const resourceFactory = require("@ui5/fs").resourceFactory;

module.exports = async function({workspace, dependencies, options}) {
	const handlebars = await workspace.byGlob("/resources/*.hbs");

	const resources = handlebars.map(async hbs =>  {
		const hbsCode = await hbs.getString();
		const litCode = await hbs2lit.compileString(hbsCode, {readers: [workspace]});
		const componentNameMatcher = /(\w+)(\.hbs)/gim;
		const result = componentNameMatcher.exec(hbs.getPath());

		if (!result) {
			return Promise.resolve();
		}

		const componentName = result[1];
		const litTemplate = litRenderer.generateTemplate(componentName, litCode);
		const resource = resourceFactory.createResource({
			string: litTemplate,
			path: `/generated/templates/${componentName}.lit.js`
		});

		return workspace.write(resource);
	});
	
	return Promise.all(resources);
};