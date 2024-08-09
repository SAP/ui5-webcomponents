import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "splitter";
const pathData = "M32 352V160c0-17 13-32 32-32h96c19 0 32 13 32 32v80h64V128c0-35 29-64 64-64h32c0-17 13-32 32-32h64c19 0 32 13 32 32v64c0 19-15 32-32 32h-64c-17 0-32-15-32-32V96h-32c-19 0-32 15-32 32v112h64v-16c0-17 13-32 32-32h64c19 0 32 13 32 32v64c0 19-15 32-32 32h-64c-17 0-32-15-32-32v-16h-64v112c0 17 13 32 32 32h32v-32c0-17 13-32 32-32h64c19 0 32 13 32 32v64c0 19-15 32-32 32h-64c-17 0-32-15-32-32h-32c-35 0-64-29-64-64V272h-64v80c0 19-15 32-32 32H64c-17 0-32-15-32-32zm416-224V64h-64v64h64zm0 96h-64v64h64v-64zm-64 160v64h64v-64h-64z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/splitter";
export { pathData, ltr, accData };