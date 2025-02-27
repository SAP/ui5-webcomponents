import type { JSX } from "./jsx-runtime.d.ts";

// type b = Parameters<JSX.IntrinsicElements["li"]["onClick"]>[0];

type TargetedCustomEvent<D, T> = Omit<CustomEvent<D>, "currentTarget"> & { currentTarget: T };
// export type UI5NativeEvent<T extends keyof HTMLElementTagNameMap, N> = Parameters<JSX.IntrinsicElements[T][N]>[0];
export type UI5CustomEvent<T extends UI5Element, N extends keyof T["eventDetails"]> = TargetedCustomEvent<T["eventDetails"][N], T>;
export type JsxTemplateResult = JSX.Element | void;
export type JsxTemplate = () => JsxTemplateResult;

export type * from "./types.d.ts";
export type * from "./jsx-runtime.d.ts";
