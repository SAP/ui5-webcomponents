import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "wounds-doc";
const pathData = "M342 223q48 23 77 67.5t29 99.5v96q0 11-7.5 18.5T422 512H90q-11 0-18.5-7.5T64 486v-96q0-55 29-99.5t77-67.5l-5-4q-37-39-37-91 0-27 10-50t27.5-40.5 41-27.5T256 0t49.5 10.5 41 28T374 79t10 49q0 27-11 52t-31 43zM115 461h44l145-198q-18-7-42-7h-12q-28 0-52.5 10.5t-43 28.5-29 42.5T115 390v71zm282-71q0-29-12.5-55T352 290v171h45v-71zM192 85q-13 19-13 43 0 32 22.5 54.5T256 205q30 0 52.5-21t24.5-51zm114-15q-22-19-50-19h-4z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/wounds-doc";
export { pathData, ltr, accData };