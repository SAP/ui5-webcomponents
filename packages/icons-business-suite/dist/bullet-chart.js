import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bullet-chart";
const pathData = "M32 257q0-14 9.5-23t22.5-9h259v-35h50v35h75q14 0 23 9t9 23q0 13-9 22.5t-23 9.5h-75v27h-50v-27H64q-13 0-22.5-9.5T32 257z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "bullet-chart";
export { pathData, ltr, accData };