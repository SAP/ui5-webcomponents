import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bar-chart";
const pathData = "M424 32h48q8 0 8 8v432q0 8-8 8h-48q-8 0-8-8V40q0-8 8-8zM168 160h48q8 0 8 8v304q0 8-8 8h-48q-8 0-8-8V168q0-8 8-8zm120 72q0-8 8-8h48q8 0 8 8v240q0 8-8 8h-48q-8 0-8-8V232zM32 472V360q0-8 8-8h48q8 0 8 8v112q0 8-8 8H40q-8 0-8-8z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/bar-chart";
export { pathData, ltr, accData };