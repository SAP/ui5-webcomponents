// eslint-disable-next-line import/extensions
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "preact/jsx-runtime";
import type { JSX as _JSX } from "preact/jsx-runtime";
import type UI5Element from "./UI5Element.js";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace JSX {
    export interface IntrinsicElements extends _JSX.IntrinsicElements {}
    export type ElementClass = unknown;
    export interface ElementAttributesProperty {
		_jsxProps: any;
	}
	export interface HTMLAttributes extends _JSX.HTMLAttributes {}
	export interface SVGAttributes extends _JSX.SVGAttributes {}
}

export function Fragment(props: Record<string, any>, context?: any) {
	return _Fragment(props, context);
}
export function jsxDEV(type: string | typeof UI5Element, props: Record<string, any>, key: string) {
	let tag = type;
	if (typeof type === "function" && "getMetadata" in type) {
		tag = type.getMetadata().getTag();
	}
	return _jsxDEV(tag as string, props, key);
}
export { JSX };
