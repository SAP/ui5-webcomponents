import processEvent from "./cem-plugin/event.mjs";
import { getDeprecatedStatus, getSinceStatus, getPrivacyStatus } from "./cem-plugin/utils.mjs";

function processClass(ts, classNode, moduleDoc) {
	const className = classNode?.name?.text;
	const currClass = moduleDoc?.declarations?.find(declaration => declaration?.name === className);
	const currClassJSdoc = classNode?.jsDoc?.[0];

	if (!currClassJSdoc) {
		return;
	}

	const superclassTag = currClassJSdoc?.tags?.find(tag => tag?.kind === ts?.SyntaxKind?.JSDocAugmentsTag);
	currClass.superclass = superclassTag ? { name: superclassTag.class.expression.text } : undefined;

	const customElementDecorator = classNode?.decorators?.find(decorator => decorator?.expression?.expression?.text === "customElement");

	if (customElementDecorator) {
		const decoratorArg = customElementDecorator.expression?.arguments[0];

		if (decoratorArg) {
			if (decoratorArg.kind === ts.SyntaxKind.StringLiteral || decoratorArg.kind === ts.SyntaxKind.ObjectLiteralExpression) {
				currClass.tagName = decoratorArg.text || (decoratorArg.properties.find(property => property.name.text === "tag")?.initializer?.text);
			}
		}
	}

	currClass.customElement = !!currClass.tagName;
	currClass.kind = "class";
	currClass.abstract = !!currClassJSdoc?.tags?.some(tag => tag.tagName?.text === "abstract");
	currClass.deprecated = getDeprecatedStatus(ts, currClassJSdoc);
	currClass.since = getSinceStatus(ts, currClassJSdoc);
	currClass.privacy = getPrivacyStatus(ts, currClassJSdoc);
	currClass.description = currClassJSdoc?.tags?.find(tag => tag?.kind === ts?.SyntaxKind?.JSDocClassTag)?.comment;

	for (let i = 0; i < (currClass.members?.length || 0); i++) {
		const member = currClass.members[i];
		const classNodeMember = classNode.members?.find(nodeMember => nodeMember.name?.text === member?.name);
		const classNodeMemberJSdoc = classNodeMember?.jsDoc?.[0];

		if (!classNodeMember || !classNodeMemberJSdoc) {
			continue;
		}

		member.since = getSinceStatus(ts, classNodeMemberJSdoc);

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
	}

	currClass.events = classNode?.decorators
		?.filter(decorator => decorator?.expression?.expression?.text === "event")
		.map(event => processEvent(ts, event));
}

function processVariable(ts, variableNode, moduleDoc) {
	variableNode.declarationList?.declarations?.forEach(variableDeclaration => {
		const currVariable = moduleDoc?.declarations.find(declaration => declaration.name === variableDeclaration.name.text);

		if (variableNode.jsDoc?.[0]?.tags?.some(tag => tag.tagName?.text === "interface")) {
			currVariable.kind = "interface"
		}
	});
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
		since: getSinceStatus(ts, enumJSdoc),
		deprecated: getDeprecatedStatus(ts, enumJSdoc),
	};

	result.members = (enumNode?.members || []).map(member => {
		const memberJSdoc = member?.jsDoc?.[0];

		const memberResult = {
			kind: 'field',
			static: true,
			privacy: getPrivacyStatus(ts, memberJSdoc),
			since: getSinceStatus(ts, memberJSdoc),
			description: memberJSdoc?.comment,
			deprecated: getDeprecatedStatus(ts, memberJSdoc),
			name: member.name?.text,
			type: {
				text: memberJSdoc?.tags?.find((tag) => tag.tagName.text === "type")?.typeExpression?.type?.typeName?.text,
			},
		};

		return memberResult;
	});

	moduleDoc.declarations.push(result);
}

export default {
	/** Globs to analyze */
	globs: ["src/!(*generated)/*.ts", "src/*.ts"],
	// globs: ["src/Test1.ts", "src/Test2.ts", "src/Test3.ts", "src/Test4.ts", "src/Test5.ts"],
	// globs: ["src/Test5.ts"],
	outdir: 'dist',
	/** Run in dev mode, provides extra logging */
	dev: true,
	/** Run in watch mode, runs on file changes */
	watch: true,
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
					case ts.SyntaxKind.VariableStatement:
						processVariable(ts, node, moduleDoc);
						break;
				}
			}
		}
	],
}