import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import SAPIconsTNTUrlV2 from "../generated/assets/v2/SAP-icons-TNT.json";
import SAPIconsTNTUrlV3 from "../generated/assets/v3/SAP-icons-TNT.json";
const loadIconsBundle = async (collection) => {
    if (typeof SAPIconsTNTUrlV3 === "object" || typeof SAPIconsTNTUrlV2 === "object") {
        // inlined from build
        throw new Error("[icons-tnt] Inlined JSON not supported with static imports of assets. Use dynamic imports of assets or configure JSON imports as URLs");
    }
    const iconsUrl = collection === "tnt-v3" ? SAPIconsTNTUrlV3 : SAPIconsTNTUrlV2;
    return (await fetch(iconsUrl)).json();
};
registerIconLoader("tnt", loadIconsBundle);
const registerLoaders = () => {
    registerIconLoader("tnt-v2", loadIconsBundle);
    registerIconLoader("tnt-v3", loadIconsBundle);
};
registerLoaders();
//# sourceMappingURL=Icons-static.js.map