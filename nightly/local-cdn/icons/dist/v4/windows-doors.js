import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "windows-doors";
const pathData = "M0 0h256v512H0V0zm288 224V0h224v224H288zm-64 256V32H32v448h192zm96-384h64V32h-64v64zm96-64v64h64V32h-64zm0 160h64v-64h-64v64zm-96-64v64h64v-64h-64zM161 240q0-16 16-16t16 16-16 16-16-16z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/windows-doors";
export { pathData, ltr, accData };