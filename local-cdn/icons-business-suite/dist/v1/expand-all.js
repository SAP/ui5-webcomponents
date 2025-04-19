import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "expand-all";
const pathData = "M145 392l33-33c10-10 26-10 36 0 11 10 11 26 0 36l-77 77c-5 5-11 8-18 8s-13-3-18-8l-77-77c-11-10-11-26 0-36 10-10 26-10 36 0l33 33V94c0-14 12-26 26-26s26 12 26 26v298zm145-79h180c14 0 26 11 26 25 0 15-12 26-26 26H290c-15 0-26-11-26-26 0-14 11-25 26-25zm180-194H290c-15 0-26-11-26-25s11-26 26-26h180c14 0 26 12 26 26s-12 25-26 25zm-180 65h180c14 0 26 11 26 26 0 14-12 25-26 25H290c-15 0-26-11-26-25 0-15 11-26 26-26zm0 244h180c14 0 26 12 26 26s-12 26-26 26H290c-15 0-26-12-26-26s11-26 26-26z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/expand-all";
export { pathData, ltr, accData };