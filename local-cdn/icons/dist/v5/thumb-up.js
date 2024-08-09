import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "thumb-up";
const pathData = "M58 512q-24 0-41-17T0 454V250q0-24 17-41t41-17h90l67-175q5-17 30-17 15 0 28.5 6.5t24 17.5T314 50t6 32v78h102q38 0 64 26t26 63q0 5-.5 10.5T510 270l-41 173q-8 31-32 50t-55 19H58zm89-269v218h235q13 0 23.5-8t13.5-22l41-173q1-3 1-8 0-16-11.5-27.5T422 211H295q-11 0-18.5-7t-7.5-18V82q0-17-14-26l-65 171q-6 16-24 16h-19zM51 454q0 7 7 7h38V243H58q-7 0-7 7v204z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/thumb-up";
export { pathData, ltr, accData };