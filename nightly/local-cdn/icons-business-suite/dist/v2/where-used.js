import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "where-used";
const pathData = "M18.125 311V167c0-15 11-24 24-24h145c13 0 22 9 22 24v144c0 15-9 24-22 24h-145c-13 0-24-9-24-24zm316-49c-15 0-24-9-24-24s8-23 24-23h79l-31-32c-10-11-10-23 0-34 5-5 10-7 16-7s13 2 18 7l71 73c9 9 9 24 0 33l-71 72c-5 5-12 8-18 8s-11-3-16-8c-9-9-9-24 0-33l31-32h-79zm-133 194c0-13 11-23 24-23h45l-57-56c-10-11-10-23 0-34 6-5 11-8 17-8s12 3 17 8l56 55v-42c0-15 11-25 24-25 15 0 23 10 23 25v100c0 13-8 24-23 24h-102c-13 0-24-11-24-24zm0-431c0-15 11-24 24-24h102c15 0 23 9 23 24v100c0 15-8 24-23 24-13 0-24-9-24-24V82l-56 55c-5 5-11 8-17 8s-11-3-17-8c-11-11-11-22 0-33l57-56h-45c-13 0-24-10-24-23zm-135 262h97v-96h-97v96z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/where-used";
export { pathData, ltr, accData };