import processEvent from "./event.mjs";
import {
	getDeprecatedStatus,
	getSinceStatus,
	getPrivacyStatus,
	getType,
	getReference,
	validateJSDocComment,
	findDecorator,
	findAllDecorators,
	hasTag,
	findTag,
	findAllTags,
	getJSDocErrors
} from "./utils.mjs";
import { parse } from "comment-parser";


function processClass(ts, classNode, moduleDoc) {
	const className = classNode?.name?.text;
	const currClass = moduleDoc?.declarations?.find(declaration => declaration?.name === className);
	const currClassJSdoc = classNode?.jsDoc?.[0] || classNode?.jsDoc?.find(jsDoc => jsDoc?.[0]?.getText?.()?.includes("@class"));

	if (!currClassJSdoc) {
		return;
	}

	const customElementDecorator = findDecorator(classNode, "customElement");
	const classParsedJsDoc = parse(currClassJSdoc?.getText())[0];
	validateJSDocComment("class", classParsedJsDoc, classNode.name?.text)

	if (customElementDecorator) {
		const decoratorArg = customElementDecorator.expression?.arguments[0];

		if (decoratorArg) {
			if (decoratorArg.kind === ts.SyntaxKind.StringLiteral || decoratorArg.kind === ts.SyntaxKind.ObjectLiteralExpression) {
				currClass.tagName = decoratorArg.text || (decoratorArg.properties.find(property => property.name.text === "tag")?.initializer?.text);
				currClass.customElement = true;
			}
		}

		currClass._ui5abstract = hasTag(classParsedJsDoc, "abstract")
	}

	if (hasTag(classParsedJsDoc, "extends")) {
		const superclassTag = findTag(classParsedJsDoc, "extends");

		currClass.superclass = getReference(ts, superclassTag.name, classNode)
	}

	currClass.kind = "class";
	currClass.deprecated = getDeprecatedStatus(classParsedJsDoc);
	currClass._ui5since = getSinceStatus(classParsedJsDoc);
	currClass.privacy = getPrivacyStatus(classParsedJsDoc);
	currClass._ui5reference = getReference(ts, className, classNode);
	currClass.description = findTag(currClassJSdoc, "class")?.comment;

	currClass._ui5implements = findAllTags(classParsedJsDoc, "implements")
		.map(tag => getReference(ts, tag, classNode));

	if (hasTag(classParsedJsDoc, "slot") && currClass.slots) {
		const slotTag = findTag(classParsedJsDoc, "slot");

		currClass.slots[0].type = getType(ts, slotTag.type, classNode);
	}

	for (let i = 0; i < (currClass.members?.length || 0); i++) {
		const member = currClass.members[i];
		const classNodeMember = classNode.members?.find(nodeMember => nodeMember.name?.text === member?.name);
		const classNodeMemberJSdoc = classNodeMember?.jsDoc?.[0];

		if (!classNodeMember || !classNodeMemberJSdoc) {
			continue;
		}

		const memberParsedJsDoc = parse(classNodeMemberJSdoc?.getText())[0];

		member._ui5since = getSinceStatus(memberParsedJsDoc);

		if (member.kind === "field") {
			const slotDecorator = findDecorator(classNodeMember, "slot");
			validateJSDocComment(slotDecorator ? "slot" : "field", memberParsedJsDoc, classNodeMember.name?.text);

			if (slotDecorator) {
				if (!currClass.slots) {
					currClass.slots = [];
				}

				const slot = currClass.members.splice(i, 1)[0];
				const defaultProperty = slotDecorator.expression?.arguments?.[0]?.properties?.find(property => property.name.text === "default");

				if (defaultProperty && defaultProperty.initializer?.kind === ts.SyntaxKind.TrueKeyword) {
					slot.name = "default";
				}

				delete slot.kind;

				currClass.slots.push(slot);
				i--;
			} else {
				if (hasTag(memberParsedJsDoc, "type")) {
					member.type = getType(ts, findTag(memberParsedJsDoc, "type"), classNode);
				}

				if (hasTag(memberParsedJsDoc, "formProperty")) {
					member._ui5formProperty = true;
				}

				if (hasTag(memberParsedJsDoc, "formEvents")) {
					const tag = findTag(memberParsedJsDoc, "formEvents");
					const tagValue = tag.description ? `${tag.name} ${tag.description}` : tag.name;
					member._ui5formEvents = tagValue.trim().replaceAll(/\s+/g,",")
				}

				if (member.readonly) {
					delete member.return;
				}
			}
		} else if (member.kind === "method") {
			validateJSDocComment("method", memberParsedJsDoc, classNodeMember.name?.text)

			member.parameters?.forEach(param => {
				param.privacy = hasTag(memberParsedJsDoc, param.name) ? "public" : "private";
				if (param.type?.text) {
					param.type = getType(ts, param.type?.text, classNode);
				}
			})

			if (member.return?.type?.text) {
				member.return.description = findTag(memberParsedJsDoc, "returns")?.comment
				member.return.type = getType(ts, member.return?.type?.text, classNode)
			}
		}
	}

	currClass.events = findAllDecorators(classNode, "event")
		?.map(event => processEvent(ts, event, classNode));
}

function processInterface(ts, interfaceNode, moduleDoc) {
	const interfaceJSdoc = interfaceNode?.jsDoc?.[0];
	const interfaceName = interfaceNode?.name?.text;

	if (!interfaceJSdoc) {
		return;
	}

	const interfaceParsedJsDoc = parse(interfaceJSdoc?.getText())[0];

	validateJSDocComment("interface", interfaceParsedJsDoc, interfaceNode.name?.text)

	const result = {
		kind: "interface",
		name: interfaceName,
		description: interfaceParsedJsDoc?.comment,
		privacy: getPrivacyStatus(interfaceParsedJsDoc),
		_ui5since: getSinceStatus(interfaceParsedJsDoc),
		deprecated: getDeprecatedStatus(interfaceParsedJsDoc),
		_ui5reference: getReference(ts, interfaceName, interfaceNode)
	};

	moduleDoc.declarations.push(result);
}

function processEnum(ts, enumNode, moduleDoc) {
	const enumJSdoc = enumNode?.jsDoc?.[0];
	const enumName = enumNode?.name?.text;

	if (!enumJSdoc) {
		return;
	}

	const enumParsedJsDoc = parse(enumJSdoc?.getText())[0];

	validateJSDocComment("enum", enumParsedJsDoc, enumNode.name?.text)

	const result = {
		kind: "enum",
		name: enumName,
		description: enumJSdoc?.comment,
		privacy: getPrivacyStatus(enumParsedJsDoc),
		_ui5since: getSinceStatus(enumParsedJsDoc),
		deprecated: getDeprecatedStatus(enumParsedJsDoc),
		_ui5reference: getReference(ts, enumName, enumNode)
	};

	result.members = (enumNode?.members || []).map(member => {
		const memberJSdoc = member?.jsDoc?.[0];

		if (!memberJSdoc) {
			return;
		}

		const memberParsedJsDoc = parse(memberJSdoc?.getText())[0];

		validateJSDocComment("enum", memberParsedJsDoc, member.name?.text)

		const memberResult = {
			kind: "field",
			static: true,
			privacy: getPrivacyStatus(memberParsedJsDoc),
			_ui5since: getSinceStatus(memberParsedJsDoc),
			description: memberJSdoc?.comment,
			deprecated: getDeprecatedStatus(memberParsedJsDoc),
			name: member.name?.text,
		};

		return memberResult;
	});

	moduleDoc.declarations.push(result);
}

const processPublicAPI = object => {
	if (!object) {
		return true;
	}

	const keys = Object.keys(object);

	if (!keys.includes("privacy")) {
		return true;
	}

	for (const key of keys) {
		if (key === "privacy" && object[key] !== "public") {
			return true;
		} else if (typeof object[key] === "object") {
			if (key === "cssParts") {
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
	/** Globs to analyze */
	globs: ["src/!(*generated)/*.ts", "src/*.ts"],
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
					const shouldRemove = processPublicAPI(moduleDoc.declarations[i])

					if (shouldRemove) {
						moduleDoc.declarations.splice(i, 1);
						i--;
					}
				}
			},
			packageLinkPhase() {
				const JSDocErrors = getJSDocErrors();

				if (JSDocErrors.length > 0) {
					console.log(JSDocErrors.join("\n"));
					console.log(`Invalid JSDoc. ${JSDocErrors.length} were found.`);
					throw new Error(`Invalid JSDoc.`)
				}
			}
		},
	],
};