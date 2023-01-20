import { registerIconLoader, CollectionData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

import SAPIconsTNTUrl from "../generated/assets/SAP-icons-TNT.json";

const loadIconsBundle = async (): Promise<CollectionData> => {
	if (typeof SAPIconsTNTUrl === "object") {
		// inlined from build
		throw new Error("[icons-tnt] Inlined JSON not supported with static imports of assets. Use dynamic imports of assets or configure JSON imports as URLs");
	}
	return (await fetch(SAPIconsTNTUrl)).json();
}

registerIconLoader("tnt", loadIconsBundle);
