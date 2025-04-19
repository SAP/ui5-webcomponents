import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "validate";
const pathData = "M445 52q19 5 19 25v179q0 43-16.5 82T404 410t-61 57.5-69 39.5q-14 5-18 5t-17-5q-35-15-69-39.5T109 410t-44-72-17-82V77q0-20 19-25L249 1q2-1 7-1t7 1zm-32 44L256 52 99 96v160q0 35 13.5 65.5t36 56 50.5 46 57 34.5q29-14 57-34.5t50.5-46 36-56T413 256V96zM227 287l96-118q8-9 19-9t18.5 7.5T368 186q0 8-6 16L247 343q-7 9-20 9-11 0-19-9l-58-66q-6-8-6-17 0-11 7.5-18.5T170 234q12 0 19 9z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/validate";
export { pathData, ltr, accData };