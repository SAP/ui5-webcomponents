import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pending";
const pathData = "M228 284V138q0-7 5-11.5t12-4.5q15 0 15 16v114h146q17 0 17 16t-17 16H228zM325 0q69 17 119.5 67.5T512 187h-34q-17-55-57.5-95T325 35V0zm-65 479q39 0 74-12t63.5-34 49-51 31.5-65h34q-11 42-34.5 78T421 457t-74 40.5-87 14.5q-54 0-101-20.5t-82.5-56-56-82.5T0 252q0-46 14.5-86.5T55 92t62-57 78-35v34q-36 11-65 31.5t-51 49T45 178t-12 74q0 48 17.5 89T99 413t72.5 48.5T260 479z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/pending";
export { pathData, ltr, accData };