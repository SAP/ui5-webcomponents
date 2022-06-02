import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "screen-split-one";
const pathData = "M435 21q32 0 54.5 22.5T512 98v307q0 32-22.5 54T435 481H77q-32 0-54-22T1 405V98q0-32 22-54.5T77 21h358zM52 405q0 25 25 25h51V73H77q-25 0-25 25v307zM460 98q0-25-25-25H179v357h256q25 0 25-25V98z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "screen-split-one";
export { pathData, ltr, accData };