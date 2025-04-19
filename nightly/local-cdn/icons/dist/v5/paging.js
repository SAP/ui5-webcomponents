import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "paging";
const pathData = "M486 115H26q-11 0-18.5-7T0 90t7.5-18.5T26 64h460q11 0 18.5 7.5T512 90t-7.5 18-18.5 7zm0 160H26q-11 0-18.5-7T0 250t7.5-18.5T26 224h460q11 0 18.5 7.5T512 250t-7.5 18-18.5 7zm0 173H26q-11 0-18.5-7.5T0 422t7.5-18 18.5-7h460q11 0 18.5 7t7.5 18-7.5 18.5T486 448z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/paging";
export { pathData, ltr, accData };