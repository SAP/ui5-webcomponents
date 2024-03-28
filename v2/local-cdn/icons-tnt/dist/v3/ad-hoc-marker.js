import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ad-hoc-marker";
const pathData = "M459 183h42c7 0 10 3 10 9v4c0 105-57 142-117 142-43 0-78-12-149-45-48-23-85-45-124-45-35 0-56 22-60 78-1 6-5 9-10 9H11c-7 0-10-3-10-10v-1c0-96 52-144 120-144 46 0 75 14 145 46 51 25 90 44 129 44 35 0 52-27 55-78 0-6 3-9 9-9z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/ad-hoc-marker";
export { pathData, ltr, accData };