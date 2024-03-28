import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "task-done";
const pathData = "M256 160c53 0 96 43 96 96s-43 96-96 96-96-43-96-96 43-96 96-96z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/task-done";
export { pathData, ltr, accData };