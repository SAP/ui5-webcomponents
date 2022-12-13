type PromiseResolve = (value: void | PromiseLike<void>) => void;
type Timeout = ReturnType<typeof setTimeout>;

type StyleDataCSP = {
	content: string,
	packageName: string,
	fileName: string,
};

type StyleData = StyleDataCSP | string;

type ComponentStylesData = Array<StyleData> | StyleData;

export type {
	PromiseResolve,
	Timeout,
	StyleData,
	StyleDataCSP,
	ComponentStylesData,
};
