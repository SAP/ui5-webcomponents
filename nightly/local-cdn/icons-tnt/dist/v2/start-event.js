import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "start-event";
const pathData = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-100-20-81.5-55T20 355.5 0 256t20-99.5T74.5 75 156 20 256 0zm0 480q46 0 87-17.5t71.5-48 48-71.5 17.5-87-17.5-87-48-71.5-71.5-48T256 32t-87 17.5-71.5 48-48 71.5T32 256t17.5 87 48 71.5 71.5 48 87 17.5z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/start-event";
export { pathData, ltr, accData };