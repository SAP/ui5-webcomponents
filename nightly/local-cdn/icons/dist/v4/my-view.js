import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "my-view";
const pathData = "M32 32h448q14 0 23 9.5t9 22.5v320q0 14-9 23t-23 9H32q-14 0-23-9t-9-23V64q0-13 9-22.5T32 32zm0 32v320h96q0-54 25-74.5t71-21.5h64q48 0 72 21t24 75h96V64H32zm128 128q0-40 28-68t68-28 68 28 28 68-28 68-68 28-68-28-28-68zm32 0q0 27 19 45.5t45 18.5 45-18.5 19-45.5q0-26-19-45t-45-19-45 19-19 45zm160 192q0-24-5.5-37T332 328t-20.5-7-23.5-1h-64q-11 0-22.5 1t-20.5 7-15 19-6 37h192zm-208 64h224q16 0 16 16 0 6-4.5 11t-11.5 5H144q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/my-view";
export { pathData, ltr, accData };