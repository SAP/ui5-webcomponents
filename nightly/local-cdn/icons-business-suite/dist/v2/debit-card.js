import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "debit-card";
const pathData = "M460.5 404V251h-408v153c0 14 11 25 25 25h357c15 0 26-11 26-25zm-408-256v25h408v-25c0-14-11-25-26-25h-357c-14 0-25 11-25 25zm25-76h357c43 0 76 33 76 76v256c0 43-33 76-76 76h-357c-43 0-76-33-76-76V148c0-43 33-76 76-76z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/debit-card";
export { pathData, ltr, accData };