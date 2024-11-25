// eslint-disable-next-line import/extensions
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "preact/jsx-runtime";
import { options } from "preact";
import type UI5Element from "./UI5Element.js";
import { preprocess } from "./jsx-utils.js";

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

function checkBound(props: Record<string, any>) {
	Object.keys(props).forEach(prop => {
		if (props[prop].startsWith("on") && !isBound(props[prop])) {
			// eslint-disable-next-line no-console
			console.log(props[prop], isBound(props[prop]));
		}
	});
}

export function Fragment(props: Record<string, any>, context?: any) {
	return _Fragment(props, context);
}

export function jsxDEV(type: string | typeof UI5Element, props: Record<string, any>, key: string) {
	const tag = preprocess(type, props, key);

	checkBound(props);

	return _jsxDEV(tag, props, key);
}
