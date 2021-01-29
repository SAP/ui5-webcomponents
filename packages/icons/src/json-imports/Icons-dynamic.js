import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const loadIconsBundle = async () => {
    return (await import("../generated/assets/SAP-icons.json")).default;
}

registerIconLoader("SAP-icons", loadIconsBundle);