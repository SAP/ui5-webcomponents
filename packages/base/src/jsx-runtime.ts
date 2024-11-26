// eslint-disable-next-line import/extensions
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import type { JSX as _JSX } from "preact/jsx-runtime";
import { options } from "preact";
import type UI5Element from "./UI5Element.js";
import { preprocess } from "./jsx-utils.js";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace JSX {
	// export interface HTMLAttributes<RefType extends EventTarget = EventTarget> extends Omit<_JSX.HTMLAttributes<RefType>, "class"> {
	// 	class: Record<string, boolean> | string | undefined // _JSX.HTMLAttributes["class"]
	// }

    export interface IntrinsicElements extends _JSX.IntrinsicElements {}
    export type ElementClass = UI5Element;
    export interface ElementAttributesProperty<T extends EventTarget> {
		_jsxProps: HTMLAttributes<T>;
	}
	export interface HTMLAttributes<T extends EventTarget> extends _JSX.HTMLAttributes<T> {}
	export interface DOMAttributes<T extends EventTarget> extends _JSX.DOMAttributes<T> {}
	export interface SVGAttributes extends _JSX.SVGAttributes {}
	export type AriaRole = _JSX.AriaRole;
	export type MouseEventHandler<T extends EventTarget> = _JSX.MouseEventHandler<T>;
	export type TargetedMouseEvent<Target extends EventTarget> = _JSX.TargetedMouseEvent<Target>;
	export type TargetedInputEvent<Target extends EventTarget> = _JSX.TargetedInputEvent<Target>;
}

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

export function Fragment(props: Record<string, any>, context?: any) {
	return _Fragment(props, context);
}
export function jsx(type: string | typeof UI5Element, props: Record<string, any>, key: string) {
	const tag = preprocess(type, props, key);

	return _jsx(tag, props, key);
}
export function jsxs(type: string | typeof UI5Element, props: Record<string, any>, key: string) {
	const tag = preprocess(type, props, key);

	return _jsxs(tag, props, key);
}
export { JSX };
