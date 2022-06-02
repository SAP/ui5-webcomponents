import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "media-play";
const pathData = "M425.5 226q8 5 13.5 13.5t5.5 16.5-5.5 16.5-13.5 13.5l-301 188q-9 6-19 6-11 0-20-6-8-5-13-13.5t-5-19.5V64q0-6 5-13.5t13-12.5q9-6 20-6 10 0 19 6zm-91 34l-192-121v241z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "media-play";
export { pathData, ltr, accData };