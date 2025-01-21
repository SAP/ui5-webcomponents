import type UI5Element from "./UI5Element.js";
import hash2str from "./util/hash2str.js";
import { pascalToKebabCase } from "./util/StringHelper.js";

function convertEventScoping(type: typeof UI5Element, props: Record<string, any>, key: string) {
	const events = type.getMetadata().getEvents();

	Object.keys(props).forEach(prop => {
		if (prop.startsWith("on")) {
			// Exteract the kebab-case event: onChange - change, onSelectionChange - selection-change, etc.
			const pascalEvent = prop.slice("on".length);
			const kebabCaseEvent = pascalToKebabCase(pascalEvent);

			// Attach for the "ui5-" preffixed event
			if (kebabCaseEvent in events) {
				if ((prop !== "onClick")) {
					props[`onui5-${kebabCaseEvent}`] = props[prop];
					// TODO keep native events for now, find a way to mark them for runtime
					delete props[prop];
				}
			}
		}
	});
}

export function isUI5ElementClass(type: string | typeof UI5Element): type is typeof UI5Element {
	return typeof type === "function" && "getMetadata" in type;
}

export function preprocess(type: string | typeof UI5Element, props: Record<string, any>, key: string) {
	let tag: string;
	if (isUI5ElementClass(type)) {
		tag = type.getMetadata().getTag();
		convertEventScoping(type, props, key);
	} else {
		tag = type;
	}

	// convert class object to string
	if (typeof props.class === "object") {
		props.class = hash2str(props.class);
	}

	return tag;
}
