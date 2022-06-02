import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "accept";
const pathData = "M432 153q8 8 8 18v2q0 9-9 18L220 407q-8 8-18 8-12 0-21-9l-93-97q-8-7-8-18 0-12 9-21 7-7 18-7 12 0 21 9l75 76 191-197q7-7 18-7 13 0 20 9z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "accept";
export { pathData, ltr, accData };