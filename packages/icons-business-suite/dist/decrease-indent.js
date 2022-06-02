import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "decrease-indent";
const pathData = "M109 96h403v64H109V96zm0 91v37h86v64h-86v37L0 256zm147 37h256v64H256v-64zm256 128v64H109v-64h403z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "decrease-indent";
export { pathData, ltr, accData };