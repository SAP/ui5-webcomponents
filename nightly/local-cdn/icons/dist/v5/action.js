import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "action";
const pathData = "M504 109q8 8 8 19t-8 19L395 249q-7 7-17 7-11 0-18.5-7.5T352 230q0-10 8-18l69-65h-52q-21 0-39.5 8T305 177t-22 33-8 40v76q0 11-7 18.5t-18 7.5-18.5-7.5T224 326v-76q0-32 12-60t32.5-49 48.5-33 60-12h38l-55-52q-8-8-8-18 0-11 7.5-18.5T378 0q10 0 17 7zm-50 194q11 0 18.5 7t7.5 18v62q0 38-26 64t-64 26H90q-38 0-64-26T0 390V90q0-38 26-64T90 0h137q11 0 18.5 7.5T253 26t-7.5 18-18.5 7H90q-17 0-28 11T51 90v300q0 17 11 28t28 11h300q17 0 28-11t11-28v-62q0-11 7-18t18-7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/action";
export { pathData, ltr, accData };