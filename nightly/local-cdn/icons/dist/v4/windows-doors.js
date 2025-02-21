import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "windows-doors";
const pathData = "M224 480V32H32v448h192zm96-352v64h64v-64h-64zm0-32h64V32h-64v64zm96 96h64v-64h-64v64zm0-160v64h64V32h-64zM0 0h256v512H0V0zm161 240q0-16 16-16t16 16-16 16-16-16zm127-16V0h224v224H288z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/windows-doors";
export { pathData, ltr, accData };