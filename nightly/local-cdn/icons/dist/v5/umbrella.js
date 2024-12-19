import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "umbrella";
const pathData = "M505 468q7 7 7 18t-7.5 18.5T486 512t-18-7L327 364q-7-7-7-18t7.5-18.5T346 320t18 7zM473 95q7 7 7 17t-7 19L131 473q-9 7-19 7-4 0-9-2t-14-10q-43-34-66-89T0 267q0-46 16-89.5T61 98L39 76q-7-7-7-18t7.5-18.5T58 32t18 7l22 22q36-29 79.5-45T268 0q60 0 113 25.5T473 95zM320 211q-15-15-36.5-32.5t-46-33.5-50-26.5T140 108q-32 0-32 32 0 22 10.5 47.5t26.5 50 33.5 46T211 320zM175 356q-35-35-61.5-73T73 209l-7-19q-15 37-15 80 0 42 15.5 81t44.5 68zm243-244q-30-28-68.5-44.5T268 51q-40 0-78 15l19 7q36 14 74 40.5t73 61.5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/umbrella";
export { pathData, ltr, accData };