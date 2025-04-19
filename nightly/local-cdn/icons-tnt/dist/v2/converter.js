import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "converter";
const pathData = "M382 0h95q4 0 4 1t-2 3l-26 27 31 30q28 29 28 65 0 38-28 63l-32 31-5-4q22-25 22-58 0-32-18-48l-41-39-25 25q-1 1-2 1t-1-3V0zM95 64q0-14 9.5-23t22.5-9h159v32H127v288H95V64zm64 64q0-14 9-23t23-9h159v32H191v320h191V160h32v288q0 14-9.5 23t-22.5 9H191q-14 0-23-9t-9-23V128zm64 64h127v32H223v-32zm0 64h127v32H223v-32zM0 392q0-36 27-61l30-29 5 4q-20 26-20 56 0 13 3.5 25T58 407l39 38 27-28q1-1 2-1v1q0 1 .5 1t.5 1v93H32q-1 0-1-1v-2l25-26-29-30Q0 426 0 392z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/converter";
export { pathData, ltr, accData };