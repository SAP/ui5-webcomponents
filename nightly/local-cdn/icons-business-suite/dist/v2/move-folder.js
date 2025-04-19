import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "move-folder";
const pathData = "M0 93c0-44 33-77 77-77h127c7 0 13 3 18 8l44 43h169c44 0 77 33 77 77 0 15-11 26-26 26s-25-11-25-26c0-17-9-26-26-26H256c-7 0-13-2-18-7l-44-44H77c-17 0-26 9-26 26v294c0 17 9 26 26 26h51c17 0 25 9 25 26s-8 25-25 25H77c-44 0-77-33-77-77V93zm308 263c-17 0-26-9-26-26 0-7 2-13 7-18 6-5 12-7 19-7h117l-33-34c-5-5-8-11-8-18 0-5 3-10 8-17 5-5 11-8 18-8s13 3 18 8l77 76c5 5 7 11 7 18 0 8-2 14-7 18l-77 77c-5 5-11 7-18 7s-13-2-18-7c-5-7-8-13-8-18s3-11 8-18l33-33H308z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/move-folder";
export { pathData, ltr, accData };