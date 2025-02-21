import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "line-charts";
const pathData = "M24 320q-10 0-17-7t-7-17q0-9 5-14l154-176q8-10 20-10 11 0 20 12l87 117L471 39q7-7 17-7t17 7 7 17-7 17L298 281q-7 7-17 7h-3q-9-1-18-12l-84-112L43 310q-8 10-19 10zm0 160q-10 0-17-7t-7-17q0-12 10-19l154-112q7-5 14-5 8 0 15 5l89 69 193-134q5-4 13-4 10 0 17 7t7 17q0 13-10 20L295 444q-5 4-14 4-7 0-15-5l-88-69L38 475q-5 5-14 5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/line-charts";
export { pathData, ltr, accData };