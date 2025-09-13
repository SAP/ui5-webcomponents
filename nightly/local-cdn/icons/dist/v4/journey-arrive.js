import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "journey-arrive";
const pathData = "M160 64h320q14 0 23 9t9 23v320q0 14-9 23t-23 9H160q-14 0-23-9t-9-23v-64h32v64h320V96H160v64h-32V96q0-14 9-23t23-9zM16 240h288l-75-68q-11-12 0-23 5-5 11-5t11 5l92 83q9 10 9 23t-9 23l-92 86q-5 5-11 5-3 0-11-5-11-12 0-23l75-69H16q-16 0-16-16t16-16z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/journey-arrive";
export { pathData, ltr, accData };