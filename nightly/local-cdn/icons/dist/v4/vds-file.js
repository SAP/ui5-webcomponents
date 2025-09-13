import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "vds-file";
const pathData = "M0 128L128 0h224q13 0 22.5 9t9.5 23v64h-32V32H160v96q0 14-9.5 23t-23.5 9H32v320h320v-64h32v64q0 14-9 23t-23 9H32q-14 0-23-9t-9-23V128zm357 224q-49 0-89.5-27T204 256q26-48 66-71t82-25q51 0 93 25t67 70q-23 42-57 65t-71 29q-13 3-26 3h-1zm-115-96q20 29 49 45.5t61 18.5q77 0 122-65-22-32-53-47.5T352 192q-26 2-56.5 16.5T242 256zm110-45q21 0 36 11t15 34-15.5 33.5T352 300q-17-2-28-14.5T313 256t11-30 28-15z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/vds-file";
export { pathData, ltr, accData };