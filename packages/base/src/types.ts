type PromiseResolve = (value: void | PromiseLike<void>) => void;
type Timeout = ReturnType<typeof setTimeout>;

export type {
	PromiseResolve,
	Timeout,
};
