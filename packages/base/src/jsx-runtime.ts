// eslint-disable-next-line import/extensions
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "preact/jsx-runtime";
import type { JSX } from "preact/jsx-runtime";
import UI5Element from "./UI5Element.js";

export function Fragment(props: Record<string, any>, context?: any) {
	return _Fragment(props, context);
}
export function jsxDEV(type: string | typeof UI5Element, props: Record<string, any>, key: string) {
	let tag = type;
	if (typeof type === "function" && type.prototype instanceof UI5Element) {
		tag = type.getMetadata().getTag();
	}
	return _jsxDEV(tag as string, props, key);
}
export { JSX };
