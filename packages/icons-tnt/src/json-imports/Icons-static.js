import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

import SAPIconsTNTUrl from "../generated/assets/SAP-icons-TNT.json";

const loadIconsBundle = async () => {
	if (typeof SAPIconsUrl === "object") {
		// inlined from build
		throw new Error("inlined JSON not supported with static assets, use dynamic assets or configure JSON imports as URLs");
	}
	return (await fetch(SAPIconsTNTUrl)).json();
}

registerIconLoader("SAP-icons-TNT", loadIconsBundle);
