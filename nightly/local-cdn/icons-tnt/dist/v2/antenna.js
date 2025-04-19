import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "antenna";
const pathData = "M416 0q32 58 32 124 0 53-20.5 100.5t-56 83-82.5 56T188 384q-32 0-63.5-7.5T64 353zM120 342q31 10 68 10 47 0 88-18t72.5-48.5 49.5-72 18-88.5q0-36-10-69zm0-246q0-16 11-27.5T157 57h3q17 0 28 12t12 29v2q0 5-3 11l32 32-22 23-33-33q-6 3-14 3-17 0-28.5-11.5T120 96zM32 512v-32h208v-68q8-2 17-4t15-5v77h136l-82-99q8-4 14.5-8t13.5-9l94 116h32v32H32z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/antenna";
export { pathData, ltr, accData };