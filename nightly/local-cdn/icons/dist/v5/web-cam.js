import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "web-cam";
const pathData = "M383 478q1 3 1 8 0 11-7.5 18.5T358 512H154q-11 0-18.5-7.5T128 486q0-5 1-8l49-145q-44-21-71-63t-27-94q0-36 14-68t38-56 56-38 68-14 68 14 56 38 38 56 14 68q0 52-27 94t-71 63zM131 176q0 25 10 48t27 40 40 27 48 10q26 0 48.5-10t39.5-27 27-40 10-48q0-26-10-48.5T344 88t-39.5-27T256 51q-25 0-48 10t-40 27-27 39.5-10 48.5zm205 0q0 34-23 57t-57 23h-4q-33 0-54.5-24T176 176t21.5-56T252 96h4q34 0 57 23t23 57zm-13 285l-37-112q-15 3-30 3t-30-3l-37 112h134z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/web-cam";
export { pathData, ltr, accData };