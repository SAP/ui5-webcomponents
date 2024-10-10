import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sub-content";
const pathData = "M0 448V64c0-11 5-32 32-32h187l29 32h232c15 0 24 8 28 16 3 5 4 10 4 16v352c0 23-17 32-32 32H32c-11 0-32-5-32-32zm64 0h384c11 0 32-5 32-32V128c-3-19-13-32-32-32H224l-32-32H64c-23 0-32 17-32 32v320c0 24 17 32 32 32zm224-192V128h160v128H288zM64 128h160v128H64V128zm384 288H288V288h160v128zM64 288h160v128H64V288z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/sub-content";
export { pathData, ltr, accData };