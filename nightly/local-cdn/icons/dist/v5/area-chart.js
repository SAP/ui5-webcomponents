import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "area-chart";
const pathData = "M512 486q0 11-7.5 18.5T486 512H26q-11 0-18.5-7.5T0 486V26Q0 15 7.5 7.5T26 0t18 7.5T51 26v269l107-156q8-11 21-11 4 0 5 1l140 29L468 8q8-8 18-8 11 0 18.5 7.5T512 26v460zm-384-25l111-103q7-7 17-7 4 0 6 1l90 32 109-66v-44l-78 43q-4 3-9 3H207L89 461h39zm78 0h255v-83l-92 56q-4 3-13 3-4 0-6-1l-87-31zM51 385v41l127-150q6-7 15-7h170l98-54V89L351 203q-8 8-18 8h-6l-136-29z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/area-chart";
export { pathData, ltr, accData };