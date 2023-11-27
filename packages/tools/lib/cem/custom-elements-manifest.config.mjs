import { parse } from "comment-parser";
import processEvent from "./event.mjs";
import {
	getDeprecatedStatus,
	getSinceStatus,
	getPrivacyStatus,
	getReference,
	validateJSDocComment,
	findDecorator,
	findAllDecorators,
	hasTag,
	findTag,
	findAllTags,
	getJSDocErrors,
	getTypeRefs,
} from "./utils.mjs";

function processClass(ts, classNode, moduleDoc) {
	const className = classNode?.name?.text;
	const currClass = moduleDoc?.declarations?.find(declaration => declaration?.name === className);
	const currClassJSdoc = classNode?.jsDoc?.[0] || classNode?.jsDoc?.find(jsDoc => jsDoc?.[0]?.getText?.()?.includes("@class"));

	if (!currClassJSdoc) return;

	const customElementDecorator = findDecorator(classNode, "customElement");
	const classParsedJsDoc = parse(currClassJSdoc?.getText())[0];

	validateJSDocComment("class", classParsedJsDoc, classNode.name?.text, moduleDoc);

	const decoratorArg = customElementDecorator?.expression?.arguments[0];
	currClass.tagName = decoratorArg?.text || (decoratorArg?.properties.find(property => property.name.text === "tag")?.initializer?.text);
	currClass.customElement = !!decoratorArg;
	currClass.kind = "class";
	currClass.deprecated = getDeprecatedStatus(classParsedJsDoc);
	currClass._ui5since = getSinceStatus(classParsedJsDoc);
	currClass._ui5privacy = getPrivacyStatus(classParsedJsDoc);
	currClass._ui5abstract = hasTag(classParsedJsDoc, "abstract") ? true : undefined;
	currClass.description = classParsedJsDoc.description || findTag(classParsedJsDoc, "class")?.description;
	currClass._ui5implements = findAllTags(classParsedJsDoc, "implements")
		.map(tag => getReference(ts, tag.type, classNode, moduleDoc.path))
		.filter(Boolean);


	if (hasTag(classParsedJsDoc, "extends")) {
		const superclassTag = findTag(classParsedJsDoc, "extends");
		currClass.superclass = getReference(ts, superclassTag.name, classNode, moduleDoc.path);
	}

	if (!currClass._ui5implements.length) delete currClass._ui5implements;

	// Slots

	// Slots without accessort (defined in class comment)
	if (hasTag(classParsedJsDoc, "slot") && currClass.slots) {
		const slotTags = findAllTags(classParsedJsDoc, "slot");

		currClass.slots.forEach(slot => {
			const tag = slotTags.find(tag => tag.name === slot.name);

			const typeRefs = (tag.type
				?.replaceAll(/Array<|>|\[\]/g, "")
				?.split("|")
				?.map(e => getReference(ts, e.trim(), classNode, moduleDoc.path)).filter(Boolean));

			slot._ui5privacy = "public";
			slot._ui5type = { text: tag.type };

			if (typeRefs && typeRefs.length) {
				slot._ui5type.references = typeRefs;
			}

			delete slot.type
		})
	}

	// Events
	currClass.events = findAllDecorators(classNode, "event")
		?.map(event => processEvent(ts, event, classNode, moduleDoc));

	// Slots (with accessor), methods and fields
	for (let i = 0; i < (currClass.members?.length || 0); i++) {
		const member = currClass.members[i];
		const classNodeMember = classNode.members?.find(nodeMember => nodeMember.name?.text === member?.name);
		const classNodeMemberJSdoc = classNodeMember?.jsDoc?.[0];

		if (!classNodeMember || !classNodeMemberJSdoc) continue;

		const memberParsedJsDoc = parse(classNodeMemberJSdoc?.getText())[0];

		member._ui5since = getSinceStatus(memberParsedJsDoc);
		member.deprecated === "true" && (member.deprecated = true)

		// Slots with accessors are treated like fields by the tool, so we have to convert them into slots.
		if (member.kind === "field") {
			const slotDecorator = findDecorator(classNodeMember, "slot");
			validateJSDocComment(slotDecorator ? "slot" : (member.readonly ? "getter" : "field"), memberParsedJsDoc, classNodeMember.name?.text, moduleDoc);

			const typeRefs = (getTypeRefs(ts, classNodeMember, member)
				?.map(e => getReference(ts, e, classNodeMember, moduleDoc.path)).filter(Boolean)) || [];

			if (member.type && typeRefs.length) {
				member.type.references = typeRefs;
			}

			if (slotDecorator) {
				if (!currClass.slots) currClass.slots = [];

				const slot = currClass.members.splice(i, 1)[0];
				const defaultProperty = slotDecorator.expression?.arguments?.[0]?.properties?.find(property => property.name.text === "default");

				// name of the default slot declared with decorator will be overriden so we to provide it's accessor name
				if (defaultProperty && defaultProperty.initializer?.kind === ts.SyntaxKind.TrueKeyword) {
					slot._ui5propertyName = slot.name;
					slot.name = "default";
				}

				// Slots don't have type, privacy and kind, so we have do convert them and to clean unused props
				member._ui5type = member.type;
				member._ui5privacy = member.privacy;
				delete member.type;
				delete member.privacy;
				delete slot.kind;

				currClass.slots.push(slot);
				i--;
			} else {
				if (hasTag(memberParsedJsDoc, "formProperty")) {
					member._ui5formProperty = true;
				}

				const formEventsTag = findTag(memberParsedJsDoc, "formEvents");
				if (formEventsTag) {
					const tagValue = formEventsTag.description ? `${formEventsTag.name} ${formEventsTag.description}` : formEventsTag.name;
					member._ui5formEvents = tagValue.trim().replaceAll(/\s+/g, ",");
				}

				const defaultTag = findTag(memberParsedJsDoc, "default");
				if (defaultTag) {
					const tagValue = defaultTag.source?.[0]?.tokens?.name || defaultTag.source?.[0]?.tokens?.description || defaultTag.source?.[0]?.tokens?.type || "";
					member.default = tagValue;
				}

				if (member.privacy === "public") {
					const JSDocErrors = getJSDocErrors();
					if (member.readonly && !member.type) {
						JSDocErrors.push(
							`=== ERROR: Problem found with ${member.name}'s JSDoc comment in ${moduleDoc.path}: Missing return type`
						);
					}

					if (!member.default) {
						JSDocErrors.push(
							`=== ERROR: Problem found with ${member.name}'s JSDoc comment in ${moduleDoc.path}: Default value is missing`
						);
					}
				}

				// Getters are treated as fields so they should not have return, instead of return they should have default value defined with @default
				if (member.readonly) {
					if (member.privacy === "public" && !member.type) {
						const JSDocErrors = getJSDocErrors();

						JSDocErrors.push(
							`=== ERROR: Problem found with ${member.name}'s JSDoc comment in ${moduleDoc.path}: Missing return type`
						);
					}

					delete member.return;
				}
			}
		} else if (member.kind === "method") {
			validateJSDocComment("method", memberParsedJsDoc, classNodeMember.name?.text, moduleDoc);

			member.parameters?.forEach(param => {
				// Treat every parameter that has respective @param tag as public
				param._ui5privacy = findAllTags(memberParsedJsDoc, "param").some(tag => tag.name === param.name) ? "public" : "private";
				const paramNode = classNodeMember.parameters?.find(parameter => parameter.name?.text === param.name);

				const typeRefs = (getTypeRefs(ts, paramNode, param)
					?.map(typeRef => getReference(ts, typeRef, classNodeMember, moduleDoc.path)).filter(Boolean)) || [];

				if (typeRefs.length) {
					param.type.references = typeRefs;
				}
			});

			if (member.return) {
				const returnTag = findTag(memberParsedJsDoc, "returns");
				member.return.description = returnTag?.description ? `${returnTag.name} ${returnTag.description}` : returnTag?.name;
				member.return.type.text = classNodeMember?.type?.getFullText?.()?.trim();
				const typeRefs = (getTypeRefs(ts, classNodeMember, member.return)
					?.map(typeRef => getReference(ts, typeRef, classNodeMember, moduleDoc.path)).filter(Boolean)) || [];

				if (typeRefs.length) {
					member.return.type.references = typeRefs;
				}
			}

			if (member.privacy === "public" && !member.return) {
				const JSDocErrors = getJSDocErrors();

				JSDocErrors.push(
					`=== ERROR: Problem found with ${member.name}'s JSDoc comment in ${moduleDoc.path}: Missing return type`
				);
			}
		}
	}
}

function processInterface(ts, interfaceNode, moduleDoc) {
	const interfaceJSdoc = interfaceNode?.jsDoc?.[0];
	const interfaceName = interfaceNode?.name?.text;

	if (!interfaceJSdoc) return;

	const interfaceParsedJsDoc = parse(interfaceJSdoc?.getText())[0];

	validateJSDocComment("interface", interfaceParsedJsDoc, interfaceNode.name?.text, moduleDoc);

	moduleDoc.declarations.push({
		kind: "interface",
		name: interfaceName,
		description: interfaceParsedJsDoc?.description,
		_ui5privacy: getPrivacyStatus(interfaceParsedJsDoc),
		_ui5since: getSinceStatus(interfaceParsedJsDoc),
		deprecated: getDeprecatedStatus(interfaceParsedJsDoc),
	});
}

function processEnum(ts, enumNode, moduleDoc) {
	const enumJSdoc = enumNode?.jsDoc?.[0];
	const enumName = enumNode?.name?.text;

	if (!enumJSdoc) return;

	const enumParsedJsDoc = parse(enumJSdoc?.getText())[0];

	validateJSDocComment("enum", enumParsedJsDoc, enumNode.name?.text, moduleDoc);

	const result = {
		kind: "enum",
		name: enumName,
		description: enumJSdoc?.comment,
		_ui5privacy: getPrivacyStatus(enumParsedJsDoc),
		_ui5since: getSinceStatus(enumParsedJsDoc),
		deprecated: getDeprecatedStatus(enumParsedJsDoc) || undefined,
		members: (enumNode?.members || []).map(member => {
			const memberJSdoc = member?.jsDoc?.[0];

			if (!memberJSdoc) return;

			const memberParsedJsDoc = parse(memberJSdoc?.getText())[0];

			validateJSDocComment("enum", memberParsedJsDoc, member.name?.text, moduleDoc);

			return {
				kind: "field",
				static: true,
				privacy: getPrivacyStatus(memberParsedJsDoc),
				_ui5since: getSinceStatus(memberParsedJsDoc),
				description: memberJSdoc?.comment,
				default: member.initializer?.text,
				deprecated: getDeprecatedStatus(memberParsedJsDoc),
				name: member.name?.text,
				readonly: true,
			};
		}).filter(Boolean),
	};

	moduleDoc.declarations.push(result);
}

const processPublicAPI = object => {
	if (!object) {
		return true;
	}
	const keys = Object.keys(object);
	if (!keys.includes("privacy") && !keys.includes("_ui5privacy")) {
		return true;
	}
	for (const key of keys) {
		if ((key === "privacy" && object[key] !== "public") || (key === "_ui5privacy" && object[key] !== "public")) {
			return true;
		} else if (typeof object[key] === "object") {
			if (key === "cssParts" || key === "_ui5implements") {
				continue;
			}

			if (Array.isArray(object[key])) {
				for (let i = 0; i < object[key].length; i++) {
					const shouldRemove = processPublicAPI(object[key][i]);
					if (shouldRemove) {
						object[key].splice(i, 1);
						i--;
					}
				}
				if (object[key].length === 0) {
					delete object[key];
				} else {
					object[key].sort(function (a, b) {
						if (a.name < b.name) {
							return -1;
						}
						if (a.name > b.name) {
							return 1;
						}
						return 0;
					});
				}
			}
		}
	}
	return false;
};

export default {
	globs: ["src/!(*generated)/*.ts", "src/*.ts"],
	outdir: 'dist',
	plugins: [
		{
			name: 'my-plugin',
			analyzePhase({ ts, node, moduleDoc }) {
				switch (true) {
					case ts.isClassDeclaration(node):
						processClass(ts, node, moduleDoc);
						break;
					case ts.isEnumDeclaration(node):
						processEnum(ts, node, moduleDoc);
						break;
					case ts.isInterfaceDeclaration(node):
						processInterface(ts, node, moduleDoc);
						break;
				}
			},
			moduleLinkPhase({ moduleDoc }) {
				for (let i = 0; i < moduleDoc.declarations.length; i++) {
					const shouldRemove = processPublicAPI(moduleDoc.declarations[i]) || ["function", "variable"].includes(moduleDoc.declarations[i].kind)
					if (shouldRemove) {
						moduleDoc.declarations.splice(i, 1);
						i--;
					}
				}

				moduleDoc.exports?.forEach(e => {
					const classNode = moduleDoc.declarations.find(c => c.name === e.declaration.name);

					if (classNode?.customElement && e.kind !== "custom-element-definition") {
						moduleDoc.exports.push({
							kind: "custom-element-definition",
							name: classNode.tagName,
							declaration: {
								name: e.declaration.name,
								module: e.declaration.module
							}
						})
					}
				})
			},
			packageLinkPhase() {
				// Uncomment and handle errors appropriately
				const JSDocErrors = getJSDocErrors();
				if (JSDocErrors.length > 0) {
					console.log(JSDocErrors.join("\n"));
					console.log(`Invalid JSDoc. ${JSDocErrors.length} were found.`);
					throw new Error(`Invalid JSDoc.`);
				}
			}
		},
	],
};
