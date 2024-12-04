// eslint-disable-next-line import/extensions
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "preact/jsx-runtime";
import { options } from "preact";
import type UI5Element from "./UI5Element.js";
import { isUI5ElementClass, preprocess } from "./jsx-utils.js";
import { kebabToCamelCase } from "./util/StringHelper.js";

// import classObjToStr from "./util/classObjToString.js";

// eslint-disable-next-line @typescript-eslint/unbound-method
const old = options.vnode;

options.vnode = vnode => {
	const props: Record<string, any> = vnode.props;
	if (props !== null && typeof props === "object") {
		if (props.class && typeof props.class === "object") {
			// props.class = classObjToStr(props.class as Record<string, boolean>);
		}
	}
	old && old(vnode);
};

// eslint-disable-next-line @typescript-eslint/ban-types
function isBoundOrArrow(func: Function): boolean {
	// TODO improve => detection after func params
	return func.name.startsWith("bound ") || func.toString().includes("=>");
}

function checkBound(props: Record<string, any>) {
	Object.keys(props).forEach(prop => {
		if (prop.startsWith("on") && !isBoundOrArrow(props[prop])) {
			// eslint-disable-next-line no-console
			console.warn(`Method [${prop}] not bound, accessing [this] won't work correctly. Add \`@bound\` decorator`, props[prop]);
		}
	});
}

function checkAttributeUsage(type: string | typeof UI5Element, props: Record<string, any>) {
	if (!isUI5ElementClass(type)) {
		return;
	}

	const tag = type.getMetadata().getTag();
	const componentAttributes = type.getMetadata().getAttributesList();
	Object.keys(props).forEach(prop => {
		if (prop.includes("-") && componentAttributes.includes(prop)) {
			// eslint-disable-next-line no-console
			console.warn(`Avoid attribute usage in favour of properties ['${prop}' --> '${kebabToCamelCase(prop)}'] for tag [${tag}]. Check stack trace to find out which template causes this. Attributes are not type-checked and boolean conversion is manual and error-prone.`);
		}
	});
}

export function Fragment(props: Record<string, any>, context?: any) {
	return _Fragment(props, context);
}

export function jsxDEV(type: string | typeof UI5Element, props: Record<string, any>, key: string) {
	const tag = preprocess(type, props, key);

	checkBound(props);
	checkAttributeUsage(type, props);

	return _jsxDEV(tag, props, key);
}