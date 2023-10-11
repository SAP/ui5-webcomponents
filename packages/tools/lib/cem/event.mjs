import { parse } from "comment-parser";
import { getPrivacyStatus, getDeprecatedStatus, getSinceStatus, getType, validateJSDocComment } from "./utils.mjs";

const jsDocRegExp = /\/\*\*(.|\n)+?\s+\*\//;

const getParams = (ts, decoratorParams, commentParams, classNode) => {
	return commentParams?.map(commentParam => {
		const decoratorParam = decoratorParams?.find(prop => prop?.name?.text === commentParam?.name);

		if (!decoratorParam) {
			return;
		}

		validateJSDocComment("eventParam", decoratorParam?.jsDoc?.[0], decoratorParam)

		return {
			type: getType(ts, commentParam?.type, classNode),
			name: commentParam?.name,
			privacy: getPrivacyStatus(ts, decoratorParam?.jsDoc?.[0]),
			description: commentParam?.description,
			_ui5since: getSinceStatus(ts, decoratorParam?.jsDoc?.[0]),
			deprecated: getDeprecatedStatus(ts, decoratorParam?.jsDoc?.[0]),
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

	if (comment) {
		const parsedComment = parse(comment)[0];

		validateJSDocComment("event", parsedComment, event?.expression?.arguments?.[0]?.text)

		const deprecatedTag = parsedComment?.tags?.find(tag => tag?.tag === "deprecated");
		const privacy = parsedComment?.tags?.find(tag => ["private", "public", "protected"].includes(tag?.tag))?.tag || "private";
		const sinceTag = parsedComment?.tags?.find(tag => tag?.tag === "since");
		const commentParams = parsedComment?.tags?.filter(tag => tag?.tag === "param") || [];
		const allowPreventDefault = !!parsedComment?.tags?.some(tag => tag?.tag === "allowPreventDefault");
		const description = parsedComment?.description;
		const native = !!parsedComment?.tags?.some(tag => tag?.tag === "native") ? "Event" : "CustomEvent";
		const decoratorParams = event?.expression?.arguments?.[1]?.properties?.find(prop => prop?.name?.text === "detail")?.initializer?.properties;

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

		if (commentParams && decoratorParams) {
			result.params = getParams(ts, decoratorParams, commentParams, classNode);
		}
	}

	return result;
}

export default processEvent;