import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "retail-store";
const pathData = "M89 51q-11 0-18-7t-7-18 7-18.5T89 0h333q11 0 18.5 7.5T448 26t-7.5 18-18.5 7H89zm421 233q2 6 2 8 0 12-8 18l-17 17q-8 9-18 14.5t-21 8.5v136q0 11-7.5 18.5T422 512t-18-7.5-7-18.5V345q-15-6-26-17-21 21-51 24v134q0 11-7.5 18.5T294 512H89q-11 0-18-7.5T64 486V350q-24-6-39-23L7 310q-7-6-7-18 0-5 1-8l58-171q5-17 24-17h346q17 0 24 17zm-53 1l-47-138H101L55 285l6 6q9 10 22 10t22-10l18-17q7-7 18-7t18 7l17 17q9 10 22 10t23-10l17-17q7-7 18-7t18 7l17 17q10 10 22 10 13 0 23-10l17-17q7-7 18-7t18 7l17 17q10 10 23 10 12 0 22-10zM269 461V338q-7-5-13-10-24 24-58 24-33 0-57-24-10 10-26 17v116h154z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/retail-store";
export { pathData, ltr, accData };