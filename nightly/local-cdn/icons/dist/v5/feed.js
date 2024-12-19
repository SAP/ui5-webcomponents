import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "feed";
const pathData = "M80 352q33 0 56.5 23.5T160 432t-23.5 56.5T80 512t-56.5-23.5T0 432t23.5-56.5T80 352zM86 0q89 0 166.5 34T388 126t91 135.5T512 426v28q0 11-7.5 18.5T486 480t-18-7.5-7-18.5v-28q0-78-29.5-146T351 161 232 80.5 86 51H58q-11 0-18.5-7T32 26t7.5-18.5T58 0h28zm0 192q47 0 90 17t76 48.5 51.5 76T320 433l-1 20q0 13-8 20.5t-18 6.5h-2q-10-1-17-8.5t-6-19.5l1-19v-7q0-37-14.5-70t-39-58-57.5-40-70-15h-7l-21 1q-12 1-19.5-5.5T32 222v-3q-1-16 15-21.5t39-5.5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/feed";
export { pathData, ltr, accData };