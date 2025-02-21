import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "write-new";
const pathData = "M162 265L423 5q5-5 11-5t11 5l46 45q6 5 6 11t-6 12L230 333q-1 1-17 6t-36 10q-22 7-51 15 2-5 7.5-20.5t11.5-33 11-31 6-14.5zM15 448V64q0-13 9.5-22.5T47 32h128v32H47v384h384V320h32v128q0 14-9 23t-23 9H47q-13 0-22.5-9T15 448zm198-143l180-180-22-23-182 181v1q0 2 2 5.5t6.5 7.5 8.5 6 6 2h1zm203-203l41-41-23-22-41 40z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/write-new";
export { pathData, ltr, accData };