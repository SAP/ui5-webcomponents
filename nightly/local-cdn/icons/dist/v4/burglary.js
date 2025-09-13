import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "burglary";
const pathData = "M365.5 95v114l145 81-125 222-162-91H2.5V95h363zm-326 72v54h36v73h-36v54h36v37h92l15-28-32-17 26-48 33 17 36-63-33-18 27-47 32 17 17-31 40 22v-58h-253v36h-36zm300 232q18 0 29.5-9.5t21.5-21.5q7-10 7-30 0-23-15.5-40.5T337.5 280q-22 0-40.5 16.5T278.5 341q0 23 17.5 40.5t43.5 17.5zm-2-100q14 0 21 4 20 14 20 35 0 18-11.5 29.5T339.5 379q-20 0-30.5-12t-10.5-29q0-19 11.5-29t27.5-10z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/burglary";
export { pathData, ltr, accData };