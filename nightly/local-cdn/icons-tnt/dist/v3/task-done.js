import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "task-done";
const pathData = "M240 128c71 0 128 57 128 128 0 70-57 128-128 128s-128-58-128-128c0-71 57-128 128-128z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/task-done";
export { pathData, ltr, accData };