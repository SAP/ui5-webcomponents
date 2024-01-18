import { parse } from "comment-parser";
import {
	getPrivacyStatus,
	getDeprecatedStatus,
	getSinceStatus,
	getType,
	getTypeRefs,
	validateJSDocComment,
	hasTag,
	findTag,
	findAllTags,
	getReference,
	normalizeDescription,
	normalizeTagType
} from "./utils.mjs";

const jsDocRegExp = /\/\*\*(.|\n)+?\s+\*\//;

const getParams = (ts, eventDetails, commentParams, classNode, moduleDoc) => {
	return commentParams?.map(commentParam => {
		const decoratorParam = eventDetails?.find(prop => prop?.name?.text === commentParam?.name);

		if (!decoratorParam || !decoratorParam?.jsDoc?.[0]) {
			return;
		}

		const decoratorParamParsedComment = parse(decoratorParam?.jsDoc?.[0]?.getText?.(), { spacing: 'preserve' })[0];

		validateJSDocComment("eventParam", decoratorParamParsedComment, decoratorParam.name?.text, moduleDoc);

		const { typeName, name } = getType(normalizeTagType(commentParam?.type));
		let type;

		if (typeName) {
			type = { text: typeName };

			let typeRefs = name?.split("|")
				?.map(e => getReference(ts, e.trim(), classNode, moduleDoc.path))
				.filter(Boolean);

			if (typeRefs?.length) {
				type.references = typeRefs;
			}
		}

		return {
			type,
			name: commentParam?.name,
			_ui5privacy: getPrivacyStatus(decoratorParamParsedComment),
			description: normalizeDescription(commentParam?.description),
			_ui5since: getSinceStatus(decoratorParamParsedComment),
			deprecated: getDeprecatedStatus(decoratorParamParsedComment),
		};
	}).filter(pair => !!pair);
};

function processEvent(ts, event, classNode, moduleDoc) {
	const result = {
		name: event?.expression?.arguments?.[0]?.text,
		_ui5privacy: "private",
		type: { text: "CustomEvent" }
	};

	const comment = event.getFullText?.().match(jsDocRegExp)?.[0];

	if (!comment) {
		return result;
	}

	const eventParsedComment = parse(comment, { spacing: 'preserve' })[0];

	validateJSDocComment("event", eventParsedComment, event?.expression?.arguments?.[0]?.text, moduleDoc);

	const deprecatedTag = findTag(eventParsedComment, "deprecated");
	const privacy = findTag(eventParsedComment, ["public", "private", "protected"])?.tag || "private";
	const sinceTag = findTag(eventParsedComment, "since");
	const commentParams = findAllTags(eventParsedComment, "param");
	const allowPreventDefault = hasTag(eventParsedComment, "allowPreventDefault") || undefined;
	const description = normalizeDescription(eventParsedComment?.description);
	const native = hasTag(eventParsedComment, "native");
	const eventDetails = event?.expression?.arguments?.[1]?.properties?.find(prop => prop?.name?.text === "detail")?.initializer?.properties;

	result.description = description;
	result._ui5allowPreventDefault = allowPreventDefault;

	if (native) {
		result.type = { text: "Event" };
	} else if (event?.expression?.typeArguments) {
		const typesText = event?.expression?.typeArguments.map(type => type.typeName?.text).filter(Boolean).join(" | ");
		const typeRefs = (getTypeRefs(ts, event.expression)
			?.map(e => getReference(ts, e, event, moduleDoc.path)).filter(Boolean)) || [];

		result.type = { text: `CustomEvent<${typesText}>` };

		if (typeRefs.length) {
			result.type.references = typeRefs;
		}
	}

	if (privacy) {
		result._ui5privacy = privacy;
	}

	if (deprecatedTag?.name) {
		result.deprecated = deprecatedTag.description
			? `${deprecatedTag.name} ${deprecatedTag.description}`
			: deprecatedTag.name;
	} else if (deprecatedTag) {
		result.deprecated = true;
	}

	if (sinceTag?.name) {
		result._ui5since = sinceTag?.description
			? `${sinceTag.name} ${sinceTag.description}`
			: sinceTag.name;
	}

	if (commentParams && eventDetails) {
		result._ui5parameters = getParams(ts, eventDetails, commentParams, classNode, moduleDoc);
	}

	return result;
}

export default processEvent;
