const fs = require("fs").promises;
const path = require("path");
// https://github.com/webcomponents/custom-elements-manifest/blob/main/schema.json

const inputDir = process.argv[2];
const outputDir = process.argv[3];

const moduleDeclarations = new Map();

const generateJavaScriptExport = entity => {
	return {
		declaration: {
			name: entity.basename,
			module: `dist/${entity.resource}`,
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
			module: `dist/${entity.resource}`,
		},
		kind: "custom-element-definition",
		name: entity.basename,
	};
};

const generateSingleClassField = classField => {
	let generatedClassField = {
		kind: "field",
		name: classField.name,
		type: generateType(classField.type),
		privacy: classField.visibility,
		deprecated: !!classField.deprecated || undefined,
		static: !!classField.static || undefined,
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
		deprecated: !!parameter.deprecated || undefined,
		name: parameter.name,
		type: generateType(parameter.type),
	};

	if (parameter.description) {
		generatedParameter.description = parameter.description;
	}

	if (parameter.optional) {
		generatedParameter.optional = parameter.optional;
		generatedParameter.default = parameter.defaultValue;
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
		deprecated: !!classMethod.deprecated || undefined,
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
			generatedClassMethod.return.description = classMethod.returnValue.description;
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
		deprecated: !!event.deprecated || undefined,
		name: event.name,
		type: generateType(event.native === "true" ? "NativeEvent" : "CustomEvent")
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
		deprecated: !!slot.deprecated || undefined,
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
		deprecated: !!entity.deprecated || undefined,
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
		let declaration = moduleDeclarations.get(entity.resource);

		if (!declaration) {
			moduleDeclarations.set(entity.resource, {
				declarations: [],
				exports: [],
			});
			declaration = moduleDeclarations.get(entity.resource);
		}

		if (entity.kind === "class" && entity.tagname) {
			declaration.declarations.push(generateCustomElementDeclaration(entity));
			declaration.exports.push(generateJavaScriptExport(entity));
			declaration.exports.push(generateCustomElementExport(entity));
		} else if (entity.kind === "class" && entity.static) {
			declaration.exports.push(generateJavaScriptExport(entity));
		}
	});

	[...moduleDeclarations.keys()].forEach(key => {
		let declaration = moduleDeclarations.get(key);

		customElementsManifest.modules.push({
			kind: "javascript-module",
			path: `dist/${key}`,
			declarations: declaration.declarations,
			exports: declaration.exports
		})
	})

	await fs.writeFile(path.join(outputDir, "custom-elements.json"), JSON.stringify(customElementsManifest));
};

generate().then(() => {
	console.log("Custom elements manifest generated.");
});
