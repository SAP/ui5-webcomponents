import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "task";
const pathData = "M54 82h404c31 0 54 25 54 54v247c0 31-23 51-54 51H54c-31 0-54-20-54-51V136c0-29 23-54 54-54zm426 288V150c0-20-16-36-36-36H67c-20 0-35 16-35 36v220c0 20 15 32 35 32h377c20 0 36-12 36-32z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/task";
export { pathData, ltr, accData };