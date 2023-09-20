import processEvent from "./cem-plugin/event.mjs";
import { getDeprecatedStatus, getSinceStatus, getPrivacyStatus, getType, getReference } from "./cem-plugin/utils.mjs";
import { parse } from "comment-parser";

function processClass(ts, classNode, moduleDoc) {
	const className = classNode?.name?.text;
	const currClass = moduleDoc?.declarations?.find(declaration => declaration?.name === className);
	const currClassJSdoc = classNode?.jsDoc?.[0];

	if (!currClassJSdoc) {
		return;
	}

	const customElementDecorator = classNode?.decorators?.find(decorator => decorator?.expression?.expression?.text === "customElement");

	if (customElementDecorator) {
		const decoratorArg = customElementDecorator.expression?.arguments[0];

		if (decoratorArg) {
			if (decoratorArg.kind === ts.SyntaxKind.StringLiteral || decoratorArg.kind === ts.SyntaxKind.ObjectLiteralExpression) {
				currClass.tagName = decoratorArg.text || (decoratorArg.properties.find(property => property.name.text === "tag")?.initializer?.text);
			}
		}
	}

	const hasSuperclass = currClassJSdoc?.tags?.some(tag => tag.kind === ts?.SyntaxKind?.JSDocAugmentsTag);

	if (hasSuperclass) {
		const parsedJsDoc = parse(currClassJSdoc?.getText())[0];
		const superclassTag = parsedJsDoc?.tags?.find(tag => tag.tag === "extends");

		currClass.superclass = getReference(ts, superclassTag.name, classNode)
	}

	currClass.customElement = !!currClass.tagName;
	currClass.kind = "class";
	currClass._ui5abstract = currClassJSdoc?.tags?.some(tag => tag.tagName?.text === "abstract");
	const slotTag = currClassJSdoc?.tags?.some(tag => tag.tagName?.text === "slot");
	currClass.deprecated = getDeprecatedStatus(ts, currClassJSdoc);
	currClass._ui5since = getSinceStatus(ts, currClassJSdoc);
	currClass.privacy = getPrivacyStatus(ts, currClassJSdoc);
	currClass.description = currClassJSdoc?.tags?.find(tag => tag.kind === ts?.SyntaxKind?.JSDocClassTag)?.comment;
	currClass._ui5implements = currClassJSdoc?.tags?.filter(tag => tag.tagName?.text === "implements")
		.map(tag => getReference(ts, tag, classNode));

	if (slotTag && currClass.slots) {
		const parsedJsDoc = parse(currClassJSdoc?.getText())[0];
		const slotTag = parsedJsDoc?.tags?.find(tag => tag.tag === "slot");

		currClass.slots[0].type = getType(ts, slotTag.type, classNode);
	}

	for (let i = 0; i < (currClass.members?.length || 0); i++) {
		const member = currClass.members[i];
		const classNodeMember = classNode.members?.find(nodeMember => nodeMember.name?.text === member?.name);
		const classNodeMemberJSdoc = classNodeMember?.jsDoc?.[0];

		if (!classNodeMember || !classNodeMemberJSdoc) {
			continue;
		}


		const type = classNodeMemberJSdoc?.tags?.find(tag => tag.kind === ts?.SyntaxKind?.JSDocTypeTag)
		member.since = getSinceStatus(ts, classNodeMemberJSdoc);

		if (!!type) {
			member.type = getType(ts, type, classNode);
		}

		if (member.kind === "field") {

			const slotDecorator = classNodeMember?.decorators?.find(decorator => decorator?.expression?.expression?.text === "slot");

			if (slotDecorator) {
				if (!currClass.slots) {
					currClass.slots = [];
				}

				const slot = currClass.members.splice(i, 1)[0];
				const defaultProperty = slotDecorator.expression?.arguments?.[0]?.properties?.find(property => property.name.text === "default");

				if (defaultProperty && defaultProperty.initializer?.kind === ts.SyntaxKind.TrueKeyword) {
					slot.name = "default";
				}

				currClass.slots.push(slot);
				i--;
			}
		} else if (member.kind === "method") {
			member.parameters?.forEach(param => {
				param.privacy = classNodeMemberJSdoc.tags?.some(tag => tag.name?.text === param.name) ? "public" : "private";
				if (param.type?.text) {
					param.type = getType(ts, param.type?.text, classNode);
				}
			})

			if (member.return?.type?.text) {
				member.return.type = getType(ts, member.return?.type?.text, classNode)
			}
		}
	}

	currClass.events = classNode?.decorators
		?.filter(decorator => decorator?.expression?.expression?.text === "event")
		.map(event => processEvent(ts, event, classNode));
}

function processInterface(ts, interfaceNode, moduleDoc) {
	const interfaceJSdoc = interfaceNode?.jsDoc?.[0];
	const interfaceName = interfaceNode?.name?.text;

	if (!interfaceJSdoc) {
		return;
	}

	const result = {
		kind: "interface",
		name: interfaceName,
		description: interfaceJSdoc?.comment,
		privacy: getPrivacyStatus(ts, interfaceJSdoc),
		_ui5since: getSinceStatus(ts, interfaceJSdoc),
		deprecated: getDeprecatedStatus(ts, interfaceJSdoc),
	};

	moduleDoc.declarations.push(result);
}

function processEnum(ts, enumNode, moduleDoc) {
	const enumJSdoc = enumNode?.jsDoc?.[0];
	const enumName = enumNode?.name?.text;

	if (!enumJSdoc) {
		return;
	}

	const result = {
		kind: "enum",
		name: enumName,
		description: enumJSdoc?.comment,
		privacy: getPrivacyStatus(ts, enumJSdoc),
		_ui5since: getSinceStatus(ts, enumJSdoc),
		deprecated: getDeprecatedStatus(ts, enumJSdoc),
	};

	result.members = (enumNode?.members || []).map(member => {
		const memberJSdoc = member?.jsDoc?.[0];

		const memberResult = {
			kind: "field",
			static: true,
			privacy: getPrivacyStatus(ts, memberJSdoc),
			_ui5since: getSinceStatus(ts, memberJSdoc),
			description: memberJSdoc?.comment,
			deprecated: getDeprecatedStatus(ts, memberJSdoc),
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
			analyzePhase({ ts, node, moduleDoc, context }) {
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
			moduleLinkPhase({ moduleDoc, context }) {
				for (let i = 0; i < moduleDoc.declarations.length; i++) {
					const shouldRemove = processPublicAPI(moduleDoc.declarations[i])

					if (shouldRemove) {
						moduleDoc.declarations.splice(i, 1);
						i--;
					}
				}
			},
		},
	],
};