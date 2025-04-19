import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "expand-all";
const pathData = "M145 392l33-33c5-5 11-8 18-8 23 0 34 28 18 44l-77 77c-5 5-11 8-18 8s-13-3-18-8l-77-77c-16-16-5-44 18-44 7 0 13 3 18 8l33 33V94c0-15 11-26 26-26s26 11 26 26v298zm325-273H290c-15 0-26-10-26-25s11-26 26-26h180c15 0 26 11 26 26s-11 25-26 25zm-180 65h180c15 0 26 11 26 26s-11 25-26 25H290c-15 0-26-10-26-25s11-26 26-26zm0 129h180c15 0 26 10 26 25s-11 26-26 26H290c-15 0-26-11-26-26s11-25 26-25zm0 115h180c15 0 26 11 26 26s-11 26-26 26H290c-15 0-26-11-26-26s11-26 26-26z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/expand-all";
export { pathData, ltr, accData };