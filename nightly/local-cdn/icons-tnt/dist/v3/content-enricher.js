import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "content-enricher";
const pathData = "M224 352h32v96h224V128H256v64h-32v-64c0-19 13-32 32-32h224c19 0 32 13 32 32v320c0 19-13 32-32 32H256c-19 0-32-13-32-32v-96zm-32-80c0-11 5-16 16-16h124l-40-40c-3-3-5-7-5-11 0-11 5-16 16-16 5 0 9 1 12 4l67 68c3 4 4 8 4 11 0 5-1 8-4 11l-67 68c-3 3-7 4-12 4-11 0-16-5-16-15 0-5 2-9 5-12l40-40H208c-11 0-16-5-16-16zM0 320v-96c0-19 13-32 32-32h96c19 0 32 13 32 32v96c0 19-13 32-32 32H32c-19 0-32-13-32-32z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/content-enricher";
export { pathData, ltr, accData };