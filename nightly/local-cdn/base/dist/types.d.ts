import type AriaHasPopup from "./types/AriaHasPopup.js";
import type AriaRole from "./types/AriaRole.js";
type PromiseResolve = (value: void | PromiseLike<void>) => void;
type Timeout = ReturnType<typeof setTimeout>;
type Interval = ReturnType<typeof setInterval>;
type StyleDataCSP = {
    content: string;
    packageName: string;
    fileName: string;
};
type StyleData = StyleDataCSP | string;
type ComponentStylesData = Array<ComponentStylesData> | Array<StyleData> | StyleData;
type ClassMapValue = Record<string, boolean>;
type ClassMap = {
    [x: string]: ClassMapValue | ClassMap;
};
type PassiveEventListenerObject = EventListenerObject & {
    passive: boolean;
};
type LowercaseString<T> = T extends string ? Lowercase<T> : never;
type ARIARoles = LowercaseString<AriaRole>;
type ARIAHasPopup = LowercaseString<AriaHasPopup>;
type AccessibilityInfo = {
    role?: ARIARoles;
    type?: LowercaseString<string>;
    description?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    children?: Array<HTMLElement>;
};
type AccessibilityAttributes = {
    ariaSetsize?: number;
    ariaPosinset?: number;
    controls?: LowercaseString<string>;
    expanded?: "true" | "false" | boolean;
    hasPopup?: ARIAHasPopup;
    name?: string;
    role?: ARIARoles;
};
export type { AccessibilityInfo, AccessibilityAttributes, PromiseResolve, Timeout, Interval, StyleData, StyleDataCSP, ComponentStylesData, ClassMap, ClassMapValue, PassiveEventListenerObject, };
