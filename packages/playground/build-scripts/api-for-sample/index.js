const cssVariables = {};
const template = require('./templates/template').template;
const sinceTemplate = require('./templates/api-component-since').template;
const propertiesTemplate = require('./templates/api-properties-section').template;
const slotsTemplate = require('./templates/api-slots-section').template;
const eventsTemplate = require('./templates/api-events-section').template;
const methodsTemplate = require('./templates/api-methods-section').template;
const cssVariablesTemplate = require('./templates/api-css-variables-section').template;
const Handlebars = require('handlebars/dist/handlebars.min.js');
const fs = require('fs').promises;

const compiledHandlebars = Handlebars.compile(template);
const compiledSinceTemplate = Handlebars.compile(sinceTemplate);
const sinceMarker = "<!--since_tag_marker-->";

const enrichSampleWihAPI = async (name, api, rawSampleContent) => {

	const entries = api['symbols'];

	const getComponentByName = name => {
		return entries.find(element => {
			return element.basename === name;
		})
	};

	const getCSSVarsByName = name => {
		return cssVariables[name] || [];
	};

	Handlebars.registerHelper('toLowerCase', function (str) {
		return str ? str.toLowerCase() : "";
	});

	Handlebars.registerHelper('toKebabCase', function (str) {
		const kebab = str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		return kebab !== str ? kebab : undefined;
	});

	Handlebars.registerHelper('checkEven', function (iIndex) {
		return (iIndex % 2 === 0) ? "api-table-roll-even" : "api-table-roll-odd";
	});

	Handlebars.registerPartial('properties', propertiesTemplate);
	Handlebars.registerPartial('slots', slotsTemplate);
	Handlebars.registerPartial('events', eventsTemplate);
	Handlebars.registerPartial('methods', methodsTemplate);
	Handlebars.registerPartial('cssVariables', cssVariablesTemplate);

	await fs.mkdir(`dist/api-samples`, { recursive: true });

	let entriesAPI = [];

	const appendCSSVarsAPI = entry => {
		entry.cssVariables = getCSSVarsByName(entry.basename);
		return entry;
	}

	const componentHasEntityItem = (component, entity, name) => {
		return component[entity].some(x => x && x.name === name);
	};
	const removeEmpty = arr => arr.filter(x => x);

	const calculateAPI = component => {
		if (entriesAPI.indexOf(component.basename) !== -1) {
			return component;
		}
		const entities = ["properties", "slots", "events", "methods", "cssVariables"];

		// Initialize all entities with [] if necessary, and remove undefined things, and only leave public things
		entities.forEach(entity => {
			component[entity] = removeEmpty(component[entity] || []).filter(x => x.visibility === "public");
		});

		component = appendCSSVarsAPI(component);

		let parent = getComponentByName(component.extends);
		if (parent) {
			let parentComponent = calculateAPI(parent);
			entities.forEach(entity => {
				parentComponent[entity].forEach(x => {
					if (!componentHasEntityItem(component, entity, x.name)) {
						component[entity].push(x);
					}
				});
			});
		}

		entriesAPI.push(component.basename);

		return component;
	};

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

	const generateSamplePage = async (entry, rawSampleContent) => {
		let result = rawSampleContent;

		entry.slots.forEach(slotData => {
			if (!slotData.type.startsWith("Node") && !slotData.type.startsWith("HTMLElement")) { // interface -> don't show in documentation
				slotData.type = "HTMLElement" + (slotData.type.endsWith("[]") ? "[]" : "");
			}
		});
		const APIReference = compiledHandlebars(entry).replace(/\[\]/g, " [0..n]");
		const EntitySince = compiledSinceTemplate(entry).replace(/\[\]/g, " [0..n]");

		result = result.replace("<!-- JSDoc marker -->", APIReference);
		result = result.replace(sinceMarker, EntitySince);

		return result;
	}


	// (1) calculate the API
	let entry = getComponentByName(name);
	entry = calculateAPI(entry);

	// (2) append additional API for composition components - List -> ListIems, TabContainer -> Tabs, Table -> TableRow/Column/Cell
	entry = appendAdditionalEntriesAPI(entry);

	// (3) generate sample page
	return generateSamplePage(entry, rawSampleContent);
};

module.exports = enrichSampleWihAPI;