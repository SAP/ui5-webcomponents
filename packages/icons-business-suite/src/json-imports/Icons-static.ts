import { registerIconLoader, CollectionData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

import SAPIconsBusinessSuiteUrl from "../generated/assets/SAP-icons-business-suite.json";

const loadIconsBundle = async (): Promise<CollectionData> => {
	if (typeof SAPIconsBusinessSuiteUrl === "object") {
		// inlined from build
		throw new Error("[icons-business-suite] Inlined JSON not supported with static imports of assets. Use dynamic imports of assets or configure JSON imports as URLs");
	}
	return (await fetch(SAPIconsBusinessSuiteUrl)).json();
}

registerIconLoader("business-suite", loadIconsBundle);
