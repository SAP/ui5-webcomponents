import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "status-suspended";
const pathData = "M32 448V64c0-19 13-32 32-32h384c19 0 32 13 32 32v384c0 19-13 32-32 32H64c-19 0-32-13-32-32zm320-320h-64v256h64V128zm-192 0v256h64V128h-64z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/status-suspended";
export { pathData, ltr, accData };