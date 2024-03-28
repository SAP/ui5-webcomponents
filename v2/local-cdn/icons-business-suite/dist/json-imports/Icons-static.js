import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import SAPIconsBusinessSuiteUrlV1 from "../generated/assets/v1/SAP-icons-business-suite.json";
import SAPIconsBusinessSuiteUrlV2 from "../generated/assets/v2/SAP-icons-business-suite.json";
const loadIconsBundle = async (collection) => {
    if (typeof SAPIconsBusinessSuiteUrlV1 === "object" || typeof SAPIconsBusinessSuiteUrlV2 === "object") {
        // inlined from build
        throw new Error("[icons-business-suite] Inlined JSON not supported with static imports of assets. Use dynamic imports of assets or configure JSON imports as URLs");
    }
    const iconsUrl = collection === "business-suite-v1" ? SAPIconsBusinessSuiteUrlV1 : SAPIconsBusinessSuiteUrlV2;
    return (await fetch(iconsUrl)).json();
};
const registerLoaders = () => {
    registerIconLoader("business-suite-v1", loadIconsBundle);
    registerIconLoader("business-suite-v2", loadIconsBundle);
};
registerLoaders();
//# sourceMappingURL=Icons-static.js.map