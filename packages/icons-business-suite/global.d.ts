import { ColectionData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

export {};

declare global {
	module "*/generated/assets/SAP-icons-business-suite.json" {
		const content: ColectionData;
		export default content;
	}
}
