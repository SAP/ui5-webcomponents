import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-formatting";
const pathData = "M486 429q11 0 18.5 7t7.5 18-7.5 18.5T486 480h-44q-38 0-64-26t-26-64V192h-38q-11 0-18.5-7.5T288 166t7.5-18 18.5-7h38V58q0-11 7.5-18.5T378 32t18 7.5 7 18.5v83h51q11 0 18.5 7t7.5 18-7.5 18.5T454 192h-51v198q0 17 11 28t28 11h44zM262 32q11 0 18.5 7.5T288 58t-7.5 18-18.5 7h-92v371q0 11-7.5 18.5T144 480t-18.5-7.5T118 454V83H26q-11 0-18.5-7T0 58t7.5-18.5T26 32h236z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/text-formatting";
export { pathData, ltr, accData };