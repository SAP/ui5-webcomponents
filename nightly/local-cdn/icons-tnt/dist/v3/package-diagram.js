import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "package-diagram";
const pathData = "M0 372V139c0-5 1-9 3-13 1-2 3-5 7-9 5-3 10-4 15-4h151l24 26h85l36-36c-1-1-1-4-1-7V31c0-17 14-31 31-31h65c17 0 32 14 32 31v65c0 17-15 32-32 32h-65c-2 0-4-1-7-2l-27 27v1l1 1v2l1 1v1c1 2 1 4 1 6v75h64v-17c0-17 14-31 31-31h65c17 0 32 14 32 31v65c0 17-15 32-32 32h-65c-17 0-31-15-31-32v-16h-64v100c0 1-1 1-1 2l16 15c5-3 11-5 16-5h65c17 0 32 14 32 31v65c0 17-15 32-32 32h-65c-17 0-31-15-31-32v-61l-23-22c-1 0-2 1-3 1H25c-5 0-9-1-13-3-3-2-6-5-8-8-3-3-4-8-4-15zM416 32h-65l1 64h64V32zM32 366h255l1-195H186l-24-26H32v221zm383-142l1 64h64v-64h-65zm-64 192l1 64h64v-64h-65z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/package-diagram";
export { pathData, ltr, accData };