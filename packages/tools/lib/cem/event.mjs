import { parse } from "comment-parser";
import {
	getPrivacyStatus,
	getDeprecatedStatus,
	getSinceStatus,
	getType,
	validateJSDocComment,
	hasTag,
	findTag,
	findAllTags,
} from "./utils.mjs";

const jsDocRegExp = /\/\*\*(.|\n)+?\s+\*\//;

const getParams = (ts, eventDetails, commentParams, classNode) => {
	return commentParams?.map(commentParam => {
		const decoratorParam = eventDetails?.find(prop => prop?.name?.text === commentParam?.name);

		if (!decoratorParam || !decoratorParam?.jsDoc?.[0]) {
			return;
		}

		const decoratorParamParsedComment = parse(decoratorParam?.jsDoc?.[0]?.getText?.())[0];

		validateJSDocComment("eventParam", decoratorParamParsedComment, decoratorParam.name?.text)

		return {
			type: getType(ts, commentParam?.type, classNode),
			name: commentParam?.name,
			privacy: getPrivacyStatus(decoratorParamParsedComment),
			description: commentParam?.description,
			_ui5since: getSinceStatus(decoratorParamParsedComment),
			deprecated: getDeprecatedStatus(decoratorParamParsedComment),
		};
	}).filter(pair => !!pair);
};

function processEvent(ts, event, classNode) {
	const result = {
		name: event?.expression?.arguments?.[0]?.text,
		privacy: "private",
		type: {
			text: "CustomEvent"
		}
	};

	const comment = event.getFullText?.().match(jsDocRegExp)?.[0];

	if (!comment) {
		return result;
	}

	const eventParsedComment = parse(comment)[0];

	validateJSDocComment("event", eventParsedComment, event?.expression?.arguments?.[0]?.text)

	const deprecatedTag = findTag(eventParsedComment, "deprecated")
	const privacy = findTag(eventParsedComment, ["public", "private", "protected"])?.tag || "private";
	const sinceTag = findTag(eventParsedComment, "since");
	const commentParams = findAllTags(eventParsedComment, "param");
	const allowPreventDefault = hasTag(eventParsedComment, "allowPreventDefault");
	const description = eventParsedComment?.description;
	const native = hasTag(eventParsedComment, "native");
	const eventDetails = event?.expression?.arguments?.[1]?.properties?.find(prop => prop?.name?.text === "detail")?.initializer?.properties;

	result.description = description;
	result._ui5allowPreventDefault = allowPreventDefault;

	if (native) {
		result.type = { text: "Event" };
	}

	if (privacy) {
		result.privacy = privacy;
	}

	if (deprecatedTag?.name) {
		result.deprecated = deprecatedTag?.description ? `${deprecatedTag.name} ${deprecatedTag.description}` : deprecatedTag.name;
	}

	if (sinceTag?.name) {
		result._ui5since = sinceTag?.description ? `${sinceTag.name} ${sinceTag.description}` : sinceTag.name;
	}

	if (commentParams && eventDetails) {
		result.params = getParams(ts, eventDetails, commentParams, classNode);
	}

	return result;
}

export default processEvent;