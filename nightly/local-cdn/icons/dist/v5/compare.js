import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "compare";
const pathData = "M486 461q11 0 18.5 7t7.5 18-7.5 18.5T486 512H26q-11 0-18.5-7.5T0 486t7.5-18 18.5-7h205V122q-25-11-35-39h-58v32l26 64q10 24 15.5 41t8.5 28 4 17.5 1 11.5q0 31-23.5 53T113 352t-56.5-22T33 277q0-9 5-29t24-69l25-61V58q0-11 7.5-18.5T113 32h89q8-14 22.5-23T257 0t32.5 9T312 32h88q11 0 18.5 7.5T426 58v59l25 62q10 24 15.5 41t8.5 28 4 17.5 1 11.5q0 31-23.5 53T400 352t-56.5-22-23.5-53q0-9 5-29t24-69l26-64V83h-57q-9 27-36 40v338h204zM137 256l-24-68-24 68h48zm287 0l-24-68-24 68h48z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/compare";
export { pathData, ltr, accData };