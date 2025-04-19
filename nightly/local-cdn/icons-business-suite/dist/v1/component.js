import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "component";
const pathData = "M448 64c35 0 64 29 64 64s-29 64-64 64c-15 0-29-5-42-15l-59 36c3 9 5 18 5 27 0 39-28 71-65 78v71c23 11 38 32 38 59 0 35-28 64-64 64-35 0-64-29-64-64 0-28 18-52 43-60v-75c-25-11-40-29-47-56l-72-4c-11 21-33 35-57 35-36 0-64-29-64-64s28-64 64-64c28 0 53 18 61 45l73 4c4-9 9-17 16-24l-36-60c-6 2-12 3-18 3-36 0-64-29-64-64s28-64 64-64c35 0 64 29 64 64 0 15-5 29-14 40l36 60c7-3 16-4 26-4 20 0 38 7 53 20l61-37c-1-3-2-8-2-15 0-35 28-64 64-64z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/component";
export { pathData, ltr, accData };