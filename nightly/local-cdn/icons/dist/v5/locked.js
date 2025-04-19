import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "locked";
const pathData = "M384 224q26 4 45 25t19 48v142q0 30-21.5 51.5T375 512H137q-30 0-51.5-21.5T64 439V297q0-29 18-50t46-23v-96q0-27 10-50t27.5-40.5 41-27.5T256 0q27 0 50 10t40.5 27.5T374 78t10 50v96zM256 51q-32 0-54.5 22.5T179 128v96h154v-96q0-32-22.5-54.5T256 51zm141 246q0-9-6.5-15.5T375 275H137q-22 0-22 22v142q0 9 6.5 15.5T137 461h238q9 0 15.5-6.5T397 439V297zm-141 23q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/locked";
export { pathData, ltr, accData };