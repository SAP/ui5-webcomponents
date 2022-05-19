const promises = new Map();

const setTimeout = (callback, ...params) => {
	let deferredResolve;
	const promise = new Promise(resolve => {
		deferredResolve = resolve;
	});
	promise._deferredResolve = deferredResolve;

	const timeoutId = window.setTimeout(() => {
		callback();
		promise._deferredResolve();
		promises.delete(timeoutId);
	}, ...params);

	promises.set(timeoutId, promise);

	return timeoutId;
};

const clearTimeout = timeoutId => {
	window.clearTimeout(timeoutId);
	const promise = promises.get(timeoutId);
	if (promise) { // it's possible to call clearTimeout without having called setTimeout first
		promise._deferredResolve();
		promises.delete(timeoutId);
	}
};

const timeoutsReady = () => {
	return Promise.all([...promises.values()]);
};

const getTimeoutsCount = () => promises.size;

export {
	setTimeout,
	clearTimeout,
	timeoutsReady,
	getTimeoutsCount,
};
