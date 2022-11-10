export {};

declare global {
	interface Window {
		sap: any;
		chrome: any;
		v8: any;
	}

	type UnknownFunction = (...args: any[]) => any;
}
