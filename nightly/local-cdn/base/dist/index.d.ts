import type { JSX } from "./jsx-runtime.d.ts";

export type UI5CustomEvent<T extends UI5Element, N extends keyof T["eventDetails"]> = CustomEvent<T["eventDetails"][N]>;
export type JsxTemplateResult = JSX.Element | void;
export type JsxTemplate = () => JsxTemplateResult;

export type * from "./types.d.ts";
export type * from "./jsx-runtime.d.ts";
