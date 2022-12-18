type PromiseResolve = (value: void | PromiseLike<void>) => void;
type Timeout = ReturnType<typeof setTimeout>;

type StyleDataCSP = {
	content: string,
	packageName: string,
	fileName: string,
};

type StyleData = StyleDataCSP | string;

type ComponentStylesData = Array<StyleData> | StyleData;

type ClassMapValue = Record<string, boolean>

type ClassMap = { [x: string] : ClassMapValue | ClassMap };

export type {
	PromiseResolve,
	Timeout,
	StyleData,
	StyleDataCSP,
	ComponentStylesData,
	ClassMap,
};
