// eslint-disable-next-line import/extensions
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import type { JSX as _JSX } from "preact/jsx-runtime";
// import { options } from "preact";
import type UI5Element from "./UI5Element.js";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace JSX {
    export interface IntrinsicElements extends _JSX.IntrinsicElements {}
    export type ElementClass = UI5Element;
    export interface ElementAttributesProperty {
		_jsxProps: HTMLAttributes;
	}
	export interface HTMLAttributes extends _JSX.HTMLAttributes {}
	export interface SVGAttributes extends _JSX.SVGAttributes {}
	export type AriaRole =_JSX.AriaRole;
}

export function Fragment(props: Record<string, any>, context?: any) {
	return _Fragment(props, context);
}
export function jsx(type: string | typeof UI5Element, props: Record<string, any>, key: string) {
	let tag = type;
	if (typeof type === "function" && "getMetadata" in type) {
		tag = type.getMetadata().getTag();
	}
	return _jsx(tag as string, props, key);
}
export function jsxs(type: string, props: Record<string, any>, key: string) {
	return _jsxs(type, props, key);
}
export { JSX };
