import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "weight";
const pathData = "M37 1h439c20 0 36 17 36 37v439c0 20-16 36-36 36H37c-20 0-37-16-37-36V38C0 18 17 1 37 1zm274 145l55-55c-62-60-157-60-219 0l55 55c13-4 24-7 35-9l-8-64 8-1 13 64h8c15 0 33 3 53 10zm145 287V192c0-15-11-25-24-25H81c-15 0-24 10-24 25v241c0 13 9 24 24 24h351c13 0 24-11 24-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/weight";
export { pathData, ltr, accData };