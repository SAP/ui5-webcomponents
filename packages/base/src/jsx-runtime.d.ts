import UI5Element from "./UI5Element.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "preact/jsx-runtime";
import type { JSX as _JSX } from "preact/jsx-runtime"
import type { VNode, ComponentChild, ComponentChildren, Attributes } from "preact";
declare namespace JSX {
    export interface IntrinsicElements extends _JSX.IntrinsicElements {}
    export type ElementClass = {};
    export interface ElementAttributesProperty {
		_jsxProps: any;
	}
	export interface HTMLAttributes extends _JSX.HTMLAttributes {}
	export interface SVGAttributes extends _JSX.SVGAttributes {}
}

export function Fragment(props: Record<string, any>, context?: any);
export { JSX };


export function jsx(
	type: string,
	props: JSX.HTMLAttributes &
		JSX.SVGAttributes &
		Record<string, any> & { children?: ComponentChild },
	key?: string
): VNode<any>;

export function jsx<P>(
	type: UI5Element,
	props: Attributes & P & { children?: ComponentChild },
	key?: string
): VNode<any>;

export function jsxs(
	type: string,
	props: JSX.HTMLAttributes &
		JSX.SVGAttributes &
		Record<string, any> & { children?: ComponentChild[] },
	key?: string
): VNode<any>;
export function jsxs<P>(
	type: UI5Element,
	props: Attributes & P & { children?: ComponentChild[] },
	key?: string
): VNode<any>;

export function jsxDEV(
	type: string,
	props: JSX.HTMLAttributes &
		JSX.SVGAttributes &
		Record<string, any> & { children?: ComponentChildren },
	key?: string
): VNode<any>;
export function jsxDEV<P>(
	type: UI5Element,
	props: Attributes & P & { children?: ComponentChildren },
	key?: string
): VNode<any>;

