import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "headset";
const pathData = "M480 358q0 32-12 60t-33 49-49 33-60 12h-76q-11 0-18.5-7.5T224 486v-26q0-13 8-19t17-6q10 0 18 6.5t8 19.5h51q28 0 50.5-13t36.5-35q-10 3-23 3h-44q-11 0-18.5-7.5T320 390V250q0-11 7.5-18.5T346 224h83q-1-36-15.5-67.5t-37.5-55-54-37T256 51t-66 13.5-54 37-37 55T83 224h83q11 0 18.5 7.5T192 250v140q0 11-7.5 18.5T166 416h-44q-38 0-64-26t-26-64v-96q0-47 17.5-88.5t47.5-73 71-50T256 0q48 0 89 18.5t71 50 47 73 17 88.5v128zm-339-83H83v51q0 17 11 28t28 11h19v-90zm249 90q17 0 28-11t11-28v-51h-58v90h19z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/headset";
export { pathData, ltr, accData };