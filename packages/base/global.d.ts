import { StyleData } from "./src/types.js";

export {};

declare global {

	type VersionInfo = {
		version: string,
		major: number,
		minor: number,
		patch: number,
		suffix: string,
		isNext: boolean,
		buildTime: number,
	}

	interface Window {
		sap: any;
		chrome: any;
		v8: any;
	}
	module "*.css.js" {
		const content: StyleData;
		export default content;
	}

	module "*generated/AssetParameters.js" {
		const DEFAULT_THEME: string;
		const DEFAULT_LANGUAGE: string;
		const DEFAULT_LOCALE: string;
		const SUPPORTED_LOCALES: Array<string>;
		export {
			DEFAULT_THEME,
			DEFAULT_LANGUAGE,
			DEFAULT_LOCALE,
			SUPPORTED_LOCALES,
		};
	}

	module "*generated/VersionInfo.js" {
		const content: VersionInfo;
		export default content;
	}
}
