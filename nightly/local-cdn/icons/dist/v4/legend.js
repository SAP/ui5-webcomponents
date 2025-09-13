import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "legend";
const pathData = "M176 160q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14zm0 128q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14zm0 128q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14zM416 0q14 0 23 9t9 23v448q0 13-9 22.5t-23 9.5H96q-14 0-23-9.5T64 480V32q0-14 9-23t23-9h320zm0 32H96v448h320V32zm-48 64q16 0 16 16 0 6-4.5 11t-11.5 5h-64q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h64zm0 128q16 0 16 16 0 6-4.5 11t-11.5 5h-64q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h64zm0 128q16 0 16 16 0 6-4.5 11t-11.5 5h-64q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h64z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/legend";
export { pathData, ltr, accData };