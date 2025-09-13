import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sales-document";
const pathData = "M422 0q11 0 18.5 7.5T448 26v109q0 11-7.5 18.5T422 161t-18-7.5-7-18.5V51H244l-20 23v67q0 21-15 36t-36 15h-50l-8 9v260h84q11 0 18.5 7t7.5 18-7.5 18.5T199 512H90q-11 0-18.5-7.5T64 486V192q0-10 6-17L213 9q6-9 19-9h190zm-54 327q-2 0-5 2.5t-3 6.5 3 6.5 5 2.5h22q24 0 41 18t17 42q0 20-12.5 37.5T403 465v21q0 11-7 18.5t-18 7.5-18.5-7.5T352 486v-19h-17q-11 0-18.5-7.5T309 441t7.5-18 18.5-7h55q7 0 7-11 0-9-7-9h-22q-24 0-41.5-17.5T309 336q0-20 12.5-36.5T352 278v-22q0-11 7.5-18.5T378 230t18 7.5 7 18.5v20h19q11 0 18.5 7.5T448 302t-7.5 18-18.5 7h-54z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/sales-document";
export { pathData, ltr, accData };