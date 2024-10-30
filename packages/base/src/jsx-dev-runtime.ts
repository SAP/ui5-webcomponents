// eslint-disable-next-line import/extensions
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "preact/jsx-runtime";
import { options } from "preact";
import type UI5Element from "./UI5Element.js";
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
function isBound(func: Function): boolean {
	return func.name.startsWith("bound ");
}

export function Fragment(props: Record<string, any>, context?: any) {
	return _Fragment(props, context);
}
export function jsxDEV(type: string | typeof UI5Element, props: Record<string, any>, key: string) {
	let tag = type;
	if (typeof type === "function" && "getMetadata" in type) {
		tag = type.getMetadata().getTag();
	}
	// eslint-disable-next-line @typescript-eslint/ban-types
	if (props.onClick && !isBound(props.onClick as Function)) {
		// eslint-disable-next-line @typescript-eslint/ban-types, no-console
		console.log(props.onClick, isBound(props.onClick as Function));
	}
	return _jsxDEV(tag as string, props, key);
}
// export { JSX };
