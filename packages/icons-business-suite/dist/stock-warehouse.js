import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "stock-warehouse";
const pathData = "M465.5 147q14 9 14 26v338h-32V192h-382v319h-33V173q0-16 14-26l191-140q9-6 19-6 11 0 18 6zm-145-51h-128v32h128V96zm-160 223h-64v-64h64v64zm0 96h-64v-64h64v64zm96 0h-64v-64h64v64zm-96 96h-64v-64h64v64zm96 0h-64v-64h64v64zm95 0h-64v-64h64v64z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "stock-warehouse";
export { pathData, ltr, accData };