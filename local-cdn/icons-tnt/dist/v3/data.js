import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "data";
const pathData = "M96 0h224l128 128v352c0 19-14 32-33 32H95c-19 0-31-13-31-32V32C64 13 77 0 96 0zm-1 480h321V160h-96c-19 0-32-13-32-32V32H96z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/data";
export { pathData, ltr, accData };