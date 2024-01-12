const fs = require("fs").promises;
const path = require("path");
// https://github.com/webcomponents/custom-elements-manifest/blob/main/schema.json

const inputDir = process.argv[2];
const outputDir = process.argv[3];

const generateJavaScriptExport = entity => {
	return {
		declaration: {
			name: entity.basename,
			module: entity.resource,
		},
		kind: "js",
		name: "default",
	};
};

const generateCustomElementExport = entity => {
	if (!entity.tagname) return;

	return {
		declaration: {
			name: entity.basename,
			module: entity.resource,
		},
		kind: "custom-element-definition",
		name: entity.tagname,
	};
};

const generateJavaScriptModule = entity => {
	const exports = [generateJavaScriptExport(entity)];

	if (entity.tagname) {
		exports.push(generateCustomElementExport(entity));
	}

	return {
		kind: "javascript-module",
		path: entity.resource,
		declarations: [
			generateCustomElementDeclaration(entity),
		],
		exports
	};
};

const generateSingleClassField = classField => {
	let generatedClassField = {
		deprecated: !!classField.deprecated,
		kind: "field",
		name: classField.name,
		privacy: classField.visibility,
		static: !!classField.static,
		type: generateType(classField.type),
	};

	if (classField.defaultValue) {
		generatedClassField.default = classField.defaultValue;
	}

	if (classField.description) {
		generatedClassField.description = classField.description;
	}

	return generatedClassField;
};

const generateSingleParameter = parameter => {
	let generatedParameter = {
		deprecated: !!parameter.deprecated,
		name: parameter.name,
		type: generateType(parameter.type),
	};

	if (parameter.description) {
		generatedParameter.description = parameter.description;
	}

	if (parameter.optional) {
		generatedParameter.optional = parameter.optional;
	}

	return generatedParameter;
};

const generateParameters = (parameters) => {
	return parameters.reduce((newParametersArray, parameter) => {
		newParametersArray.push(generateSingleParameter(parameter));

		return newParametersArray;
	}, []);
};

const generateSingleClassMethod = classMethod => {
	let generatedClassMethod = {
		deprecated: !!classMethod.deprecated,
		kind: "method",
		name: classMethod.name,
		privacy: classMethod.visibility,
		static: classMethod.static,
	};

	if (classMethod.description) {
		generatedClassMethod.description = classMethod.description;
	}

	if (classMethod.parameters && classMethod.parameters.length) {
		generatedClassMethod.parameters = generateParameters(classMethod.parameters);
	}

	if (classMethod.returnValue) {
		generatedClassMethod.return = {
			type: generateType(classMethod.returnValue.type),
		};

		if (classMethod.returnValue.description) {
			generatedClassMethod.return.description = classMethod.returnValue.type;
		}
	}

	return generatedClassMethod;
};

const generateClassFields = classFields => {
	return classFields.reduce((newClassFieldsArray, classField) => {
		newClassFieldsArray.push(generateSingleClassField(classField));

		return newClassFieldsArray;
	}, []);
};

const generateClassMethods = classMethods => {
	return classMethods.reduce((newClassMethodsArray, classMethod) => {
		newClassMethodsArray.push(generateSingleClassMethod(classMethod));

		return newClassMethodsArray;
	}, []);
};

const generateMembers = (classFields, classMethods) => {
	return [...generateClassFields(classFields), ...generateClassMethods(classMethods)];
};

const generateType = type => {
	return {
		text: type,
	};
};

const generateSingleEvent = event => {
	let generatedEvent = {
		deprecated: !!event.deprecated,
		name: event.name,
		type: event.native === "true" ? "NativeEvent" : "CustomEvent",
	};

	if (event.description) {
		generatedEvent.description = event.description;
	}

	return generatedEvent;
};

const generateEvents = events => {
	events = events.reduce((newEventsArray, event) => {
		newEventsArray.push(generateSingleEvent(event));

		return newEventsArray;
	}, []);

	return events;
};

const generateSingleSlot = slot => {
	return {
		deprecated: !!slot.deprecated,
		description: slot.description,
		name: slot.name,
	};
};

const generateSlots = slots => {
	slots = slots.reduce((newSlotsArray, event) => {
		newSlotsArray.push(generateSingleSlot(event));

		return newSlotsArray;
	}, []);

	return slots;
};

const generateCustomElementDeclaration = entity => {
	let generatedCustomElementDeclaration = {
		deprecated: !!entity.deprecated,
		customElement: true,
		kind: entity.kind,
		name: entity.basename,
		tagName: entity.tagname,
	};

	const slots = filterPublicApi(entity.slots);
	const events = filterPublicApi(entity.events);
	const classFields = filterPublicApi(entity.properties);
	const classMethods = filterPublicApi(entity.methods);

	if (slots.length) {
		generatedCustomElementDeclaration.slots = generateSlots(slots);
	}

	if (events.length) {
		generatedCustomElementDeclaration.events = generateEvents(events);
	}

	if (entity.description) {
		generatedCustomElementDeclaration.description = entity.description;
	}

	if (classFields.length || classMethods.length) {
		generatedCustomElementDeclaration.members = generateMembers(classFields, classMethods);
	}

	if (entity.extends && entity.extends !== "HTMLElement") {
		generatedCustomElementDeclaration.superclass = generateRefenrece(entity.extends);
	}

	return generatedCustomElementDeclaration;
};

const generateRefenrece = (entityName) => {
	return {
		name: entityName,
	};
};

const filterPublicApi = array => {
	return (array || []).filter(el => el.visibility === "public");
};

const generate = async () => {
	const file = JSON.parse(await fs.readFile(path.join(inputDir, "api.json")));
	let customElementsManifest = {
		schemaVersion: "1.0.0",
		readme: "",
		modules: [],
	};

	filterPublicApi(file.symbols).forEach(entity => {
		if (entity.tagname || entity.kind === "class") {
			customElementsManifest.modules.push(generateJavaScriptModule(entity));
		}
	});

	await fs.writeFile(path.join(outputDir, "custom-elements.json"), JSON.stringify(customElementsManifest));
};

generate().then(() => {
	console.log("Custom elements manifest generated.");
});
