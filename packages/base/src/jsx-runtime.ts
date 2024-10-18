// eslint-disable-next-line import/extensions
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import type { JSX } from "preact/jsx-runtime";
import UI5Element from "./UI5Element.js";

export function Fragment(props: Record<string, any>, context?: any) {
	return _Fragment(props, context);
}
export function jsx(type: string | typeof UI5Element, props: Record<string, any>, key: string) {
	let tag = type;
	if (typeof type === "function" && type.prototype instanceof UI5Element) {
		tag = type.getMetadata().getTag();
	}
	return _jsx(tag as string, props, key);
}
export function jsxs(type: string, props: Record<string, any>, key: string) {
	return _jsxs(type, props, key);
}
export { JSX };
