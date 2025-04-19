import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "more";
const pathData = "M64 96q-13 0-22.5-9.5T32 64q0-14 9.5-23T64 32h384q14 0 23 9t9 23q0 13-9 22.5T448 96H64zm0 128q-13 0-22.5-9.5T32 192q0-14 9.5-23t22.5-9h384q14 0 23 9t9 23q0 13-9 22.5t-23 9.5H64zm0 128q-13 0-22.5-9.5T32 320q0-14 9.5-23t22.5-9h384q14 0 23 9t9 23q0 13-9 22.5t-23 9.5H64zm257 67q6-6 11-6 6 0 12 6 5 5 5 11t-5 11l-65 61q-10 9-23 9t-22-9l-65-58q-5-5-5-11.5t5-11.5 11.5-5 11.5 5l59 53q3 3 5 3 3 0 6-3z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/more";
export { pathData, ltr, accData };