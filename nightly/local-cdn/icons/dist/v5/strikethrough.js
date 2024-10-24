import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "strikethrough";
const pathData = "M454 237q11 0 18.5 7t7.5 18-7.5 18.5T454 288h-78q11 15 17 32t6 35q0 28-12.5 51T354 445.5 308.5 471t-51.5 9-51.5-9-45.5-25.5-32-39.5-12-51q0-11 7-18t18-7 18.5 8 7.5 22q0 13 7 25.5t19.5 22 29 15.5 34.5 6q37 0 63.5-22t26.5-52q0-21-14.5-39.5T293 288H58q-11 0-18.5-7.5T32 262t7.5-18 18.5-7h396zm-307-40q-9 0-15-6t-9.5-14-5-17.5T116 143q0-23 11-43.5T157 64t44.5-23.5T257 32t55.5 8.5 45 22.5T388 95.5t11 38.5q0 17-7.5 25.5T373 168t-18.5-7.5T347 140q0-23-26-40t-64-17-64 17.5-26 42.5q0 5 1 9.5t3 10.5q2 4 2 8 0 11-7.5 18.5T147 197z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/strikethrough";
export { pathData, ltr, accData };