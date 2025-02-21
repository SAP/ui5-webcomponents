import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "energy-saving-lightbulb";
const pathData = "M369 310q15 7 15 23 0 15-15 23l-37 18v80q0 24-16.5 41T275 512h-39q-23 0-40-17t-17-41v-80l-37-18q-14-8-14-23 0-11 7-18.5t18-7.5q6 0 12 3l51 26q14 6 14 22v26h51v-26q0-15 14-22l6-3-159-80q-14-6-14-23 0-10 7-17.5t18-7.5q6 0 12 3zM142 48q-14-6-14-22 0-11 7-18.5T153 0q6 0 12 3l205 103q14 7 14 22 0 11-7.5 18.5T358 154q-6 0-11-3zm0 103q-14-8-14-23 0-11 7-18.5t18-7.5q6 0 12 3l204 103q15 7 15 22 0 11-7.5 18.5T358 256q-6 0-11-3zm133 310q6 0 6-7v-19h-51v19q0 7 6 7h39z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/energy-saving-lightbulb";
export { pathData, ltr, accData };