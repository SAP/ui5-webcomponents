type PromiseResolve = (value: void | PromiseLike<void>) => void;
type Timeout = ReturnType<typeof setTimeout>;
type Interval = ReturnType<typeof setInterval>;

type StyleDataCSP = {
	content: string,
	packageName: string,
	fileName: string,
};

type StyleData = StyleDataCSP | string;

type ComponentStylesData = Array<ComponentStylesData> | Array<StyleData> | StyleData;

type ClassMapValue = Record<string, boolean>

type ClassMap = { [x: string] : ClassMapValue | ClassMap };

type PassiveEventListenerObject = EventListenerObject & { passive: boolean };

type LowercaseString<T> = T extends string ? Lowercase<T> : never;

type AccessibilityInfo = {
	// The WAI-ARIA role of the component.
	role?: LowercaseString<string>,

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

type AccessibilityAttributes = {
	expanded?: "true" | "false" | boolean,
	hasPopup?: "dialog" | "grid" | "menu" | "listbox" | "tree",
	controls?: LowercaseString<string>
	ariaSetsize?: number,
	ariaPosinset?: number,
}

export type {
	AccessibilityInfo,
	AccessibilityAttributes,
	PromiseResolve,
	Timeout,
	Interval,
	StyleData,
	StyleDataCSP,
	ComponentStylesData,
	ClassMap,
	ClassMapValue,
	PassiveEventListenerObject,
};
