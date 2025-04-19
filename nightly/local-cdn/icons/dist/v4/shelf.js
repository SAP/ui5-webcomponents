import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "shelf";
const pathData = "M64 512V32q0-14 9-23t23-9h320q13 0 22.5 9t9.5 23v480h-32v-96H96v96H64zm32-128h320v-96H96v96zm0-256h320V32H96v96zm0 32v96h320v-96H96zm112 32h96q16 0 16 16t-16 16h-96q-16 0-16-16t16-16zm0 128h96q16 0 16 16t-16 16h-96q-16 0-16-16t16-16zm0-256h96q16 0 16 16t-16 16h-96q-16 0-16-16t16-16z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/shelf";
export { pathData, ltr, accData };