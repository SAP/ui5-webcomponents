import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "vertical-grip";
const pathData = "M224 96V32h64v64h-64zm0 128v-64h64v64h-64zm0 128v-64h64v64h-64zm0 128v-64h64v64h-64z";
const ltr = false;
const accData = null;
const collection = "SAP-icons";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "vertical-grip";
export { pathData, ltr, accData };