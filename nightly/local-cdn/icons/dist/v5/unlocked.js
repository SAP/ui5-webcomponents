import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "unlocked";
const pathData = "M384 0q27 0 50 10t40.5 27.5T502 78t10 50v6q0 11-7.5 18.5T486 160t-18-7.5-7-18.5v-6q0-32-22.5-54.5T384 51t-54.5 22.5T307 128v96h4q30 0 51.5 21.5T384 297v142q0 30-21.5 51.5T311 512H73q-30 0-51.5-21.5T0 439V297q0-30 21.5-51.5T73 224h183v-96q0-27 10-50t27.5-40.5T334 10t50-10zm-51 297q0-9-6.5-15.5T311 275H73q-9 0-15.5 6.5T51 297v142q0 9 6.5 15.5T73 461h238q9 0 15.5-6.5T333 439V297zM192 416q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/unlocked";
export { pathData, ltr, accData };