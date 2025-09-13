import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "high-priority";
const pathData = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm-32 288q0 14 9 23t23 9 23-9 9-23V128q0-14-9-23t-23-9-23 9-9 23v160zm32 128q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/high-priority";
export { pathData, ltr, accData };