import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "horizontal-bar-chart";
const pathData = "M487 461q26 0 26 25 0 26-26 26H26q-25 0-25-26V26Q1 0 26 0q26 0 26 26v435h435zM129 307q-11 0-18.5-7t-7.5-18q0-12 7.5-19t18.5-7h179q11 0 18.5 7t7.5 19q0 11-7.5 18t-18.5 7H129zm0-205q-11 0-18.5-7T103 77q0-12 7.5-19t18.5-7h179q11 0 18.5 7t7.5 19q0 11-7.5 18t-18.5 7H129zm0 103q-11 0-18.5-7t-7.5-19q0-11 7.5-18t18.5-7h77q25 0 25 25 0 26-25 26h-77zm0 205q-11 0-18.5-7.5T103 384t7.5-18.5T129 358h256q11 0 18 7.5t7 18.5-7 18.5-18 7.5H129z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "horizontal-bar-chart";
export { pathData, ltr, accData };