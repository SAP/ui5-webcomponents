import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "status-terminating";
const pathData = "M216 350q0 27 8 52.5t25 45.5H23q-7 0-11-5t-4-11q0-3 2-9L234 8q5-8 14-8 8 0 13 8l100 185q-31 4-57.5 17t-46 33.5T227 291t-11 59zm159-126q26 0 49.5 10t41 27 28 40 10.5 50q0 26-10 49.5t-27 41-40.5 28T377 480t-49.5-10-41-27.5-28-41T248 351q0-26 10-49.5t27-40.5 40-27 50-10zm1 224q40 0 68-27.5t28-68.5q0-20-7.5-37t-20-30.5-30-21T376 256q-40 0-68 27.5T280 352t27.5 68.5T376 448zm48-96q16 0 16 16t-16 16h-64v-80q0-16 16-16t16 16v48h32z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/status-terminating";
export { pathData, ltr, accData };