import { ColectionData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

export {};

declare global {
	module "*generated/assets/v4/SAP-icons.json" {
		const content: ColectionData;
		export default content;
	}

	module "*generated/assets/v5/SAP-icons.json" {
		const content: ColectionData;
		export default content;
	}
}
