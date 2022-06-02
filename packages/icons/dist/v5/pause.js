import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pause";
const pathData = "M230.5 179q0-25-25-25-26 0-26 25v154q0 25 26 25 25 0 25-25V179zm102 0q0-25-25-25-26 0-26 25v154q0 25 26 25 25 0 25-25V179zm-76-178q53 0 99 20t81 54.5 55 81 20 99.5-20 99.5-55 81.5-81 55-99 20-99.5-20-81.5-55-55-81.5T.5 256t20-99.5 55-81T157 21t99.5-20zm0 459q42 0 79-16t65-44 44-65 16-79-16-79-44-65-65-44-79-16T177 68t-65.5 44-44 65-16 79 16 79 44 65 65.5 44 79.5 16zm-51-306q-26 0-26 25v154q0 25 26 25 25 0 25-25V179q0-25-25-25zm102 0q-26 0-26 25v154q0 25 26 25 25 0 25-25V179q0-25-25-25z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "pause";
export { pathData, ltr, accData };