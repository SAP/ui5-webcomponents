import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "soccer";
const pathData = "M201.5 258l18 90-73 37-74-55 37-92zm146-185l55 55-38 75-90-20V93zm-91-72q53 0 99.5 20.5t81 55 54.5 81 20 100.5q0 53-20 99T437 437.5 356 492t-99.5 20q-54 0-100.5-20t-81.5-54.5T20 357 .5 258q0-54 19.5-100.5t54.5-81 81.5-55T256.5 1zm201 374q16-27 26-57t10-60l-31-111q-34-55-88.5-92T257.5 18q-47 0-93 23v32l-73 75h-42q-14 25-23 53t-9 57 9.5 58 25 55 37.5 48.5 48 38.5h9l110 37q34 0 66.5-12t61.5-32l-37-11-18-55 73-74 55 37v27z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/soccer";
export { pathData, ltr, accData };