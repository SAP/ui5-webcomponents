import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "chalkboard";
const pathData = "M.5 417V89q0-16 12-27.5t29-11.5h430q16 0 28 11.5t12 27.5v328q0 17-12 31.5t-28 14.5h-430q-17 0-29-14.5T.5 417zm187-82h41l26-41 26 41h43l-48-68 44-62h-41l-24 35-23-35h-42l45 63zm-148-151v35q30-9 50-29v145h38V134h-31q-6 19-23.5 32t-33.5 18zm370 6v145h38V134h-32q-5 17-22 31t-34 19v35q26-8 50-29zm-1 229v-40h-160v40h160z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/chalkboard";
export { pathData, ltr, accData };