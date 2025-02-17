import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-color";
const pathData = "M422 429q11 0 18.5 7t7.5 18-7.5 18.5T422 480H90q-11 0-18.5-7.5T64 454t7.5-18 18.5-7h332zm-300-45q-11 0-18.5-7.5T96 358q0-4 2-10L233 47q7-15 23-15t23 15l135 301q2 6 2 10 0 11-7.5 18.5T390 384q-16 0-23-15l-28-62H173l-28 62q-7 15-23 15zm73-128h122l-61-136z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/text-color";
export { pathData, ltr, accData };