// eslint-disable-next-line import/extensions
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "preact/jsx-runtime";
import { options } from "preact";
import type UI5Element from "./UI5Element.js";
import { pascalToKebabCase } from "./util/StringHelper.js";

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
		const events = type.getMetadata().getEvents();

		Object.keys(props).forEach(prop => {
			if (prop.startsWith("on")) {
				// Exteract the kebab-case event: onChange - change, onSelectionChange - selection-change, etc.
				const pascalEvent = prop.slice("on".length);
				const kebabCaseEvent = pascalToKebabCase(pascalEvent);

				// Attach for th "ui5-" preffixed event
				if (kebabCaseEvent in events) {
					props[`onui5-${kebabCaseEvent}`] = props[prop];
					// TODO: native "click" event will be missed (as they won't be fired in pair with the "ui5-" event) - find better fix
					if (prop !== "onClick") {
						delete props[prop];
					}
				}
			}
		});
	}
	// eslint-disable-next-line @typescript-eslint/ban-types
	if (props.onClick && !isBound(props.onClick as Function)) {
		// eslint-disable-next-line @typescript-eslint/ban-types, no-console
		console.log(props.onClick, isBound(props.onClick as Function));
	}
	return _jsxDEV(tag as string, props, key);
}
// export { JSX };
