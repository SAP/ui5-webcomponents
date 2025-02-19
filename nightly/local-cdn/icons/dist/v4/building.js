import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "building";
const pathData = "M39 329v37h72v-37H39zm0 73v36h72v-36H39zm363 0v36h72v-36h-72zM2 292l109-72V0h291v292l109 74v146H369V32H145v480H2V292zm191-164V96h128v32H193zm128 32v32H193v-32h128zm0 64v32H193v-32h128zm0 224v64h-32v-32h-64v32h-32v-64h128zM193 320v-32h128v32H193zm0 64v-32h128v32H193z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/building";
export { pathData, ltr, accData };