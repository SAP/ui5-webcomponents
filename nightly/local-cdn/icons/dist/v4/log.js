import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "log";
const pathData = "M352 86q57 27 92.5 81T480 288q0 47-17.5 87.5t-48 71-71.5 48-87 17.5q-47 0-87.5-17.5t-71-48-48-71T32 288q0-67 35.5-121T160 86v36q-43 25-69.5 68.5T64 288q0 40 15 75t41 61 61 41 75 15 75-15 61-41 41-61 15-75q0-54-26.5-97.5T352 122V86zm-96 202q-14 0-23-9t-9-23V32q0-13 9-22.5T256 0q13 0 22.5 9.5T288 32v224q0 14-9.5 23t-22.5 9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/log";
export { pathData, ltr, accData };