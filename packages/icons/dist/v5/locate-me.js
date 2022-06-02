import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "locate-me";
const pathData = "M503.045 9q14 14 6 31l-179 454q-8 17-26 17-8 0-15.5-4t-9.5-13l-74-187-187-74q-9-2-13-9.5t-4-16.5q0-8 4-15.5t13-9.5l454-179q17-8 31 6zm-71 71l-326 127 130 52q5 2 10 6t7 11l51 130z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "locate-me";
export { pathData, ltr, accData };