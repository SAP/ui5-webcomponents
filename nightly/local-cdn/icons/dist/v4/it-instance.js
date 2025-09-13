import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "it-instance";
const pathData = "M352 0q14 0 23 9t9 23v448q0 14-9 23t-23 9H160q-13 0-22.5-9t-9.5-23V32q0-14 9.5-23T160 0h192zm0 32H160v448h192V32zM208 416q-16 0-16-16t16-16h96q16 0 16 16t-16 16h-96zm80-288q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/it-instance";
export { pathData, ltr, accData };