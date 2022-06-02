import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "header";
const pathData = "M435 32q33 0 55 22t22 55v295q0 32-22 54.5T435 481H77q-33 0-55-22.5T0 404V109q0-33 22-55t55-22h358zM51 134h410v-25q0-26-26-26H77q-11 0-18.5 7T51 109v25zm410 52H51v218q0 11 7.5 18t18.5 7h358q26 0 26-25V186z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "header";
export { pathData, ltr, accData };