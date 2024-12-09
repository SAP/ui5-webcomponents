import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "note";
const pathData = "M64 32h384c17 0 32 15 32 32v384c0 19-15 32-32 32H64c-19 0-32-13-32-32V64c0-17 13-32 32-32zm384 32H64v384h384V64zm-276 79h168v28h-68v196h-32V171h-68v-28z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/note";
export { pathData, ltr, accData };