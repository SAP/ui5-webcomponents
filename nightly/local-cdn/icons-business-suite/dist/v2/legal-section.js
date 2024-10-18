import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "legal-section";
const pathData = "M447 408V74c0-13-11-24-24-24H89c-13 0-24 11-24 24v334c0 13 11 24 24 24h334c13 0 24-11 24-24zM89 2h334c40 0 72 32 72 72v334c0 40-32 72-72 72H89c-40 0-72-32-72-72V74C17 34 49 2 89 2zm263 96H160c-27 0-47 20-47 47v24c0 27 20 48 47 48h192c27 0 47-21 47-48v-24c0-27-20-47-47-47zm0 47v24H160v-24h192zm0 120H160c-27 0-47 22-47 48v24c0 27 20 48 47 48h192c27 0 47-21 47-48v-24c0-26-20-48-47-48zm0 48v24H160v-24h192z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/legal-section";
export { pathData, ltr, accData };