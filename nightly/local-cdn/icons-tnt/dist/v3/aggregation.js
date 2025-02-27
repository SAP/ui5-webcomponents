import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "aggregation";
const pathData = "M486 209c-14 0-25-12-25-26V78L250 289c3 7 4 14 4 22v141c0 32-25 57-56 57H57c-32 0-57-25-57-57V311c0-32 25-57 57-57h141c5 0 9 1 14 2L418 50h-90c-14 0-25-11-25-25s11-25 25-25h158c15 0 26 11 26 25v158c0 14-11 26-26 26zm-288 96H57c-4 0-6 3-6 6v141c0 4 2 6 6 6h141c4 0 6-2 6-6V311c0-3-2-6-6-6z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/aggregation";
export { pathData, ltr, accData };