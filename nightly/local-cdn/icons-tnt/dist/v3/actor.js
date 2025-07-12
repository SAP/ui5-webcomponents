import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "actor";
const pathData = "M298.25 120c-33 0-59-27-59-60 0-32 26-60 59-60s60 28 60 60c0 33-27 60-60 60zm164-71c10 10 10 27 0 37l-98 97v303c0 14-11 26-26 26s-27-12-27-26V353h-26v133c0 14-12 26-27 26-14 0-26-12-26-26V183l-98-97c-10-9-9-27 0-37 6-6 13-8 19-8 7 0 14 2 19 8l92 91h69l92-91c5-6 12-8 18-8 7 0 14 2 19 8z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/actor";
export { pathData, ltr, accData };