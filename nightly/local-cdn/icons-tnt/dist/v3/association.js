import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "association";
const pathData = "M27 502c-6 0-12-2-17-7-10-10-10-26 0-36L418 50h-89c-14 0-26-11-26-25s12-25 26-25h158c13 0 24 11 24 25v157c0 14-11 26-24 26-15 0-26-12-26-26V79L45 495c-5 5-11 7-18 7z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/association";
export { pathData, ltr, accData };