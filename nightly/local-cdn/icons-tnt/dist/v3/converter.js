import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "converter";
const pathData = "M382 94V0h95c3 0 4 0 4 1s-1 2-2 3l-26 27 31 30c19 19 28 41 28 65 0 25-9 46-28 63l-32 31-5-4c15-17 22-36 22-58 0-21-6-37-18-48l-41-39-25 25c-1 1-1 1-2 1s-1-1-1-3zM95 352V64c0-19 15-32 32-32h159v32H127v288H95zm64 96V128c0-19 13-32 32-32h159v32H191v320h191V160h32v288c0 19-15 32-32 32H191c-19 0-32-13-32-32zm64-224v-32h127v32H223zm0 64v-32h127v32H223zM0 392c0-24 9-44 27-61l30-29 5 4c-13 17-20 36-20 56 0 17 4 34 16 45l39 38 27-28c1-1 1-1 2-1v1c0 1 1 1 1 2v93H32c-1 0-1 0-1-1v-2l25-26-29-30C9 435 0 415 0 392z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/converter";
export { pathData, ltr, accData };