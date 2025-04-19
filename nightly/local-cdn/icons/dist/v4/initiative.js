import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "initiative";
const pathData = "M256 0q53 0 99.5 20T437 74.5t55 81.5 20 100-20 99.5-55 81.5-81.5 55-99.5 20-100-20-81.5-55T20 355.5 0 256t20-100 54.5-81.5T156 20 256 0zm0 480q46 0 87-17.5t71.5-48 48-71.5 17.5-87-17.5-87-48-71.5-71.5-48T256 32q-47 0-87.5 17.5t-71 48-48 71.5T32 256t17.5 87 48 71.5 71 48T256 480zm7-212q12-12 0-23l-62-63q-10-10-10-23t10-22q9-10 22-10t23 10l96 97q9 9 9 22.5t-9 22.5l-96 97q-10 10-23 10t-23-10q-9-9-9-22.5t9-22.5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/initiative";
export { pathData, ltr, accData };