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
	validateJSDocComment("class", classParsedJsDoc, classNode.name?.text);

	const decoratorArg = customElementDecorator?.expression?.arguments[0];
	currClass.tagName = decoratorArg?.text || (decoratorArg?.properties.find(property => property.name.text === "tag")?.initializer?.text);
	currClass.customElement = !!decoratorArg;

	currClass._ui5abstract = hasTag(classParsedJsDoc, "abstract") ? true : undefined;

	if (hasTag(classParsedJsDoc, "extends")) {
		const superclassTag = findTag(classParsedJsDoc, "extends");
		currClass.superclass = getReference(ts, superclassTag.name, classNode, moduleDoc.path);
	}

	currClass.kind = "class";
	currClass.deprecated = getDeprecatedStatus(classParsedJsDoc);
	currClass._ui5since = getSinceStatus(classParsedJsDoc);
	currClass._ui5privacy = getPrivacyStatus(classParsedJsDoc);

	currClass.description = classParsedJsDoc.description || findTag(classParsedJsDoc, "class")?.description;
	const slotsInClassComment = findAllTags(classParsedJsDoc, "slot");

	currClass.slots?.forEach(slot => {
		if (slotsInClassComment.some(classSlot => classSlot.name === slot.name)) {
			slot._ui5privacy = "public";
		}
	});

	currClass._ui5implements = findAllTags(classParsedJsDoc, "implements")
		.map(tag => getReference(ts, tag.type, classNode, moduleDoc.path))
		.filter(Boolean);

	if (!currClass._ui5implements.length) delete currClass._ui5implements;

	if (hasTag(classParsedJsDoc, "slot") && currClass.slots) {
		const slotTags = findAllTags(classParsedJsDoc, "slot");
		slotTags.forEach(slotTag => {
			const slot = currClass.slots.find(s => s.name === slotTag.name);
			const typeRefs = (slotTag.type
				?.replaceAll(/Array<|>|\[\]/g, "")
				?.split("|")
				?.map(e => getReference(ts, e.trim(), classNode, moduleDoc.path)).filter(Boolean)) || [];

			slot._ui5type = { text: slotTag.type };

			if (typeRefs.length) {
				slot._ui5type.references = typeRefs;
			}
		});

		currClass.slots.forEach(s => delete s.type);
	}

	for (let i = 0; i < (currClass.members?.length || 0); i++) {
		const member = currClass.members[i];
		const classNodeMember = classNode.members?.find(nodeMember => nodeMember.name?.text === member?.name);
		const classNodeMemberJSdoc = classNodeMember?.jsDoc?.[0];

		if (!classNodeMember || !classNodeMemberJSdoc) continue;

		const memberParsedJsDoc = parse(classNodeMemberJSdoc?.getText())[0];

		member._ui5since = getSinceStatus(memberParsedJsDoc);
		if (member.deprecated === "true") {
			member.deprecated = true
		};

		if (member.kind === "field") {
			const slotDecorator = findDecorator(classNodeMember, "slot");
			validateJSDocComment(slotDecorator ? "slot" : "field", memberParsedJsDoc, classNodeMember.name?.text);

			if (slotDecorator) {
				if (!currClass.slots) currClass.slots = [];

				const typeRefs = (getTypeRefs(ts, classNodeMember, member)
					?.map(e => getReference(ts, e, classNodeMember, moduleDoc.path)).filter(Boolean)) || [];

				if (member.type && typeRefs.length) {
					member.type.references = typeRefs;
				}

				const slot = currClass.members.splice(i, 1)[0];
				const defaultProperty = slotDecorator.expression?.arguments?.[0]?.properties?.find(property => property.name.text === "default");

				if (defaultProperty && defaultProperty.initializer?.kind === ts.SyntaxKind.TrueKeyword) slot.name = "default";

				member._ui5type = member.type;
				member._ui5privacy = member.privacy;
				delete member.type;
				delete member.privacy;
				delete slot.kind;

				currClass.slots.push(slot);
				i--;
			} else {
				const typeRefs = (getTypeRefs(ts, classNodeMember, member)
					?.map(e => getReference(ts, e, classNodeMember, moduleDoc.path)).filter(Boolean)) || [];

				if (member.type && typeRefs.length) {
					member.type.references = typeRefs;
				}

				if (hasTag(memberParsedJsDoc, "formProperty")) member._ui5formProperty = true;

				if (hasTag(memberParsedJsDoc, "formEvents")) {
					const tag = findTag(memberParsedJsDoc, "formEvents");
					const tagValue = tag.description ? `${tag.name} ${tag.description}` : tag.name;
					member._ui5formEvents = tagValue.trim().replaceAll(/\s+/g, ",");
				}

				if (hasTag(memberParsedJsDoc, "default")) {
					const tag = findTag(memberParsedJsDoc, "default");
					const tagValue = tag.source?.[0]?.tokens?.name || tag.source?.[0]?.tokens?.description || tag.source?.[0]?.tokens?.type || "";
					member.default = tagValue;
				}

				if (member.readonly) {
					delete member.return;
				}
			}
		} else if (member.kind === "method") {
			validateJSDocComment("method", memberParsedJsDoc, classNodeMember.name?.text);

			member.parameters?.forEach(param => {
				param._ui5privacy = findAllTags(memberParsedJsDoc, "param").some(tag => tag.name === param.name) ? "public" : "private";
				const paramNode = classNodeMember.parameters?.find(parameter => parameter.name?.text === param.name);

				const typeRefs = (getTypeRefs(ts, paramNode, param)
					?.map(typeRef => getReference(ts, typeRef, classNodeMember, moduleDoc.path)).filter(Boolean)) || [];

				if (param.type && typeRefs.length) {
					param.type.references = typeRefs;
				}
			});

			if (member.return) {
				const returnTag = findTag(memberParsedJsDoc, "returns");
				member.return.description = returnTag?.description ? `${returnTag.name} ${returnTag.description}` : returnTag?.name;
				member.return.type.text = classNodeMember?.type?.getFullText?.()?.trim();
				const typeRefs = (getTypeRefs(ts, classNodeMember, member.return)
					?.map(typeRef => getReference(ts, typeRef, classNodeMember, moduleDoc.path)).filter(Boolean)) || [];

				if (member.return.type && typeRefs.length) {
					member.return.type.references = typeRefs;
				}
			}
		}
	}

	currClass.events = findAllDecorators(classNode, "event")
		?.map(event => processEvent(ts, event, classNode, moduleDoc));
}

function processInterface(ts, interfaceNode, moduleDoc) {
	const interfaceJSdoc = interfaceNode?.jsDoc?.[0];
	const interfaceName = interfaceNode?.name?.text;

	if (!interfaceJSdoc) return;

	const interfaceParsedJsDoc = parse(interfaceJSdoc?.getText())[0];

	validateJSDocComment("interface", interfaceParsedJsDoc, interfaceNode.name?.text);

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

	validateJSDocComment("enum", enumParsedJsDoc, enumNode.name?.text);

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

			validateJSDocComment("enum", memberParsedJsDoc, member.name?.text);

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
	globs: ["src/Input.ts"],
	outdir: 'dist',
	plugins: [
		{
			name: 'my-plugin',
			analyzePhase({ ts, node, moduleDoc }) {
				switch (node.kind) {
					case ts.SyntaxKind.ClassDeclaration:
						processClass(ts, node, moduleDoc);
						break;
					case ts.SyntaxKind.EnumDeclaration:
						processEnum(ts, node, moduleDoc);
						break;
					case ts.SyntaxKind.InterfaceDeclaration:
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
