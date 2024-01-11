import { CollectionData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

export {};

declare global {
	// icons are generated in src/generated-tracked, but imported from dist
	// this maping works only in vite at dev time and the typescript compiler
	// cannot do the type checking
	// all icons that import the default export have to be added here
	module "*.json" {
		const content: CollectionData;
		export default content;
	}
}
