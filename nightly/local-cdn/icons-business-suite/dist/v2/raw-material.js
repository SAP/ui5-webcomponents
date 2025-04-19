import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "raw-material";
const pathData = "M65.5 400V81c0-53 95-81 190-81 92 0 188 27 191 78v324c-3 51-99 78-191 78-95 0-190-28-190-80zm38-270v61c0 12 52 42 152 42s154-30 154-42v-61c-36 20-95 31-154 31-57 0-116-11-152-31zm0 270c0 12 52 42 152 42s154-30 154-42v-55c-36 20-95 30-154 30-57 0-116-10-152-30v55zm0-105c0 13 52 43 152 43s154-31 154-43v-54c-36 21-95 30-154 30-57 0-116-9-152-30v54zm0-214c0 12 52 43 152 43s154-31 154-43c0-8-22-23-65-34 3 7 2 11 2 16 0 20-16 36-36 36s-37-16-37-36c0-9 4-17 9-24-8 0-16-1-27-1-100 0-152 31-152 43z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/raw-material";
export { pathData, ltr, accData };