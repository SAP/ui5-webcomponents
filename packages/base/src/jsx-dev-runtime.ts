import UI5Element from "./UI5Element.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "preact/jsx-runtime";
import type { JSX } from "preact/jsx-runtime"

export function Fragment(props: Record<string, any>, context?: any) {
    console.log("Fragment");
    return _Fragment(props, context);
}
export function jsxDEV(type: string | UI5Element, props: Record<string, any>, key: string) {
    console.log("jsxDEV", type);
    let tag = type;
    if (typeof type === 'function' && (type as Function).prototype instanceof UI5Element) {
        tag = (type as typeof UI5Element).getMetadata().getTag();
    }
    return _jsxDEV(tag as string, props, key);
}
export { JSX };