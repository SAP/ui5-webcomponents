import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "unit";
const pathData = "M0 512L512 0v512H0zm77-32h403V77l-77 77 45 45-23 23-45-45-22 22 45 45-23 23-45-45-22 23 44 45-22 22-45-45-23 23 45 45-22 22-45-44-23 22 45 45-23 23-45-45-22 22 45 45-23 23-45-45zm204-32l167-167v167H281zm135-32v-58l-58 58h58z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/unit";
export { pathData, ltr, accData };