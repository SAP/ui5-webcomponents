const fs = require("fs").promises;
const path = require("path");

// https://github.com/webcomponents/custom-elements-manifest/blob/main/schema.json

const camelToKebabMap = new Map();

const camelToKebabCase = string => {
	if (!camelToKebabMap.has(string)) {
		const result = string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
		camelToKebabMap.set(string, result);
	}
	return camelToKebabMap.get(string);
};

const generateJavaScriptExport = entity => {
	return {
		//A reference to the exported declaration.
		//
		//In the case of aggregating exports, the reference's `module` field must be
		//defined and the `name` field must be `\"*\"`.
		declaration: { // #/definitions/Reference
			name: `${entity.basename}`,
			module: `${entity.module}.js`
		},
		// Whether the export is deprecated. For example, the name of the export was changed.
		//If the value is a string, it's the reason for the deprecation.
		deprecated: !!entity.deprecated,
		kind: "js",
		// The name of the exported symbol.
		//
		//JavaScript has a number of ways to export objects which determine the
		//correct name to use.
		//
		//- Default exports must use the name \"default\".
		//- Named exports use the name that is exported. If the export is renamed
		//  with the \"as\" clause, use the exported name.
		//- Aggregating exports (`* from`) should use the name `*`
		name: "default"
	}
}

const generateCustomElementExport = entity => {
	return {
		//A reference to the class or other declaration that implements the
		//custom element.
		declaration: {
			name: entity.basename,
			module: `${entity.module}.js`
		},
		// Whether the custom-element export is deprecated.
		//For example, a future version will not register the custom element in this file.
		//If the value is a string, it's the reason for the deprecation.
		deprecated: !!entity.deprecated,
		kind: "custom-element-definition",
		// The tag name of the custom element.
		name: entity.tagname
	}
}

const generateJavaScriptModule = entity => {
	return {
		"kind": "javascript-module",
		"path": `${entity.basename}.js`,
		"declarations": [
			generateCustomElementDeclaration(entity)
		],
		"exports": [
			generateJavaScriptExport(entity),
			generateCustomElementExport(entity),
		]
	}
};

const generateSingleClassField = (classField) => {
	return {
		default: classField.defaultValue,
		// Whether the property is deprecated.
		//If the value is a string, it's the reason for the deprecation.
		deprecated: !!classField.deprecated, // TODO: Check how entity is marked as deprecated
		// A markdown description.
		description: classField.description,
		inheritedFrom: {}, // #/definitions/Reference
		kind: "field",
		name: classField.name,
		privacy: classField.visibility,
		source: {}, // #/definitions/SourceReference
		static: false,
		// A markdown summary suitable for display in a listing.
		summary: "",
		type: generateType(classField.type),
	}
};

const generateSingleParameter = (parameter) => {
	return {
		default: {},
		// Whether the property is deprecated.\nIf the value is a string, it's the reason for the deprecation.
		deprecated: false,
		// A markdown description of the field.
		description: "",
		name: parameter.name,
		// Whether the parameter is optional. Undefined implies non-optional.
		optional: parameter.optional,
		// Whether the parameter is a rest parameter. Only the last parameter may be a rest parameter.\nUndefined implies single parameter.
		rest: false,
		// A markdown summary suitable for display in a listing.
		summary: "",
		type: generateType(parameter.type)
	}
}

const generateParameters = (parameters) => {
	parameters = parameters.reduce((newParametersArray, parameter) => {
		newParametersArray.push(generateSingleParameter(parameter));

		return newParametersArray;
	}, [])

	return parameters
}

const generateSingleClassMethod = (classMethod) => {
	return {
		// Whether the function is deprecated.
		//If the value is a string, it's the reason for the deprecation.
		deprecated: !!classMethod.deprecated, // TODO: Check how entity is marked as deprecated
		// A markdown description.
		description: classMethod.description,
		inheritedFrom: {}, // #/definitions/Reference
		kind: "method",
		name: classMethod.name,
		parameters: generateParameters(classMethod.parameters || []),
		privacy: classMethod.visibility,
		return: {
			// A markdown description.
			description: "",
			// A markdown summary suitable for display in a listing.
			summary: "",
			type: classMethod.returnValue ? generateType(classMethod.returnValue) : undefined
		},
		source: {}, // #/definitions/SourceReference
		static: false,
		// A markdown summary suitable for display in a listing.
		summary: "",
	}
};

const generateClassFields = (classFields) => {
	classFields = classFields.reduce((newClassFieldsArray, classField) => {
		newClassFieldsArray.push(generateSingleClassField(classField));

		return newClassFieldsArray;
	}, [])

	return classFields
}

const generateClassMethods = (classMethods) => {
	classMethods = classMethods.reduce((newClassMethodsArray, classMethod) => {
		newClassMethodsArray.push(generateSingleClassMethod(classMethod));

		return newClassMethodsArray;
	}, [])

	return classMethods
}

const generateMembers = (classFields, classMethods) => {
	return [...generateClassFields(classFields), ...generateClassMethods(classMethods)];
}

const generateType = (type) => {
	return {
		// An array of references to the types in the type string.

		// These references have optional indices into the type string so that tools
		// can understand the references in the type string independently of the type
		// system and syntax. For example, a documentation viewer could display the
		// type `Array<FooElement | BarElement>` with cross-references to `FooElement`
		// and `BarElement` without understanding arrays, generics, or union types.
		references: [], // #/definitions/TypeReference
		source: {}, // #/definitions/SourceReference
		// The full string representation of the type, in whatever type syntax is
		// used, such as JSDoc, Closure, or TypeScript.
		text: type
	}
}

const generateSingleAttribute = (attribute) => {
	return {
		// The default value of the attribute, if any.

		// As attributes are always strings, this is the actual value, not a human
		// readable description.
		default: attribute.defaultValue,
		// Whether the attribute is deprecated.
		// If the value is a string, it's the reason for the deprecation.
		deprecated: !!attribute.deprecated, // TODO: Check how entity is marked as deprecated
		// A markdown description.
		description: attribute.description,
		// The name of the field this attribute is associated with, if any.
		fieldName: attribute.name,
		inheritedFrom: {}, // #/definitions/Reference
		name: camelToKebabCase(attribute.name),
		// A markdown summary suitable for display in a listing.
		summary: "",
		// The type that the attribute will be serialized/deserialized as.
		type: generateType(attribute.type)
	}
}

const generateAttributes = (attributes) => {
	attributes = attributes.reduce((newAttributesArray, attribute) => {
		newAttributesArray.push(generateSingleAttribute(attribute));

		return newAttributesArray;
	}, [])

	return attributes;
};

const generateSingleEvent = (event) => {
	return {
		// Whether the event is deprecated.
		// If the value is a string, it's the reason for the deprecation.
		deprecated: !!event.deprecated,  // TODO: Check how entity is marked as deprecated
		// A markdown description.
		description: event.description,
		inheritedFrom: {}, // #/definitions/Reference
		name: event.name,
		// A markdown summary suitable for display in a listing.
		summary: "",
		// The type of the event object that's fired.
		type: generateType("CustomEvent") // #/definitions/Type
	}
}

const generateEvents = (events) => {
	events = events.reduce((newEventsArray, event) => {
		newEventsArray.push(generateSingleEvent(event));

		return newEventsArray;
	}, [])

	return events;
}

const generateSingleSlot = (slot) => {
	return {
		// Whether the slot is deprecated.
		// If the value is a string, it's the reason for the deprecation.
		deprecated: !!slot.deprecated, // TODO: Check how entity is marked as deprecated
		// A markdown description.
		description: slot.description,
		// The slot name, or the empty string for an unnamed slot.
		name: slot.name,
		// A markdown summary suitable for display in a listing.
		summary: ""
	}
}

const generateSlots = (slots) => {
	slots = slots.reduce((newSlotsArray, event) => {
		newSlotsArray.push(generateSingleSlot(event));

		return newSlotsArray;
	}, [])

	return slots;
}

const generateCustomElementDeclaration = (entity) => {
	// A description of a custom element class.

	// Custom elements are JavaScript classes, so this extends from
	// `ClassDeclaration` and adds custom-element-specific features like
	// attributes, events, and slots.

	// Note that `tagName` in this interface is optional. Tag names are not
	// neccessarily part of a custom element class, but belong to the definition
	// (often called the \"registration\") or the `customElements.define()` call.

	// Because classes and tag names can only be registered once, there's a
	// one-to-one relationship between classes and tag names. For ease of use,
	// we allow the tag name here.

	// Some packages define and register custom elements in separate modules. In
	// these cases one `Module` should contain the `CustomElement` without a
	// tagName, and another `Module` should contain the
	// `CustomElementExport`.
	const slots = entity.slots || [];
	const events = entity.events || [];
	const attributes = (entity.properties || []).filter(property => {
		return property.type.toLowerCase !== "array" && property.type.toLowerCase !== "object";
	});
	const classFields = (entity.properties || []);

	return {
		// The attributes that this element is known to understand.
		attributes: generateAttributes(attributes),
		cssParts: [], // #/definitions/CssPart
		cssProperties: [], // #/definitions/CssCustomProperty
		// Distinguishes a regular JavaScript class from a custom element class
		customElement: true,
		demos: [], // #/definitions/Demo
		// Whether the class or mixin is deprecated. If the value is a string, it's the reason for the deprecation.
		deprecated: !!entity.deprecated, // TODO: Check how entity is marked as deprecated
		// A markdown description of the class.
		description: entity.description,
		// The events that this element fires.
		events: generateEvents(events),
		kind: entity.basename,
		members: generateMembers(classFields, entity.methods || []),
		// Any class mixins applied in the extends clause of this class.
		// If mixins are applied in the class definition, then the true superclass
		// of this class is the result of applying mixins in order to the superclass.

		// Mixins must be listed in order of their application to the superclass or
		// previous mixin application. This means that the innermost mixin is listed
		// first. This may read backwards from the common order in JavaScript, but
		// matches the order of language used to describe mixin application, like
		// \"S with A, B\".
		mixins: [], // #/definitions/Reference
		name: entity.basename,
		// The shadow dom content slots that this element accepts.
		slots: generateSlots(slots),
		source: {}, // #/definitions/SourceReference
		// A markdown summary suitable for display in a listing.
		summary: "",
		// The superclass of this class.

		// If this class is defined with mixin
		// applications, the prototype chain includes the mixin applications
		// and the true superclass is computed from them.
		superclass: {}, // #/definitions/Reference
		// An optional tag name that should be specified if this is a
		// self-registering element.

		// Self-registering elements must also include a CustomElementExport
		// in the module's exports.
		tagName: entity.tagname
	}
}

const generate = async () => {
	const apiFile = JSON.parse(await fs.readFile("./dist/api.json", { encoding: "UTF-8" }));
	const customElementsManifest = {
		schemaVersion: "1.0.0",
		readme: "",
		modules: []
	}
	let entities = apiFile.symbols;

	if (!entities.length) {
		throw new Error("api.json is empty");
	}

	entities.forEach(entity => {
		if (entity.tagname) {
			customElementsManifest.modules.push(generateJavaScriptModule(entity));
		}
	})

	return fs.writeFile("./dist/custom-elements.json", JSON.stringify(customElementsManifest));
};

generate().then(() => {
	console.log("Custom elements manifest generated.");
});
