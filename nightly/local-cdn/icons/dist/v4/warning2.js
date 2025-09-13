import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "warning2";
const pathData = "M511 256L256 511 1 256 256 2zM256 456l199-200L256 57 56 256zm0-168q-6 0-10-2.5t-6-14.5l-15-109q0-14 8.5-23t22.5-9 22.5 9 8.5 23l-15 109q-2 11-5.5 14t-10.5 3zm31 59q0 14-8.5 23t-22.5 9-22.5-9-8.5-23q0-12 8.5-21.5T256 316t22.5 9.5T287 347z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/warning2";
export { pathData, ltr, accData };