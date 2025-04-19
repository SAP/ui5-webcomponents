import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "empty-warning";
const pathData = "M249 352L87 189 249 28l162 161zM122 189l127 127 126-127L249 63zm117 10l-9-69c0-7 2-12 6-15 3-3 8-5 13-5 13 0 20 7 20 20l-10 69-3 9c-1 1-4 1-7 1-8 0-9-3-10-10zm-9 48c0-7 2-11 6-14 5-3 9-5 13-5s9 2 14 5c4 3 6 7 6 14s-2 12-6 15c-5 3-10 5-14 5s-8-2-13-5c-4-3-6-8-6-15zM128 347v127H1V347h127zm383 0v127H383V347h128z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/empty-warning";
export { pathData, ltr, accData };