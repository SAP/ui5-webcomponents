type PromiseResolve = (value: void | PromiseLike<void>) => void;
type Timeout = ReturnType<typeof setTimeout>;

type StyleDataCSP = {
	content: string,
	packageName: string,
	fileName: string,
};
type StyleData = StyleDataCSP | string;

type I18nDefaultText = {
	key: string,
	defaultText: string
}

export type {
	PromiseResolve,
	Timeout,
	StyleData,
	StyleDataCSP,
	I18nDefaultText,
};
