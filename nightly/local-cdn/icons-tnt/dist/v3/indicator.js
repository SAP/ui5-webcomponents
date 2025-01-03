import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "indicator";
const pathData = "M256 192c35 0 64 29 64 64s-29 64-64 64c-36 0-64-29-64-64s28-64 64-64z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/indicator";
export { pathData, ltr, accData };