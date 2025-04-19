import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "lateness";
const pathData = "M301 256q22 16 43 35.5t37 46.5 25.5 63 9.5 85q0 11-7.5 18.5T390 512H122q-11 0-18.5-7.5T96 486q0-49 9.5-85t25.5-63 37-46.5 43-35.5q-22-16-43-35.5T131 174t-25.5-63T96 26q0-11 7.5-18.5T122 0h268q11 0 18.5 7.5T416 26q0 49-9.5 85T381 174t-37 46.5-43 35.5zM148 51q3 37 12.5 63.5T184 161t32.5 35 39.5 29q21-14 39.5-29t32.5-35 23.5-46.5T364 51H148zm108 236q-29 19-52.5 40.5T165 384h182q-15-35-38.5-56.5T256 287z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/lateness";
export { pathData, ltr, accData };