import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "composition";
const pathData = "M198 512H59q-24 0-40.5-16.5T2 455V316q0-24 16.5-40.5T59 259h139q2 0 4.5.5t4.5.5L416 51h-89q-10 0-17.5-7.5T302 25t7.5-18T327 0h158q11 0 18 7t7 18v157q0 11-7 18t-18 7-18.5-7-7.5-18V79L248 290q3 6 5 12t2 14v139q0 24-16.5 40.5T198 512z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/composition";
export { pathData, ltr, accData };