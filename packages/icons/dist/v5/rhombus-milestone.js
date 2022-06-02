import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "rhombus-milestone";
const pathData = "M486.5 197q13 12 19 27.5t6 31.5q0 32-25 57l-172 172q-25 25-59 25-33 0-58-25l-172-172q-13-12-19-27.5T.5 254q0-32 25-57l172-173q27-25 60-25 32 0 57 25zm-39 77q9-8 9-19 0-12-9-19l-172-173q-10-8-19-8-10 0-20 8l-172 173q-8 7-8 19t8 19l172 173q10 8 20 8 9 0 19-8z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "rhombus-milestone";
export { pathData, ltr, accData };