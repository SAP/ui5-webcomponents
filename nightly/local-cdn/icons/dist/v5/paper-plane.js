import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "paper-plane";
const pathData = "M454 32q11 0 18.5 7.5T480 58q0 3-2 9L323 464q-6 16-24 16-8 0-14.5-4t-9.5-12l-65-164-162-65q-16-6-16-24 0-17 16-24L445 34q6-2 9-2zM127 212l97 39 126-125zm259-50L260 287l39 98z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/paper-plane";
export { pathData, ltr, accData };