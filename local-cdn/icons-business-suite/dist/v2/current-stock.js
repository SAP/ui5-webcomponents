import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "current-stock";
const pathData = "M69 231L247 7c6-7 14-7 19 0l178 224c4 4 4 12 0 16L266 473c-5 7-15 7-20 0L69 247c-4-4-4-12 0-16z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/current-stock";
export { pathData, ltr, accData };