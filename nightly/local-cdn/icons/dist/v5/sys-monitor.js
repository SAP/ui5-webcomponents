import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sys-monitor";
const pathData = "M422 0q38 0 64 26t26 64v204q0 38-26 64t-64 26H320v77h70q11 0 18.5 7t7.5 18-7.5 18.5T390 512H121q-11 0-18-7.5T96 486t7-18 18-7h71v-77H90q-38 0-64-26T0 294V90q0-38 26-64T90 0h332zm39 90q0-17-11-28t-28-11H90q-17 0-28 11T51 90v204q0 17 11 28t28 11h332q17 0 28-11t11-28V90zM269 384h-26v77h26v-77z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/sys-monitor";
export { pathData, ltr, accData };