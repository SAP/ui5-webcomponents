import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "manual-task";
const pathData = "M499 279v11c0 123-84 222-188 222-61 0-115-34-149-88-3-1-5-3-7-6l-99-99c-23-23-23-59 0-82 11-11 26-17 41-17 14 0 29 6 40 17l15 15V109c0-32 26-58 58-58 7 0 13 2 19 5 2-31 27-56 58-56 30 0 56 25 57 56 6-3 13-5 20-5 30 0 56 25 57 56 6-3 12-4 19-4 33 0 59 26 59 57v119zm-41 21c1-3 1-6 1-10 0-2 0-6-1-9V153c-3-7-9-11-18-11-10 0-18 8-18 18v91h-39V109c0-10-9-19-19-19-11 0-20 9-20 19v142h-38V58c0-11-9-19-19-19-11 0-20 8-20 19v193h-38V109c0-10-9-19-19-19-11 0-20 9-20 19v236l-80-80c-4-4-9-6-14-6-4 0-9 1-14 6-7 7-7 20 0 27l98 96 9 10v-1l37 41c24 22 53 35 85 35 78 0 142-75 147-169v-4z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/manual-task";
export { pathData, ltr, accData };