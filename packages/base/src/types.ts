import type { JSX } from "./jsx-runtime.d.ts";

// General utils
export type LowercaseString<T> = T extends string ? Lowercase<T> : never;

// Core Framework types
export type PromiseResolve = (value: void | PromiseLike<void>) => void;
export type Timeout = ReturnType<typeof setTimeout>;
export type Interval = ReturnType<typeof setInterval>;

export type StyleDataCSP = {
	content: string,
	packageName: string,
	fileName: string,
};

export type StyleData = StyleDataCSP | string;

export type ComponentStylesData = Array<ComponentStylesData> | Array<StyleData> | StyleData;
export type ClassMapValue = Record<string, boolean>

export type ClassMap = { [x: string] : ClassMapValue | ClassMap };

export type PassiveEventListenerObject = EventListenerObject & { passive: boolean };

// Accessibility
export type AriaRole = JSX.AriaRole;
export type AriaHasPopup = "dialog" | "grid" | "listbox" | "menu" | "tree";
export type AriaCurrent = "page" | "step" | "location" | "date" | "time" | "true" | "false" | boolean | undefined;
export type AriaAutoComplete = "list" | "none" | "inline" | "both" | undefined;
export type AriaLandmarkRole = "none" | "banner" | "main" | "region" | "navigation" | "search" | "complementary" | "form" | "contentinfo"

export type AccessibilityInfo = {
	// The WAI-ARIA role of the component.
	role?: AriaRole,

	// A translated text that represents the component type. Used when several components share same role,
	// f.e. Select and ComboBox both have role="combobox".
	type?: LowercaseString<string>,

	// A translated text that represents relevant component description/state - value, placeholder, label, etc.
	description?: string,

	 // The component disabled state.
	disabled?: boolean,

	// The component readonly state.
	readonly?: boolean,

	// The component required state.
	required?: boolean,

	// An array of elements, aggregated by the component
	// <b>Note:</b> Children should only be provided when it is helpful to understand the accessibility context.
	children?: Array<HTMLElement>,
}

export type AccessibilityAttributes = {
	ariaSetsize?: number,
	ariaPosinset?: number,
	ariaLabel?: string,
	controls?: LowercaseString<string>
	expanded?: "true" | "false" | boolean,
	hasPopup?: AriaHasPopup,
	name?: string,
	role?: AriaRole,
	ariaKeyShortcuts?: string,
	ariaCurrent?: AriaCurrent,
	current?: AriaCurrent,
}
