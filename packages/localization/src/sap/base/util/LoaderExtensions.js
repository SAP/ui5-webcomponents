import { getModuleContent } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";

const LoaderExtensions = {
	loadResource: getModuleContent,
};

export default LoaderExtensions;
