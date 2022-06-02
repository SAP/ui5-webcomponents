import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-top";
const pathData = "M231.5 121l-87 86q-8 8-18 8-9 0-19-8-7-7-7-18t7-18l129-128q3-4 8-7t13-3 12.5 3 8.5 7l128 128q8 7 8 18t-8 18q-8 8-18 8t-18-8l-87-86v333q0 26-26 26t-26-26V121z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "arrow-top";
export { pathData, ltr, accData };