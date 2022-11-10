declare global {
	interface Window {
		sap: any;
		chrome: any;
		v8: any;
	}

	type UnknownFunction = (...args: any[]) => any;
}

type StyleData = string | StyleDataInfo;

type StyleDataInfo = {
	content: string,
	packageName: string,
	fileName: string,
};

export { StyleData, StyleDataInfo };
