import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "compare";
const pathData = "M40 288L87 96h-5q-16 0-16-16t16-16h112q0-26 18.5-45T258 0q26 0 45 19t19 45h112q6 0 11 4.5t5 11.5-5 11.5-11 4.5h-7l47 192h4q-5 28-27 46t-51 18-51-18-27-46h4l47-192h-60q-9 15-23 23v361h112q6 0 11 4.5t5 11.5-5 11.5-11 4.5H114q-16 0-16-16t16-16h112V119q-16-7-24-23h-62l48 192h4q-6 28-27.5 46T114 352t-51-18-28-46h5zm16 0h115L124 96h-21zm287 0h114L410 96h-20zM226 64q0 14 9 23t23 9q13 0 22.5-9t9.5-23-9.5-23-22.5-9q-14 0-23 9t-9 23z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/compare";
export { pathData, ltr, accData };