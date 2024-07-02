import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "quantity-kind";
const pathData = "M187 206h-50v60h50q11 0 18.5 7t7.5 18-7.5 18.5T187 317h-50v55h50q11 0 18.5 7t7.5 18-7.5 18.5T187 423h-50v37h324V51H87l42 42q1 0 3 2 5 7 5 16v44h50q11 0 18.5 7t7.5 18-7.5 18.5T187 206zM86 122L14 50q-1-1-1.5-2T11 46Q0 40 0 26 0 15 7.5 7.5T26 0h461q11 0 18 7.5t7 18.5v460q0 12-8 18.5t-19 6.5H113q-11 0-18-6.5T87 489q-1-3-1-7V122z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/quantity-kind";
export { pathData, ltr, accData };