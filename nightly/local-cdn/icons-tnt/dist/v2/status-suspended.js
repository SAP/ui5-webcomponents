import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "status-suspended";
const pathData = "M32 448V64q0-14 9-23t23-9h384q14 0 23 9t9 23v384q0 14-9 23t-23 9H64q-14 0-23-9t-9-23zm256-320v256h64V128h-64zM160 384h64V128h-64v256z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/status-suspended";
export { pathData, ltr, accData };