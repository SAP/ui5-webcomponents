import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "well";
const pathData = "M412.221 144l-31 16 108 215c12 22 9 49-4 70-13 22-36 35-61 35h-333c-25 0-48-13-61-35-14-21-15-48-4-70l108-215-31-16c-12-7-17-20-11-33 7-12 20-17 32-10l31 16 38-75c12-25 37-40 65-40s53 15 65 40l36 75 31-15c12-7 26-3 32 9 7 13 2 26-10 33zm-155 28l61-32-37-77c-4-9-14-13-23-13s-19 4-23 13l-38 77zm117 81l-35-71-70 38c-4 1-8 2-12 2s-7-1-11-2l-71-38-34 71 117 63zm74 163c1-5 2-12-2-20l-50-100-87 46zm-380 0l138-74-87-46-49 100c-4 8-3 15-2 20zm71 16h238l-119-63z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/well";
export { pathData, ltr, accData };