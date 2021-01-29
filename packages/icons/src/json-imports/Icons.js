import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

import SAPIconsUrl from "../generated/assets/SAP-icons.json";

const loadIconsBundle = async () => {
	if (typeof SAPIconsUrl === "object") {
		// inlined from build
		throw new Error("inlined JSON not supported with static assets, use dynamic assets or configure JSON imports as URLs");
	}
	return (await fetch(SAPIconsUrl)).json();
}

registerIconLoader("SAP-icons", loadIconsBundle);
