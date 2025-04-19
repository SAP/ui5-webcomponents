import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "snapshot";
const pathData = "M310 145l58-48-53-50 34-33 51 50 51-50 35 33-54 50 53 50-34 33-51-52-56 50zM16 128h256v32H48v288h416V256l32-32v256H16V128zm160 96h64l66 96-67 95h-63l65-95zm158 191h-63l65-95-65-96h64l66 96zm-191 0H80l65-95-65-96h64l65 96z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/snapshot";
export { pathData, ltr, accData };