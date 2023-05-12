type PromiseResolve = (value: void | PromiseLike<void>) => void;
type Timeout = ReturnType<typeof setTimeout>;
type Interval = ReturnType<typeof setInterval>;

type StyleData = {
	content: string,
	packageName: string,
	fileName: string,
};

type ComponentStylesData = Array<ComponentStylesData> | Array<StyleData> | StyleData;

type ClassMapValue = Record<string, boolean>

type ClassMap = { [x: string] : ClassMapValue | ClassMap };

type PassiveEventListenerObject = EventListenerObject & { passive: boolean };

export type {
	PromiseResolve,
	Timeout,
	Interval,
	StyleData,
	ComponentStylesData,
	ClassMap,
	ClassMapValue,
	PassiveEventListenerObject,
};
