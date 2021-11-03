import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { isTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { attachThemeLoaded } from "@ui5/webcomponents-base/dist/theming/ThemeLoaded.js";
import SAPIconsV4Url from "../generated/assets/v4/SAP-icons.json";
import SAPIconsV5Url from "../generated/assets/v5/SAP-icons.json";

const loadIconsBundle = async () => {
	if (typeof SAPIconsV5Url === "object" || typeof SAPIconsV4Url === "object") {
		// inlined from build
		throw new Error("[icons] Inlined JSON not supported with static imports of assets. Use dynamic imports of assets or configure JSON imports as URLs");
	}

	const SAPIconsUrl = isTheme("sap_horizon") ? SAPIconsV5Url : SAPIconsV4Url;
	return (await fetch(SAPIconsUrl)).json();
}

const registerLoader = () => {
	registerIconLoader(isTheme("sap_horizon") ? "SAP-icons-v5" : "SAP-icons", loadIconsBundle)
};

registerLoader();
attachThemeLoaded(registerLoader);