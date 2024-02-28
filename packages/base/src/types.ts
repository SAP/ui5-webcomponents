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

type AccessibilityInfo = {
	role?: string, // The WAI-ARIA role of the component.
	type?: string, // The component type (could be the component name), used when several components share same role (f.e. Select and ComboBox both have role="combobox").
	description?: string, // The most relevant component description/state - value, placeholder, label, etc.
	disabled?: boolean, // The component disabled state.
	readonly?: boolean, // The component readonly state.
	required?: boolean, // The component required state.
}

export type {
	AccessibilityInfo,
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
