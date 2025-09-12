const defaultKey = "handledByControl";

const setMark = (event: any, key: string, value: any = true) => {
	key = key || defaultKey;
	event[`_sapui_${key}`] = value;
};

const isMarked = (event: any, key?: string) => {
	return !!getMark(event, key);
};

const getMark = (event: any, key: string = defaultKey): any => {
	return event[`_sapui_${key}`];
};

export {
	isMarked,
	setMark,
	getMark,
};
