const api = require('../../packages/main/dist/api.json');
const cssVariables = require('../../packages/main/docs/themes/css-vars.json');
const template = require('./templates/template').template;
const sinceTemplate = require('./templates/api-component-since').template;
const propertiesTemplate = require('./templates/api-properties-section').template;
const slotsTemplate = require('./templates/api-slots-section').template;
const eventsTemplate = require('./templates/api-events-section').template;
const methodsTemplate = require('./templates/api-methods-section').template;
const cssVariablesTemplate = require('./templates/api-css-variables-section').template;
const Handlebars = require('handlebars/dist/handlebars.min.js');
const fs = require('fs');
const mkdirp = require('mkdirp');

const entries = api['symbols'];
const compiledHandlebars = Handlebars.compile(template);
const compiledSinceTemplate = Handlebars.compile(sinceTemplate);
const linkMatcher = /{@link(\s)(\w+)\s*}/gi;
const sinceMarker = "<!--since_tag_marker-->";

const getComponentByName = name => {
	return entries.find(element => {
		return element.basename === name;
	}) 
};

const getCSSVarsByName = name => {
	return cssVariables[name] || [];
};

const capitalize = str => {
	return str.replace(/^./, str => str.toUpperCase());
};

Handlebars.registerHelper('toLowerCase', function (str) {
	return str ? str.toLowerCase() : "";
});

Handlebars.registerHelper('toKebabCase', function (str) {
	const kebab = str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	return kebab !== str ? kebab : "";
});

Handlebars.registerHelper('checkEven', function (iIndex) {
	return (iIndex % 2 === 0) ? "api-table-roll-even" : "api-table-roll-odd";
});

Handlebars.registerPartial('properties', propertiesTemplate);
Handlebars.registerPartial('slots', slotsTemplate);
Handlebars.registerPartial('events', eventsTemplate);
Handlebars.registerPartial('methods', methodsTemplate);
Handlebars.registerPartial('cssVariables', cssVariablesTemplate);

mkdirp(`dist/test-resources/sap/ui/webcomponents/main/api`);

let entriesAPI = [];

const appendCSSVarsAPI = entry => {
	entry.cssVariables = getCSSVarsByName(entry.basename);
	return entry;
}

const calculateAPI = entry => {
	if (entriesAPI.indexOf(entry.basename) !== -1) {
		return entry;
	}

	let parent = getComponentByName(entry.extends) || {};

	entry = appendCSSVarsAPI(entry);
	parent = appendCSSVarsAPI(parent);

	parent = { ...{ properties: [], events: [], slots: [], cssVariables: [] }, ...parent };

	// extend component documentation
	entry.properties = [...(entry.properties || []), ...(parent.properties || [])];
	entry.events = [...(entry.events || []), ...(parent.events || [])];
	entry.slots = [...(entry.slots || []), ...(parent.slots || [])];
	entry.cssVariables = [...(entry.cssVariables || []), ...(parent.cssVariables || [])];

	entriesAPI.push(entry.basename);

	return entry;
}

const appendAdditionalEntriesAPI = entry => {
	if (entry.appenddocs) {
		const additionalEntries = entry.appenddocs.split(" ");
		entry.additionalDocs = [];

		additionalEntries.forEach(entryName => {
			let additionalEntry = getComponentByName(entryName);
			additionalEntry = calculateAPI(additionalEntry);
			entry.additionalDocs.push(additionalEntry);
		});
	}

	return entry;
}

const generateSamplePage = entry => {
	let content = "";

	try {
		content = fs.readFileSync(`dist/test-resources/sap/ui/webcomponents/main/samples/${capitalize(entry.basename)}.sample.html`, 'utf8');
	} catch (err) { }

	if (content) {
		const fnRedirect = `
		<script>
			function redirect(event, component) {
					event.preventDefault();
					var location = window.parent.location.href;
					window.parent.location.href = location.replace(/components\\/.+/gi, "components/" + component);
			};
		</script>
		`;
		const APIReference = compiledHandlebars(entry).replace(/\[\]/g, " [0..n]");
		const EntitySince = compiledSinceTemplate(entry).replace(/\[\]/g, " [0..n]");

		content = content.replace('</body', APIReference + '</body');
		content = content.replace('</body', fnRedirect + '</body');
		content = content.replace(sinceMarker, EntitySince);

		content = content.replace(linkMatcher, match => {
			const component = linkMatcher.exec(match)[2];

			// reset the regex
			linkMatcher.lastIndex = 0;

			return `<a href="#" onclick="redirect(event, '${component}')">${component}</a>`;
		});

		fs.writeFile(`dist/test-resources/sap/ui/webcomponents/main/api/${entry.basename}.sample.html`, content, (err) => {
			// console.log(err);
		});
	}
}

const generateComponentAPI = entry => {
	// (1) calculate the API
	entry = calculateAPI(entry);

	// (2) append additional API for composition components - List -> ListIems, TabContainer -> Tabs, Table -> TableRow/Column/Cell
	entry = appendAdditionalEntriesAPI(entry);

	// (3) generate sample page
	generateSamplePage(entry);
}

entries.forEach(generateComponentAPI);
entriesAPI = [];
