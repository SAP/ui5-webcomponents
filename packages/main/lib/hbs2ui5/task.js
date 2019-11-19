const hbs2lit = require('../hbs2lit');
const litRenderer = require('./RenderTemplates/LitRenderer');
const Resource = require("@ui5/fs").Resource;

module.exports = async function({workspace, dependencies, options}) {
	const handlebars = await workspace.byGlob("**/*.hbs");

	handlebars.forEach(async hbs =>  {
		const hbsCode = await hbs.getString();
		const litCode = await hbs2lit.compileString(hbsCode, {readers: [workspace]});
		const componentNameMatcher = /(\w+)(\.hbs)/gim;
		const componentName = componentNameMatcher.exec(hbs.getPath())[1];
		const litTemplate = litRenderer.generateTemplate(componentName, litCode);
		const resource = new Resource({string: litTemplate, path: `${componentName}.lit.js`});

		// console.log(litTemplate);
		return workspace.write(resource);
	});
	return true;
};