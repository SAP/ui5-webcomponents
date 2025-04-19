import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "timeseries-waterfall-chart";
const pathData = "M399.5 192c-53 0-95-42-95-95 0-52 42-96 95-96 52 0 96 44 96 96 0 53-44 95-96 95zM88.5 25v336c0 13-9 23-24 23-13 0-24-10-24-23V25c0-13 11-24 24-24 15 0 24 11 24 24zm119 0v167c0 15-9 24-24 24-13 0-24-9-24-24V25c0-13 11-24 24-24 15 0 24 11 24 24zm192 72V49c-27 0-47 21-47 48s20 47 47 47 48-20 48-47h-48zm-107 229v-95c0-13 9-24 24-24 13 0 24 11 24 24v95c0 15-11 24-24 24-15 0-24-9-24-24zm179-61v95c0 13-11 24-24 24-15 0-24-11-24-24v-95c0-15 9-24 24-24 13 0 24 9 24 24zm0 215h-431c-13 0-24-11-24-24s11-24 24-24h431c13 0 24 11 24 24s-11 24-24 24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/timeseries-waterfall-chart";
export { pathData, ltr, accData };