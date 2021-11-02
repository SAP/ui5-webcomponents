import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import SAPIconsV4Url from "../generated/assets/v4/SAP-icons.json";
import SAPIconsV5Url from "../generated/assets/v5/SAP-icons.json";

const theme = getTheme();
const SAP_HORIZON = theme === "sap_horizon" ||  theme === "sap_horizon_exp";

const loadIconsBundle = async () => {
	if (typeof SAPIconsV5Url === "object" || typeof SAPIconsV4Url === "object") {
		// inlined from build
		throw new Error("[icons] Inlined JSON not supported with static imports of assets. Use dynamic imports of assets or configure JSON imports as URLs");
	}

	const SAPIconsUrl = SAP_HORIZON ? SAPIconsV5Url : SAPIconsV4Url;
	return (await fetch(SAPIconsUrl)).json();
}

registerIconLoader(SAP_HORIZON ? "SAP-icons-v5" : "SAP-icons", loadIconsBundle);
