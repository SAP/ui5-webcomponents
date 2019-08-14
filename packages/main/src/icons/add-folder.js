import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "sap-icon://add-folder";
const d = "M416 384h96v32h-96v96h-32v-96h-96v-32h96v-96h32v96zm64-320q11 0 18 5t10 11q4 7 4 16v128h-32v-96q-1-9-5-16-3-6-9.5-11T448 96H224l-32-32H64q-12 0-18.5 5T36 80q-4 7-4 16v320q0 13 5 19t11 9q7 4 16 4h161v32H32q-9 0-16-4-6-3-11-9.5T0 448V64q0-9 4-16 3-6 9.5-11T32 32h186l30 32h232z";

registerIcon(name, d);
