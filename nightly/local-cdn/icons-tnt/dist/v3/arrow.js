import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow";
const pathData = "M448 64l-1 225v3c0 16-12 28-28 28h-6c-16 0-29-13-29-32l1-147-263 263c-6 6-13 9-22 9s-17-3-23-9c-7-7-10-14-10-22 0 0-2-11 10-23L340 96l-148 1c-17 0-32-15-32-32 0-19 14-33 33-33h223c17 0 32 15 32 32z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/arrow";
export { pathData, ltr, accData };