import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "walk-me";
const pathData = "M496 160q16 0 16 16v128q0 16-16 16t-16-16V204L229 451q-14 14-32.5 21.5T158 480q-21 0-39-8t-31.5-21.5T66 419t-8-39q0-20 7.5-38T87 310l132-130q20-20 20-48 0-29-20-48.5T170 64q-28 0-48 20l-34 33q8 13 8 27 0 20-14 34t-34 14-34-14-14-34 14-34 34-14q6 0 14 2l37-37q31-29 71-29 21 0 39 7.5t32 21 22 32 8 39.5q0 20-7.5 38T242 202L110 332q-20 20-20 48 0 29 20 48.5t48 19.5q29 0 49-20l239-236h-78q-16 0-16-16t16-16h128z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/walk-me";
export { pathData, ltr, accData };