import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sum";
const pathData = "M147.5 429h287c13 0 26 12 26 26 0 13-13 25-26 25h-355c-11 0-20-7-24-16s-1-21 7-28l227-195-227-195c-8-7-11-19-7-28s13-16 24-16h355c13 0 26 12 26 25 0 14-13 26-26 26h-287l198 169c5 6 8 11 8 19s-3 13-8 19z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/sum";
export { pathData, ltr, accData };