import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "subject";
const pathData = "M427 0c47 0 85 38 85 85v341c0 48-38 86-85 86H85c-46 0-85-38-85-86V85C0 38 39 0 85 0h342zM121 41v31c0 3 3 6 6 6h31c3 0 6-3 6-6V41c0-3-3-6-6-6h-31c-3 0-6 3-6 6zm114 0v31c0 3 2 6 6 6h30c4 0 7-3 7-6V41c0-3-3-6-7-6h-30c-4 0-6 3-6 6zm113 0v31c0 3 3 6 6 6h31c4 0 6-3 6-6V41c0-4-2-6-6-6h-31c-3 0-6 2-6 6zm107 385V114H57v312c0 16 13 29 28 29h342c16 0 28-13 28-29z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/subject";
export { pathData, ltr, accData };