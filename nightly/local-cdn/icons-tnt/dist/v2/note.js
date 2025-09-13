import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "note";
const pathData = "M64 32h384q13 0 22.5 9.5T480 64v384q0 14-9.5 23t-22.5 9H64q-14 0-23-9t-9-23V64q0-13 9-22.5T64 32zm0 32v384h384V64H64zm276 79v28h-68v196h-32V171h-68v-28h168z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/note";
export { pathData, ltr, accData };